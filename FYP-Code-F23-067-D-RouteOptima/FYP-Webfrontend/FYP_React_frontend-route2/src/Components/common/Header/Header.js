import React from 'react';
import { Layout, Row, Col, Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../Assets/images/logo.png';

const { Header } = Layout;

const CustomHeader = ({ selectedOption, handleMenuClick, handleLogout }) => {
  return (
    <Header style={{ background: 'white', borderBottom: '1px solid #ECECEB', height: '100%' }}>
      <Row justify="space-between" align="middle" style={{ height: '100%' }}>
        <Col>
          <Row align="middle">
            <img src={logo} alt="RouteOptima Logo" style={{ width: '16em', height: 'auto', marginRight: '10px' }} />
          </Row>
        </Col>
        <Col>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[selectedOption]}
            onClick={({ key }) => handleMenuClick(key)}
            className="custom-menu"
            style={{
              background: 'white',
              textAlign: 'center',
              borderRadius: '10px',
              height: '100%', // Set menu height
              lineHeight: '64px', // Match header height
            }}
          >
            <Menu.Item key="home" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Link to="/" className="custom-link" style={{ fontFamily: 'inherit, sans-serif' ,letterSpacing: '1px', fontWeight: "inherit",fontStyle: "inherit", color: 'black', fontSize: 18 }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="optimize" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Link to="/optimizeroutes" className="custom-link" style={{ fontFamily: 'inherit, sans-serif',letterSpacing: '1px', fontSize: "16px", color: 'black', fontSize: 18 }}>Optimize Route</Link>
            </Menu.Item>
            <Menu.Item key="track" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Link to="/trackroutes" className="custom-link" style={{ fontFamily: 'inherit, sans-serif', letterSpacing: '1px', color: 'black', fontSize: 18 }}>Track Routes</Link>
            </Menu.Item>
            <Menu.Item key="alerts" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Link to="/alerts" className="custom-link" style={{ fontFamily: 'inherit, sans-serif' , letterSpacing: '1px', color: 'black', fontSize: 18 }}>Alerts</Link>
            </Menu.Item>
            <Menu.Item key="register" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Link to="/register" className="custom-link" style={{ fontFamily: 'inherit, sans-serif', letterSpacing: '1px',color: 'black', fontSize: 18 }}>Register Riders</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="custom-menu-item" style={{ fontSize: 18 }}>
              <Button type="primary" onClick={handleLogout} className="logout-button" style={{ width: '110px', fontFamily: 'Outfit, sans-serif', fontSize: 18, textColor:'black', backgroundColor: '#FF7D00', marginBottom: '5px', textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', lineHeight: '23px',marginTop:'15px' }}>
                <span style={{ margin: 'auto' }}>Logout</span> {/* Center "Logout" text */}
                <LogoutOutlined style={{ marginLeft: '5px' }} />
              </Button>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
