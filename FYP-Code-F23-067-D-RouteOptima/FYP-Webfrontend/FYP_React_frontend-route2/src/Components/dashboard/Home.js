import React, { useState } from 'react';
import { Row, Col, Card, Progress,Statistic, Divider } from 'antd';
import OngoingDeliveries from './OngoingDeliveries';
import TimeViolations from './TimeViolations';
import TotalDistance from './TotalDistance';
import NumberOfParcels from './AlertsGenerated';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  const [selectedSegment, setSelectedSegment] = useState('Today'); // Default segment
  document.body.style.overflow = "scroll";
  const handleSegmentChange = (e) => {
    setSelectedSegment(e.target.value);
  };

   // Example statistics
  //  const totalRiders = 20;
   const ridersAssigned = 14;
   const ParcelsAssigned = 25;
   const AlertsGenerated = 2;
   const AlgoTimeViolate = 3;
  //  const ridersAssignedPercentage = (ridersAssigned / totalRiders) * 100;

  return (
    <div className="home-container" style={{ overflow: 'auto' }}>
       <h1 className="dashboard-title" style={{ marginBottom:'2px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '32px', marginTop: '24px'}}>
              Dashboard
      </h1> 
      <Row gutter={[16, 16]} style={{marginBottom:'10px'}}>
        <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', margin: '0' }} />
        <Col span={6}>
        <Card style={{ border: 'none', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', color: 'black' }}>Riders Assigned</span>
            <Divider style={{ marginTop: '5px', marginBottom: '5px', backgroundColor: '#D3D3D3' }} />
            <Statistic
              value={ridersAssigned}
            />
          </div>
        </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: 'none', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', color: 'black' }}>Parcels Assigned</span>
                <Divider style={{ marginTop: '5px', marginBottom: '5px', backgroundColor: '#D3D3D3' }} />
                <Statistic
                  value={ParcelsAssigned}
                />
              </div>
            </Card>
        </Col>
        <Col span={6}>
           <Card style={{ border: 'none', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',textAlign: 'center' }}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', color: 'black' }}>Time Violation by Algorithm</span>
              <Divider style={{ marginTop: '5px', marginBottom: '5px', backgroundColor: '#D3D3D3' }} />
              <Statistic
                value={AlgoTimeViolate}
              />
            </div>
          </Card>
        </Col>
        <Col span={6}>
        <Card style={{ border: 'none',boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', color: 'black' }}>Alerts Generated</span>
              <Divider style={{ marginTop: '5px', marginBottom: '5px', backgroundColor: '#D3D3D3' }} />
              <Statistic
                value={AlertsGenerated}
              />
            </div>
          </Card>
        </Col>       
      </Row>
      <Row gutter={[16, 16]} >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ width: '100%', height: '600px', border: 'none', padding:'20px'}}>
            <TimeViolations  selectedSegment={selectedSegment}/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card  style={{ width: '100%', height: '600px', border: 'none', padding:'20px' }}>
            <NumberOfParcels selectedSegment={selectedSegment}/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card  style={{ width: '100%', height: '600px', border: 'none', padding:'20px'}}>
            <TotalDistance selectedSegment={selectedSegment}/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card  style={{ width: '100%', height: '600px', border: 'none', padding:'20px' }}>
            <OngoingDeliveries selectedSegment={selectedSegment}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
