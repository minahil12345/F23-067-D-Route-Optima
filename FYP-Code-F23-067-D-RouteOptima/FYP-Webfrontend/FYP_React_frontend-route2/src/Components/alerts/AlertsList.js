import React, { useState, useEffect } from 'react';
import { Typography, Table, Card, Button, Row, Col, Select, Pagination} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './AlertsPage.css';

const { Option } = Select;
const { Title } = Typography;

const AlertsList = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleRemoveAlert = () => {
    // Handle logic to remove rider
    console.log('Remove Alert logic');
  };
  const handleReadAlert = () => {
    // Handle logic to mark as read
    console.log('Mark as Read Alert logic');
  };


  const fetchEmergencyAlerts = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/emergencyRequests');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching emergency alerts:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Fetch alerts immediately when the component mounts
    fetchEmergencyAlerts();

    // Setup interval to fetch alerts every 10 seconds
    const interval = setInterval(() => {
      fetchEmergencyAlerts();
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleViewAlert = (alert) => {
    console.log('Viewing alert:', alert);
    navigate(`/alerts/${alert.id}`, { state: { alert } });
  };

  const handleTypeChange = (value) => {
    console.log("Value: ",value);
    setSelectedType(value);
  };
  const filteredAlerts = selectedType === 'All' ? alerts : alerts.filter(alert => alert.type === selectedType);
  const columns = [
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'black', display: 'block', padding: '3px', textAlign: 'center' , borderRadius: '8px'}}>Sr No.</span>,
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{index + 1}</span>,
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px',  color: 'black', display: 'block', padding: '3px', textAlign: 'center', borderRadius: '8px' }}>Name</span>,
      dataIndex: 'rider',
      key: 'rider',
      align: 'center',
      render: rider => (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{rider.name}</span>
      ),
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'black', display: 'block', padding: '3px', textAlign: 'center' , borderRadius: '8px'}}>Type</span>,
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: type => (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{type}</span>
      )
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px',  color: 'black', display: 'block', padding: '8px', textAlign: 'center', borderRadius: '8px' }}>Description</span>,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: text => <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{text || 'N/A'}</span>,
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'black', display: 'block', padding: '3px', textAlign: 'center' , borderRadius: '8px'}}>Time</span>,
      dataIndex: 'timestamp',
      key: 'timestamp',
      align: 'center',
      render: timestamp => (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{timestamp}</span>
      )
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'black', display: 'block', padding: '3px', textAlign: 'center', borderRadius: '8px' }}>Date</span>,
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: date => (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: 'center' }}>{date}</span>
      ),
    },
    {
      title: <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'black', display: 'block', padding: '3px', textAlign: 'center', borderRadius: '8px' }}>Action</span>,
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewAlert(record)} style={{ width: 'fit-content', display:'fit',lineHeight: '10px', fontSize: '17px', padding:'10px',color: 'white', textAlign: 'center',  backgroundColor: 'black' }}>
          View
        </Button>
      ),
    },
  ];

  // Calculate pagination range
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, filteredAlerts.length);

  return (
    <div className="alerts-page-container">
      <Row justify="space-between" style={{ paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
        <Col style={{ display: 'fit', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h1 className="alerts-title" style={{ marginBottom: '0px', fontFamily: 'Inter, sans-serif', textAlign: 'left', color: 'black', fontSize: '32px', marginTop: '24px' }}>
            Emergency Alerts
          </h1>
        </Col>
        <Col style={{ display: 'fit', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{ marginBottom: '0px', marginTop: '50px', fontFamily: 'Inter, sans-serif', textAlign: 'left', color: 'black', fontSize: '16px' }}>
            <h4 style={{ fontFamily: "'Inter', sans-serif", marginRight: '24px', textAlign: 'left', marginBottom:'0px' }}>Filter By
              <span style={{ marginLeft: '16px' }}></span>
              <Select defaultValue={selectedType} style={{ width: 160, marginBottom: '2px' }} onChange={handleTypeChange}>
                <Option value="All" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>All</Option>
                <Option value="Puncture" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Puncture</Option>
                <Option value="Path Deviation" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Path Deviation</Option>
                <Option value="Road Closure" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Road Closure</Option>
                <Option value="Accident" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Accident</Option>
                <Option value="Other" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Other</Option>
              </Select>
            </h4>
          </div>
        </Col>
        <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', marginBottom: '0px' }} />
      </Row>

      <div classname="alert-card-animation"  style={{marginTop:'0px',height: '730px', textAlign: 'center', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' , border: 'none',fontFamily: 'Inter, sans-serif', fontSize: '22px'}}>
      <Table
        dataSource={filteredAlerts.map((alert, index) => ({ ...alert, index }))}
        columns={columns}
        rowClassName="hover-shadow"
        style={{
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          fontSize: '17px',
          marginTop:'0px', 

        }}
        rowStyle={{ lineHeight: '1.5'  }} 
        pagination={<Pagination
          style={{ marginTop: '0px', textAlign: 'right', marginRight: '40px' }} // Adjust margin and textAlign as needed
          current={currentPage}
          total={filteredAlerts.length} // Total number of items
          defaultPageSize={10} // Number of items per page
          onChange={(page) => setCurrentPage(page)} // Handle page change
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} // Display total number of items
        />} 
      />
        
      </div>     
    </div>
  );
};
export default AlertsList;