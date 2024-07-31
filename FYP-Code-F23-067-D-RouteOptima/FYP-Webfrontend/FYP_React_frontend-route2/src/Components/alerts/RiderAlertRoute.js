import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, FloatButton } from "antd";
import { ExpandAltOutlined, ShrinkOutlined } from "@ant-design/icons";
import { fetchRiderLocations } from "../../Utils/api";

const RiderAlertRoute = ({ riderLocation, riderId }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [currentPolyline, setCurrentPolyline] = useState("partial"); // State variable to track current polyline type
  const [polylineData, setPolylineData] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFydGluYWhpbGwiLCJhIjoiY2xzZzZsMDBuMWVrOTJscGN6ZHQ0cjN0ZiJ9.oID5NvKkd-ab3WdXXnhvjQ";

    const fetchData = async () => {
      try {
        const riderLocationsData = await fetchRiderLocations(riderId);
        const { riderCoordinates, polyline, polylines, polylineId } =
          riderLocationsData.data;
        const selectedPolyline =
          currentPolyline === "partial"
            ? polylines[polylineId].polyline
            : polyline.polyline;

        console.log("Rider Coordinates: ", riderCoordinates);
        console.log("Polyline: ", selectedPolyline);

        setPolylineData(selectedPolyline);

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [riderCoordinates.long, riderCoordinates.lat], // Initial center coordinates
          zoom: 11, // Initial zoom level
        });

        mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");

        new mapboxgl.Marker({
          color: "#FF5733",
        })
          .setLngLat([riderCoordinates.long, riderCoordinates.lat])
          .addTo(mapInstance);

        mapInstance.on("style.load", () => {
          setMap(mapInstance);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [riderId, currentPolyline]);

  useEffect(() => {
    if (!map || !polylineData) return;

    const drawPolyline = () => {
      const lineString = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: polylineData.map((coord) => [coord.long, coord.lat]),
        },
      };

      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: lineString,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1677FF",
          "line-width": 8,
        },
      });
    };

    drawPolyline();
  }, [map, polylineData]);
  
  const handleTogglePolyline = () => {
    setCurrentPolyline((prevType) =>
      prevType === "partial" ? "full" : "partial"
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100vh", padding: 0 }}
      />
      <div style={{ position: "absolute", top: 20, left: 10 }}>
       
        {/* Normal Buttons to toggle */}
        {/* <Button type="primary" onClick={handleTogglePolyline}>
          {currentPolyline === 'partial' ? 'Show Full Polyline' : 'Show Partial Polyline'}
        </Button> */}

        {/* Single Toggle button */}
        {/* <FloatButton
          type="primary"
          icon={<ExpandAltOutlined />}
          onClick={handleTogglePolyline}
        >
          {currentPolyline === "partial"
            ? "Show Full Polyline"
            : "Show Partial Polyline"}
        </FloatButton> */}


        {/* FloatButtons to toggle */}
        <FloatButton.Group shape="square" >
          <FloatButton
            icon={<ShrinkOutlined />}
            type={currentPolyline === "partial" ? "primary" : "default"}
            onClick={() => handleTogglePolyline("partial")}
          />
          <FloatButton
            icon={<ExpandAltOutlined />}
            type={currentPolyline === "full" ? "primary" : "default"}
            onClick={() => handleTogglePolyline("full")}
          />
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default RiderAlertRoute;