import React, { useState, useEffect } from 'react';
import { Typography, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Cell,CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const TotalDistance = ({ selectedSegment }) => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    let newData = [];
    switch (selectedSegment) {
      case 'Today':
        newData = [
          { rider: 'Rider 1', distance: 200 },
          { rider: 'Rider 2', distance: 300 },
          { rider: 'Rider 3', distance: 250 },
          { rider: 'Rider 4', distance: 400 },
          { rider: 'Rider 5', distance: 100 },
        ];
        break;
      case 'This Week':
        newData = [
          { rider: 'Rider 1', distance: 500 },
          { rider: 'Rider 2', distance: 700 },
          { rider: 'Rider 3', distance: 600 },
          { rider: 'Rider 4', distance: 800 },
          { rider: 'Rider 5', distance: 750 },
        ];
        break;
      case 'Last Week':
        newData = [
          { rider: 'Rider 1', distance: 600 },
          { rider: 'Rider 2', distance: 650 },
          { rider: 'Rider 3', distance: 700},
          { rider: 'Rider 4', distance: 800 },
          { rider: 'Rider 5', distance: 900 },
        ];
        break;
      case 'This Month':
        newData = [
          { rider: 'Rider 1', distance: 1200 },
          { rider: 'Rider 2', distance: 1350 },
          { rider: 'Rider 3', distance: 1300 },
          { rider: 'Rider 4', distance: 1400 },
          { rider: 'Rider 5', distance: 1100 },
        ];
        break;
        case 'Last Month':
        newData = [
          { rider: 'Rider 1', distance: 1400 },
          { rider: 'Rider 2', distance: 1700 },
          { rider: 'Rider 3', distance: 1650 },
          { rider: 'Rider 4', distance: 1500 },
          { rider: 'Rider 5', distance: 1600 },
        ];
        break;
        case 'Yearly':
        newData = [
          { rider: 'Rider 1', distance: 5000 },
          { rider: 'Rider 2', distance: 6500 },
          { rider: 'Rider 3', distance: 7000 },
          { rider: 'Rider 4', distance: 8000 },
          { rider: 'Rider 5', distance: 8500 },
        ];
        break;
      default:
        break;
    }
    setData(newData);
  };

  useEffect(() => {
    fetchData(selectedSegment);
  }, [selectedSegment]);

  const handleFilterChange = (value) => {
      fetchData(value);
     };

  const threshold = 800; // Define threshold value
  const COLORS = ['#FE6C00', '#F3E5AB', '#A5A17E', '#E0FFA2', '#9AB973']; // Colors for different riders

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  height: "500px" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
        <Title level={3} style={{ fontFamily: 'Inter, sans-serif',fontSize: '22px',margin: '0', lineHeight: '20px' }}>Total Distance</Title>
        <Select defaultValue="Today" onChange={handleFilterChange} style={{ fontFamily: 'Inter, sans-serif',fontSize: '17px',width: 200, marginRight: '20px' }}>
          <Option value="Today" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Today</Option>
          <Option value="This Week" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Week</Option>
          <Option value="Last Week" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Last Week</Option>
          <Option value="This Month" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Month</Option>
          <Option value="Last Month" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Last Month</Option>
          <Option value="Yearly" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Year</Option>
        </Select>
      </div>
      <div style={{ width: '80%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rider" />
          {/* <Legend /> */}
          <YAxis />
          <Tooltip />
          
          <Bar dataKey="distance" fill={"#FFA45D"} />
           
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default TotalDistance;