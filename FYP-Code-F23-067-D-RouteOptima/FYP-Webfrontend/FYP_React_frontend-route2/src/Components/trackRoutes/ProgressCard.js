import React, { useEffect, useState } from 'react';
import { Typography, Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import RiderMap from './RidersMap';
import './ProgressCard.css'; 
import { getParcelsLocations} from "../../Utils/api";

const { Title } = Typography;
const ProgressCard = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchRidersInfo = async () => {
      try {
        const response = await getParcelsLocations();
        // if (!response.ok) {
        //   throw new Error('Failed to fetch assignments information');
        // }
        // const data = await response.json();
        console.log(response);
        setAssignments(response);
      } catch (error) {
        console.error('Error fetching Assignments:', error);
      }
    };

    fetchRidersInfo();
  }, []);

  return (
    <div className="progress-card-container"> 
        <Row gutter={16} >
          <Col span={8} style={{padding:'20px'}} >
            <h1 classname= "progress-title" style={{ marginBottom:'2px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '32px', marginTop: '24px'}}>
              Track Progress
            </h1> 
            <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '15px' }} />  
            <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll', scrollbarWidth: 'none','-ms-overflow-style': 'none'   }}>      
             {assignments.map((assignment, index) => (
              <Card
                  className="sub-card1"
                  style={{
                    // textAlign: 'center',
                    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', // Adjusted boxShadow values
                    border: 'none',
                    width: '100%',
                    marginTop:'10px',
                    marginBottom: '17px',
                    padding:'10px',
                    // marginLeft:'15px',
                    // backgroundColor:"green"
                    // marginRight: '55px',
                  }}
                >
                <Link to="/trackrider" state={{ assignment: assignment }}  className="custom-link" style={{ textDecoration: 'none', color: 'black' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={3} style={{fontFamily: 'Inter, sans-serif',fontSize: '22px'}}>{assignment.data.riderInfo.name}</Title>
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                      <div style={{ width: '100px', fontFamily: 'Inter, sans-serif',fontSize: '17px', alignItems: 'right' }}>
                        {assignment.data.parcelsDelivered === assignment.data.totalParcels ? (
                          <div style={{ width: 'fit-content', height: '30px', background: '#5ecc5a', color: '#285427', display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'10px', borderRadius: '10px', fontSize: '14px' }}>
                            Completed
                          </div>
                        ) : (
                          <div style={{ width: 'fit-content', height: '30px', background: '#1677FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',padding:'10px', borderRadius: '10px' , fontSize: '14px'}}>
                            In Progress
                          </div>
                        )}
                      </div>
                   </Col>

                  </Row>
                  <div style={{ width: '100%',fontFamily: 'Inter, sans-serif',fontSize: '15px' }}>
                    Parcels Delivered: {assignment.data.parcelsDelivered} / {assignment.data.totalParcels}
                    <span style={{ marginLeft: '122px' }}></span>
                    Alerts Generated: {assignment.data.alertsGenerated}
                    <br></br>
                    Start Time: {assignment.data.startTime} 
                    <span style={{ marginLeft: '134px' }}></span>
                    Date: {assignment.data.date}
                  </div> 
                </Link>            
              </Card>
             ))}
            </div> 
          </Col>
          <Col span={16}>
            <div className="sub-card2" style={{ height: '100%'}}>
              <RiderMap style={{ width: '100%', height: '100%' }} />
            </div>
          </Col>

        </Row>     
    </div>
  );
};

export default ProgressCard;
