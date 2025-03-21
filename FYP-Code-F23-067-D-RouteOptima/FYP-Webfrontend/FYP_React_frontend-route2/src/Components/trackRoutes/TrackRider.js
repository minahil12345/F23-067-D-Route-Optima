// components/TrackRider.js
import React, {  useState, useEffect, useRef } from 'react';
import { Table, Row, Col,Card,Tabs,Button,Typography,FloatButton,Timeline } from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import mapboxgl from "mapbox-gl";
import { fetchRiderLocations, fetchAssignmentsLocations } from "../../Utils/api";
import { ExpandAltOutlined, ShrinkOutlined, ClockCircleOutlined,CheckCircleOutlined ,CloseCircleOutlined} from "@ant-design/icons";
import './TrackRider.css';
import pin from '../../../src/Assets/images/location-pin.png';
import bike from '../../Assets/images/bike.png';

const { TabPane } = Tabs;
const { Title } = Typography;

const TrackRider = ({ location }) => {
  const { state } = useLocation();
  const assignment = state;
  const riderId = assignment.assignment.id;
  const [riderCoordinates, setRiderCoordinates] = useState(null);
  const [parcelData, setParcelData] = useState([]);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [sdCoord, setSdCoor] = useState(null);
  const sdNames = useRef(null);
  const tripData = useRef(null);
  const riderMarkerRef = useRef(null);
  const sdMarkerRef = useRef(null);
  const showCurrentRouteRef = useRef(true);
  const navigate = useNavigate();
  // console.log("State: ",state);
  const rider = state ;
  const [activeTab, setActiveTab] = useState('current');
  // if (!rider || !rider.assignment.data) {
  //   return <div>Error: Rider information not found</div>;
  // }
  const riderStats = rider.assignment.data;
  const  riderInfo  = rider.assignment.data.riderInfo;
  useEffect(() => {
    mapboxgl.accessToken =
      "your_mapbox_token_here";
  
    const initializeMap = () => {
      try {
        const mapContainer = document.getElementById("map");
        const mapInstance = new mapboxgl.Map({
          container: mapContainer,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [73.0479, 33.6844],
          zoom: 13,
        });
        mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");
        setMap(mapInstance);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };
  
    initializeMap();
  
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
      if (map) {
        map.remove();
      }
    };
  }, []);
  
  useEffect(() => {
    if (!map) return;
  
    const fetchData = async () => {
      try {
        const riderLocationData = await fetchRiderLocations(riderId);
        const currentPolylineData =   riderLocationData.data.polylines[riderLocationData.data.polylineId];
        tripData.current = riderLocationData.data;
        setPolyline(currentPolylineData.polyline);
        setRiderCoordinates(riderLocationData.data.riderCoordinates);
        setSdCoor({
          sourceCoordinates: currentPolylineData.sourceCoordinates,
          destinationCoordinates: currentPolylineData.destinationCoordinates,
        });
        sdNames.current = {
          sourceName: currentPolylineData.source,
          destinationName: currentPolylineData.destination,
        };
        const TimeLineInfo= await fetchAssignmentsLocations(riderId);
        console.log("TimeLineInfo: ",TimeLineInfo);
        setParcelData(TimeLineInfo.data.parcels); 
        console.log("ParcelsInfo: ",parcelData);
      } catch (error) {
        console.error("Error fetching rider data:", error);
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(periodicUpdate, 3000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [map]);
  
  const periodicUpdate = async () => {
    if (!map) return;

    const riderLocationData = await fetchRiderLocations(riderId);
    setRiderCoordinates(riderLocationData.data.riderCoordinates);
    if (
      !tripData.current ||
      tripData.current.polylineId !== riderLocationData.data.polylineId
    ) {
      tripData.current = riderLocationData.data;
      setPolyline(
        tripData.current.polylines[tripData.current.polylineId].polyline
      );

      // IF showing current route, update sd Coords to current route's src and dest
      if (showCurrentRouteRef.current) {
        setSdCoor({
          sourceCoordinates:
            tripData.current.polylines[tripData.current.polylineId]
              .sourceCoordinates,
          destinationCoordinates:
            tripData.current.polylines[tripData.current.polylineId]
              .destinationCoordinates,
        });
      }

      sdNames.current = {
        sourceName:
          tripData.current.polylines[tripData.current.polylineId].source,
        destinationName:
          tripData.current.polylines[tripData.current.polylineId].destination,
      };
    }
  };

  useEffect(() => {
    if (!map) return;

    const addUpdateCurrentMarker = () => {
      try {
        if (!riderCoordinates) return;

        if (!riderMarkerRef.current) {
          // Set a marker of blue color for the rider
          const markerElement = document.createElement('div');
          markerElement.className ='marker';
          // markerElement.style.backgroundImage = `url(${bike})`;
          // markerElement.style.width = '50px'; // Adjust width and height as needed
          // markerElement.style.height = '50px';
          
          // Set a marker with the custom element for the rider
          riderMarkerRef.current = new mapboxgl.Marker( {color: "#0000FF"} )
            .setLngLat([riderCoordinates.long, riderCoordinates.lat])
            .addTo(map);
        } else {
          riderMarkerRef.current.setLngLat([
            riderCoordinates.long,
            riderCoordinates.lat,
          ]);
        }

        map.panTo([riderCoordinates.long, riderCoordinates.lat]);
      } catch (error) {
        console.error("Error adding/updating current marker:", error);
      }
    };

    addUpdateCurrentMarker();
  }, [riderCoordinates]);

  useEffect(() => {
    if (!map) return;

    const addUpdateSdMarker = () => {
      try {
        if (!sdCoord) return;

        if (!sdMarkerRef.current) {
          // Set a marker of red color for the destination
          const dst = new mapboxgl.Marker({ color: "#FF0000" })
            .setLngLat([
              sdCoord.destinationCoordinates.long,
              sdCoord.destinationCoordinates.lat,
            ])
            .addTo(map);
          // Set a marker of orange color for the source
          const src = new mapboxgl.Marker({ color: "#00FF00" })
            .setLngLat([
              sdCoord.sourceCoordinates.long,
              sdCoord.sourceCoordinates.lat,
            ])
            .addTo(map);
          sdMarkerRef.current = { dst: dst, src: src };
        } else {
          sdMarkerRef.current.dst.setLngLat([
            sdCoord.destinationCoordinates.long,
            sdCoord.destinationCoordinates.lat,
          ]);
          sdMarkerRef.current.src.setLngLat([
            sdCoord.sourceCoordinates.long,
            sdCoord.sourceCoordinates.lat,
          ]);
        }
      } catch (error) {
        console.error("Error adding/updating Sd marker:", error);
      }
    };

    addUpdateSdMarker();
  }, [sdCoord]);

  useEffect(() => {
    if (!map) return;

    const addUpdatePolyline = () => {
      try {
        if (!polyline) return;

        // Convert the polyline to the format required by mapbox
        const polylineCoordinates = polyline.map((coord) => [
          coord.long,
          coord.lat,
        ]);

        // If there exists a source with id 'polyline-source', update it with new coordinates
        if (map.getSource("polyline-source")) {
          // Update the source with the new coordinates
          updatePolyline(polylineCoordinates);
        } else {
          // Add a GeoJSON source with an ID
          initializePolyline(polylineCoordinates);
        }
      } catch (error) {
        console.error("Error adding/updating Sd marker:", error);
      }

      function updatePolyline(polylineCoordinates) {
        map.getSource("polyline-source").setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: polylineCoordinates,
          },
        });
      }

      function initializePolyline(polylineCoordinates) {
        // Now also add data for the overall route
        const overallPolylineCoordinates =
          tripData.current.polyline.polyline.map((coord) => [
            coord.long,
            coord.lat,
          ]);
        map.addSource("overall-polyline-source", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: overallPolylineCoordinates,
            },
          },
        });

        // Add overall polyline layer with an ID
        map.addLayer({
          id: "overall-polyline-layer",
          type: "line",
          source: "overall-polyline-source", // Reference the source ID
          layout: {
            "line-join": "round",
            "line-cap": "round",
            visibility: "none",
          },
          paint: {
            "line-color": "#909090",
            "line-width": 8,
          },
        });

        // -------------------------------------------------------------------------
        // Now its time to add data to source for the current route
        map.addSource("polyline-source", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: polylineCoordinates,
            },
          },
        });

        // Add current polyline layer with an ID
        map.addLayer({
          id: "polyline-layer",
          type: "line",
          source: "polyline-source", // Reference the source ID
          layout: {
            "line-join": "round",
            "line-cap": "round",
            visibility: "visible",
          },
          paint: {
            "line-color": "#4895FF",
            "line-width": 8,
          },
        });

        // ------------------------------------------------------------------------
        // Extract feature points from the trip data

        const parcelCoordinates = tripData.current.polylines.map(
          (polyline) => ({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [
                polyline.destinationCoordinates.long,
                polyline.destinationCoordinates.lat,
              ],
            },
          })
        );

        // Add parcel locations data to the source
        map.addSource("parcel-locations", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: parcelCoordinates,
          },
        });

        // Add parcel locations layer with an ID
        map.addLayer({
          id: "parcel-locations-layer",
          type: "circle",
          source: "parcel-locations", // Reference the source ID
          paint: {
            "circle-radius": 8,
            "circle-color": "black",
          },
          layout: {
            visibility: "none",
          },
        });
      }
    };

    addUpdatePolyline();
  }, [polyline]);

  const handleGoBack = () => {
    navigate('/trackroutes'); // Go back to the previous page
  };

  const handleRouteToggle = (showCurrentRoute) => {
    if (!map) return;

    // If the new route mode to be shown is the same as the current route mode, return
    if (showCurrentRoute === showCurrentRouteRef.current) return;

    showCurrentRouteRef.current = showCurrentRoute;

    const toggleRouteMode = () => {
      if (!map) return;

      if (showCurrentRoute) {
        // Now show only the current route, i.e., hide the overall route + parcel locations
        map.setLayoutProperty("overall-polyline-layer", "visibility", "none");
        map.setLayoutProperty("parcel-locations-layer", "visibility", "none");

        // Update sd Coords to current route's src and dest
        setSdCoor({
          sourceCoordinates:
            tripData.current.polylines[tripData.current.polylineId]
              .sourceCoordinates,
          destinationCoordinates:
            tripData.current.polylines[tripData.current.polylineId]
              .destinationCoordinates,
        });
      } else {
        // Now show the overall route as well as the parcel locations
        map.setLayoutProperty(
          "overall-polyline-layer",
          "visibility",
          "visible"
        );
        map.setLayoutProperty(
          "parcel-locations-layer",
          "visibility",
          "visible"
        );

        // Update sd Coords to overall route's src and dest
        setSdCoor({
          sourceCoordinates: tripData.current.polyline.sourceCoordinates,
          destinationCoordinates:
            tripData.current.polyline.polyline[tripData.current.polyline.polyline.length-1],
        });
      }
    };

    toggleRouteMode();
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const getDotIcon = (status) => {
    if (status === 'pending') {
      return {
        dot: <ClockCircleOutlined className="timeline-clock-icon" />,
        color: 'red',
      };
    }
    // You can add more conditions for other statuses here
    // For now, return null for other statuses
    return null;
  };
//useParams to fetch by ID
  return (
    <div className="track-container">
      <Row gutter={16}>
        <Col span={8} style={{ width: "100%", height: "calc(100vh - 80px)", padding:'20px' }}>
          <h1 classname="track-title" style={{ marginBottom:'2px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '32px', marginTop: '24px'}}>Track Rider</h1>
          <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '0px' }} />  
          <div classname= "track-card-animation-1" 
            style={{width: '98%',
            border: 'none',
            padding:'10px',
          }}>
            <h3 classname="track-title" style={{ padding:'10px', marginBottom:'0px',fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '22px', marginTop: '4px'}}>Rider's Information</h3>
            <div classname="track-card-animation-1" style={{ marginBottom:'0px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black'}}>
            {riderCoordinates && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height:'150px'}}>
                <div style={{ marginLeft: '10px'}}>
                  <span style={{ fontSize: '17px', lineHeight: '2' }}>Name</span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2' }}>Phone</span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2' }}>Trip Timings</span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2' }}>Parcels Remaining</span><br />
                </div>
                <div style={{ textAlign: 'right', marginRight:'15px'}}>
                  <span style={{ fontSize: '17px', lineHeight: '2' }}><strong>{riderInfo.name}</strong></span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2'}}><strong>{riderInfo.phone}</strong></span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2' }}><strong>{rider.assignment.data.startTime} to {rider.assignment.data.endTime}</strong></span><br />
                  <span style={{ fontSize: '17px', lineHeight: '2' }}><strong>{riderStats.parcelsRemaining}</strong></span><br />
                </div>
              </div>
            )}
            </div>
          </div>
          <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '0px' }} />  
          <div classname= "track-card-animation-1" 
            style={{width: '98%',
            border: 'none',
            padding:'10px',
          }}>
            <h3 classname="track-title" style={{padding:'10px', marginBottom:'10px',fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '22px', marginTop: '4px'}}>Parcels Information</h3>
            <div classname="track-card-animation-1"  style={{ marginBottom:'4px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', marginLeft:'2px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height:'400px', maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll', scrollbarWidth: 'none','-ms-overflow-style': 'none'}}>
              <Timeline style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px' ,justifyContent: 'space-between', padding: '10px'}}>
                {parcelData.map((parcel, index) => (
                  <Timeline.Item key={index} dot={parcel.status === 'pending' ? <ClockCircleOutlined className="timeline-clock-icon"/> : parcel.status === 'delivered' ? <CheckCircleOutlined className="timeline-check-icon" style={{color: "green"}}/> : <CloseCircleOutlined className="timeline-close-icon" style={{color: "red"}}/>}>
                  <span style={{ fontSize: '16px' }}>
                    {parcel.receiver.name} 
                    {parcel.status === 'pending' ? ` will get parcel at ${parcel.arrival_time}` : 
                    parcel.status === 'delivered' ? ` has received parcel at ${parcel.arrival_time}` : 
                    ` has not accepted parcel at ${parcel.arrival_time} `}
                  </span>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
            </div>
          </div>
          <br></br>
          <div style={{ position: 'absolute', bottom: '8px', left: '25px' }}>
            <Button type="primary" onClick={handleGoBack} style={{ width: '140px', fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '23px', backgroundColor:'black' }}>
              Back
            </Button>
          </div>
        </Col>
        {/* <Col span={12}>
          <Card classname= "track-card-animation-2" style={{boxShadow: '4px 4px 25px hsl(30, 0%, 73%)', border: 'none'}}>
            <h1 style={{ fontFamily: "'Noto Sans', sans-serif", marginRight: '150px', textAlign:'center',}}>Rider's Route</h1>
            <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
              <TabPane tab={<span style={{ fontSize: '20px' }}>Current Route</span>} key="current"  onClick={() => handleRouteToggle(true)}>
                // <CurrentRoute riderId={rider.assignment.id} /> 
            </TabPane>
              <TabPane tab={<span style={{ fontSize: '20px' }}>Full Route</span>} key="full"  onClick={() => handleRouteToggle(false)}>
                // <FullRoute riderId={rider.assignment.id} /> 
              </TabPane>
            </Tabs>
            </Card> 
          </Col>  */}
          <Col span={16}>
        <div
          style={{ width: "100%", height: "100%", padding: 0, border: 'none'}}
          // calc(100vh - 80px)
        >
          <div
            id="map" style={{ width: "100%", height: "calc(100vh - 80px)", padding: 0 }}
          />
          <div style={{ position: "absolute", top: 20, left: 10 }}>
            <FloatButton.Group shape="square">
              <FloatButton
                icon={<ShrinkOutlined />}
                onClick={() => handleRouteToggle(true)} // Pass true for current route
              />
              <FloatButton
                icon={<ExpandAltOutlined />}
                onClick={() => handleRouteToggle(false)} // Pass false for overall route
              />
            </FloatButton.Group>

          </div>
        </div>
          </Col>
      </Row>
    </div>
  );
};

export default TrackRider;
