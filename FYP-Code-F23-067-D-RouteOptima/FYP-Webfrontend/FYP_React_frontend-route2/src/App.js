// App.js
import React, { useEffect, useState } from 'react';
import { Layout, Modal, Alert, Space ,Button } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomHeader from './Components/common/Header/Header';
import Home from './Components/dashboard/Home';
import OptimizeRoute from './Components/routes/OptimizeRoutes';
import AssignMultipleRiders from './Components/Assign riders/AssignMultipleRiders';
import PreviewRoutes from './Components/Assign riders/PreviewRoutes';
import Alerts from './Components/alerts/AlertsPage';
import RegisterRider from './Components/register/RegisterRidersPage';
import ProgressCard from './Components/trackRoutes/ProgressCard';
import TrackRider from './Components/trackRoutes/TrackRider';
import AlertsList from './Components/alerts/AlertsList';
import AlertDetails from './Components/alerts/AlertDetails';
import TrackParcels from './Components/trackRoutes/trackParcels';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const { Content } = Layout;

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBA4r1Ic2P4tj7HmdBKnT52GzkzLLp_TCo",
    authDomain: "route-optima.firebaseapp.com",
    projectId: "route-optima",
    storageBucket: "route-optima.appspot.com",
    messagingSenderId: "242352041374",
    appId: "1:242352041374:web:b5408f94b7a016c2f9ba8f",
    measurementId: "G-X5YCK2Q19V"
  };

  const app = initializeApp(firebaseConfig);
  
  const [selectedOption, setSelectedOption] = useState('home');
  const [alertModal, setAlertModal] = useState({ show: false, first: true });

  const handleMenuClick = (key) => {
    setSelectedOption(key);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  // useEffect(() => {
  //   const db = getFirestore();
  //   const emergencyRequestCollection = collection(db, 'emergencyRequest');
  //   const unsubscribe = onSnapshot(emergencyRequestCollection, (snapshot) => {
  //     if (alertModal.first) {
  //       setAlertModal({ show: false, first: false });
  //     }
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === 'added') {
  //         setAlertModal({ show: true, data: change.doc.data() });
  //       }
  //     });
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <Router>
      <Layout>
        <CustomHeader selectedOption={selectedOption} handleMenuClick={handleMenuClick} handleLogout={handleLogout} />

        {/* Conditionally render the modal */}
        {alertModal.show && (
          <Modal
          open={alertModal.show}
          onCancel={() => setAlertModal({ show: false })}
          footer={null} // Remove default footer
          style={{ padding: 0 }} 
          closeIcon={null}
        >
          <Space direction="vertical" style={{ width: '470px' }}>
            <Alert
              message={<>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '18px', marginBottom: '5px', color: '#1890ff' }}>
                  Alert has been generated!
                </div>
                </>
              }
              type="warning"
              description={
                <>
                  <table style={{ width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '14px', lineHeight: '1.5', marginLeft: '30px' }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 'bold', paddingRight: '16px' }}>Name</td>
                        <td>{alertModal.data.riderId}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold', paddingRight: '16px' }}>Type</td>
                        <td>{alertModal.data.type}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold', paddingRight: '16px' }}>Description</td>
                        <td>{alertModal.data.description}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br></br>
                  <div style={{ textAlign: 'right' }}>
                  <Button onClick={() => setAlertModal({ show: false })} style={{ marginRight: '8px' }}>Cancel</Button>
                  <Button type="primary" onClick={() => {
                      const { riderId } = alertModal.data;
                      window.location.href = `/alerts/`;
                      setAlertModal({ show: false });
                    }}>Ok</Button>
                  </div>
                </>
              }
              showIcon
            />
            
          </Space>
        </Modal>
        
        )}
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/optimizeroutes" element={<OptimizeRoute />} />
            <Route path="/assignriders" element={<AssignMultipleRiders />} />
            <Route path="/previewroutes" element={<PreviewRoutes />} />
            <Route path="/trackroutes" element={<ProgressCard />} />
            <Route path="/trackrider" element={<TrackRider />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alerts/" element={<AlertsList />} />
            <Route path="/alerts/:id" element={<AlertDetails />} />
            <Route path="/register" element={<RegisterRider />} />
            <Route path="/trackparcels" element={<TrackParcels />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
