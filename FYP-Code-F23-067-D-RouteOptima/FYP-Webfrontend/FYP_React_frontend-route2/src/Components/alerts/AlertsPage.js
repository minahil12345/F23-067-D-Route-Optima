// AlertsPage.js
import React from 'react';
import { Layout, Button, Typography, Card, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlertsList from './AlertsList';
import AlertDetails from './AlertDetails'; 
import './AlertsPage.css';

const { Content } = Layout;
const { Title } = Typography;

const AlertsPage = () => {
  return (
        <Routes>
          <Route path="/" element={<AlertsList />} />
          {/* <Route path="/:id" element={<AlertDetails />} /> */}
          <Route path="/alerts/NQF0hDShTQET8TUuoEZl" element={<AlertDetails />} />
        </Routes>         

  );
};

export default AlertsPage;
