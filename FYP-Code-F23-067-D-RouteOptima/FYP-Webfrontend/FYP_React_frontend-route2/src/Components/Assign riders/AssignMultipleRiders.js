import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Card, Button, Select, Row, Col, Form, Spin } from "antd";
import MapPopup from "./MapBoxPopUp"; // Import the MapPopup component
import PreviewRoutes from "./PreviewRoutes";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./AssignMultipleRider.css";
const { Option } = Select;

const AssignRiderss = () => {
  const [assignments, setAssignments] = useState([]);
  const { state } = useLocation();
  const { sub_routes } = state;
  const [parentRouteToShow, setParentRouteToShow] = useState(
    sub_routes.subroutes
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const defaultAssignments = sub_routes.subroutes.map((subroute, index) => ({
      subrouteId: subroute.subroute_id,
      riderId: sub_routes.riders[index].id,
    }));
    setAssignments(defaultAssignments);
  }, [sub_routes]);

  const handleRiderSelection = (subrouteId, riderId) => {
    let updatedAssignments = [...assignments];

    const existingIndex = updatedAssignments.findIndex(
      (assignment) => assignment.subrouteId === subrouteId
    );

    if (riderId === null) {
      return;
    }

    updatedAssignments = updatedAssignments.map((assignment) => {
      if (
        assignment.riderId === riderId &&
        assignment.subrouteId !== subrouteId
      ) {
        return { ...assignment, riderId: null };
      }
      return assignment;
    });

    const existingAssignment = updatedAssignments.find(
      (assignment) => assignment.riderId === riderId
    );
    if (existingAssignment && existingAssignment.subrouteId !== subrouteId) {
      updatedAssignments = updatedAssignments.filter(
        (assignment) => assignment !== existingAssignment
      );
    }

    if (existingIndex !== -1) {
      updatedAssignments[existingIndex].riderId = riderId;
    } else {
      updatedAssignments.push({ subrouteId, riderId });
    }

    setAssignments(updatedAssignments);
  };

  const handleViewRoute = (subroute) => {
    setParentRouteToShow([subroute]);
  };

  const handleAssignRiders = async () => {
    try {
      if (assignments.length === 0) {
        alert("Please select riders for subroutes.");
        return;
      }

      setLoading(true); // Set loading state to true when assigning riders

      const assignmentData = {};
      assignments.forEach((assignment) => {
        assignmentData[assignment.subrouteId] = assignment.riderId;
      });

      await axios
        .post("http://localhost:9000/trip/assignRiders", assignmentData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          console.log("Riders are assigned!!!");
          navigate("/trackroutes");
        });
    } catch (error) {
      console.error("Error assigning riders:", error);
      alert("Error assigning riders. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false after assigning riders
    }
  };

  return (
    <div className="assign-container">
      <Row gutter={16}>
        <Col span={8} style={{ padding: "20px" }}>
          {/* Re-Optimize button moved above the h1 */}
          <Button
            type="primary"
            style={{
              fontSize: "16px",
              color: "white",
              backgroundColor: "black",
            }}
          >
            <LeftCircleOutlined style={{ fontSize: "18px", marginRight: "10px" }} />
            <span>Re-Optimize</span>
          </Button>
          <h1
            className="assign-title"
            style={{
              marginBottom: "2px",
              fontFamily: "Inter, sans-serif",
              textAlign: "left",
              color: "black",
              fontSize: "32px",
              marginTop: "24px",
            }}
          >
            Assign Riders
          </h1>
          <hr
            style={{
              width: "100%",
              borderTop: "1px solid #D3D3D3",
              marginBottom: "35px",
            }}
          />
          <Form onFinish={handleAssignRiders}>
            {/* Buttons moved inside the form */}
            {sub_routes.subroutes.map((subroute) => (
              <Form.Item
                key={subroute.subroute_id}
                label={
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "18px",
                    }}
                  >{`Subroute ${subroute.subroute_id + 1}`}</span>
                }
                name={`subroute${subroute.subroute_id}`}
              >
                <Row gutter={16}>
                  <Col span={15}>
                    <Select
                      value={
                        assignments.find(
                          (assignment) =>
                            assignment.subrouteId === subroute.subroute_id
                        )?.riderId || undefined
                      }
                      style={{
                        width: "100%",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "17px",
                      }}
                      className="custom-dropdown"
                      onChange={(riderId) =>
                        handleRiderSelection(subroute.subroute_id, riderId)
                      }
                    >
                      {sub_routes.riders
                        .filter(
                          (rider) =>
                            !assignments.some(
                              (assignment) =>
                                assignment.subrouteId !==
                                  subroute.subroute_id &&
                                assignment.riderId === rider.id
                            )
                        )
                        .map((rider) => (
                          <Option
                            key={rider.id}
                            value={rider.id}
                            className="custom-option"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "17px",
                            }}
                          >
                            {rider.data.name}
                          </Option>
                        ))}
                    </Select>
                  </Col>
                  <Col
                    span={9}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => handleViewRoute(subroute)}
                      style={{
                        width: "fit-content",
                        display: "fit",
                        lineHeight: "10px",
                        fontSize: "18px",
                        padding: "10px",
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "black",
                      }}
                    >
                      View Route
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            ))}
            <Form.Item style={{ marginBottom: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    backgroundColor: "black",
                  }}
                  loading={loading}
                >
                  {loading ? "Assigning Riders..." : "Assign Riders"}
                  <RightCircleOutlined style={{ fontSize: "18px", marginLeft: "10px" }} />
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16}>
          <PreviewRoutes
            subroutes={sub_routes.subroutes}
            routeToShow={parentRouteToShow}
            setRouteToShow={setParentRouteToShow}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AssignRiderss;
