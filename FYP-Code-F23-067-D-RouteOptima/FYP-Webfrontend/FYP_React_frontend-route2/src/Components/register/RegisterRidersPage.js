import React from 'react';
import { Layout, Button, Typography, Card, Row, Col } from 'antd';
import RegisterForm from './RegisterRiderForm';
import './RegisterRidersPage.css'; // Import your CSS file for styling

const { Content } = Layout;
const { Title } = Typography;

const RegisterRidersPage = () => {
  const handleRemoveRider = () => {
    // Handle logic to remove rider
    console.log('Remove Rider logic');
  };

  return (
     <div className="register-page-container">
          <Row justify="space-between" style={{padding:'20px'}}>
            {/* <Col  style={{padding:'20px'}}> */}
            <h1 classname= "register-title" style={{ marginBottom:'2px', fontFamily: 'Inter, sans-serif', textAlign: 'left',color: 'black', fontSize: '32px', marginTop: '24px'}}>
              Register Riders
            </h1> 
            <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '5px' }} />  
            {/* </Col> */}
            {/* <Col>
              <Button type="primary" onClick={handleRemoveRider}>
                Remove Rider
              </Button>
            </Col> */}
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Card className="register-card" style={{border: 'none', width: '900px' }}>
                <RegisterForm />
              </Card>
            </div>
          </div>


         
        </div>
  );
};

export default RegisterRidersPage;
