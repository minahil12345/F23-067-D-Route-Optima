import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Typography, Card, Row, Col,Tabs, Button, Table } from 'antd';
import RiderAlertRoute from './RiderAlertRoute'; // Import the MapBoxRoute component
import { fetchParcelLocation } from '../../Utils/api';
import './AlertDetails.css';

const { Title } = Typography;
const { TabPane } = Tabs;

const AlertDetails = () => {
  const location = useLocation();
  const { alert } = location.state;
  console.log("Alert Details: ",alert);
  const riderLocation = alert.location;
  const riderId = alert.riderId;
  const [activeTab, setActiveTab] = useState('current');
  const navigate = useNavigate();
  const [parcelLocations, setParcelLocations] = useState([]);

  useEffect(() => {
    const fetchParcelLocations = async () => {
      try {
        const parcelLocationsData = await fetchParcelLocation(riderId);
        setParcelLocations(parcelLocationsData.data);
      } catch (error) {
        console.error('Error fetching parcel locations:', error);
      }
    };

    fetchParcelLocations();
  }, [riderId]);

  const handleAcceptAndReRoute = () => {
    // Implement logic for accepting and re-routing 
    // This could include API calls or other operations
    console.log('Accept and Re-Route button clicked');
    navigate('/optimizeroutes');
  };

  const handleGoBack = () => {
    navigate('/alerts'); // Go back to the previous page
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      align: "center",
      render: text => <strong style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>{text}</strong>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align: "center",
      key: 'value',
      render: text => (
        <div style={{ fontFamily: 'Inter, sans-serif',fontSize: '17px', maxHeight: '200px', overflowY: 'auto' }}>
          {text}
        </div>
      ),
    },
  ];

  const data = [
    { key: '1', attribute: 'Alert Type', value: alert.type },
    { key: '2', attribute: 'Time Stamp', value: alert.timestamp },
    { key: '3', attribute: 'Rider Name', value: alert.rider.name },
    { key: '4', attribute: 'Rider Phone', value: alert.rider.phone },
    { key: '5', attribute: 'Total Distance of the Trip', value: parcelLocations.totalDistance },
    { key: '6', attribute: 'Number of Parcels Assigned', value: parcelLocations.totalParcels },
    { key: '7', attribute: 'Trip Starting Time', value: parcelLocations.startTime },
    { key: '8', attribute: 'Trip Ending Time', value: parcelLocations.endTime },
    { key: '9', attribute: 'Description', value: alert.description || 'N/A' },
  ];

  return (
    <div className="alert-details-page-container">
      <Row gutter={[16, 16]}>
        <Col span={8} style={{padding:'20px'}}>
          <h1 classname= "alert-details-title" style={{ marginBottom: '0px', fontFamily: 'Inter, sans-serif', textAlign: 'left', color: 'black', fontSize: '32px', marginTop: '24px' }}>
            Alert Details
          </h1>
          <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '15px' }} />   
          <div className="card-animation" style={{ border: 'none', textAlign: 'center' }}>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              bordered
              size="middle"
              rowClassName="hover-shadow"
              showHeader={false}
              style={{fontFamily: 'Inter, sans-serif',fontSize: '22px', display: 'block', margin: 'auto', width: '90%' }}
            />
            <br></br>
            <br></br>
            {/* <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button type="primary" onClick={handleAcceptAndReRoute} style={{ width: '250px', fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '23px', backgroundColor: 'black' }}>Accept and Re-Route</Button>
            </div> */}

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button type="primary" onClick={handleGoBack} style={{ width: '140px', fontSize: '18px', color: 'black', textAlign: 'center', lineHeight: '23px', backgroundColor: 'white', borderColor: 'black', borderStyle: 'groove' }}>Back</Button>
            </div>
          </div>

          
        </Col>
        {/* <Col span={12}>
          <Card className="card-animation" style={{boxShadow: '4px 4px 25px hsl(30, 0%, 73%)', textAlign: 'center', border: 'none'}}>
          <h1 style={{
            fontFamily: "'Noto Sans', sans-serif",
            textAlign: 'center',
            fontSize: '28px'
          }}>Rider's  Route</h1>
            <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
            <TabPane tab={<span style={{ fontSize: '20px' }}>Current Route</span>} key="current">
              <CurrentRoute riderId={riderId} /> 
            </TabPane>
            <TabPane tab={<span style={{ fontSize: '20px' }}>Full Route</span>} key="full">
              <FullRoute riderId={riderId} />
            </TabPane>
          </Tabs>
          </Card>
        </Col> */}
        <Col span={16}>
            <div style={{ height: "100%", padding: 0 }}>
              <RiderAlertRoute
                riderLocation={riderLocation}
                riderId={riderId}
              />
            </div>
          </Col>
      </Row>
    </div>
  );
};

export default AlertDetails;
