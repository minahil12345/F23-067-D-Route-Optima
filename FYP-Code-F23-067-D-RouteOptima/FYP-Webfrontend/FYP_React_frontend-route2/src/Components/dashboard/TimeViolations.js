import React, { useState, useEffect } from 'react';
import { Typography, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const TimeViolations = ({ selectedSegment }) => {
  const [data, setData] = useState([]);

  const fetchData = (filterOption) => {
    let newData = [];
    switch (filterOption) {
      case 'Today':
        newData = [
          { type: 'Rider 1', NoOfViolations: 5 },
          { type: 'Rider 2', NoOfViolations: 8 },
          { type: 'Rider 3', NoOfViolations: 10 },
          { type: 'Rider 4', NoOfViolations: 2 },
          { type: 'Rider 5', NoOfViolations: 6 },
        ];
        break;
      case 'This Week':
        newData = [
          { type: 'Rider 1', NoOfViolations: 20 },
          { type: 'Rider 2', NoOfViolations: 25 },
          { type: 'Rider 3', NoOfViolations: 18 },
          { type: 'Rider 4', NoOfViolations: 8 },
          { type: 'Rider 5', NoOfViolations: 15 },
        ];
        break;
      case 'Last Week':
        newData = [
          { type: 'Rider 1', NoOfViolations: 50 },
          { type: 'Rider 2', NoOfViolations: 35 },
          { type: 'Rider 3', NoOfViolations: 45 },
          { type: 'Rider 4', NoOfViolations: 30 },
          { type: 'Rider 5', NoOfViolations: 40 },
        ];
        break;
      case 'This Month':
        newData = [
          { type: 'Rider 1', NoOfViolations: 150 },
          { type: 'Rider 2', NoOfViolations: 120 },
          { type: 'Rider 3', NoOfViolations: 130 },
          { type: 'Rider 4', NoOfViolations: 140 },
          { type: 'Rider 5', NoOfViolations: 110 },
        ];
        break;
        case 'Last Month':
        newData = [
          { type: 'Rider 1', NoOfViolations: 50 },
          { type: 'Rider 2', NoOfViolations: 220 },
          { type: 'Rider 3', NoOfViolations: 180 },
          { type: 'Rider 4', NoOfViolations: 70 },
          { type: 'Rider 5', NoOfViolations: 250 },
        ];
        break;
        case 'Yearly':
        newData = [
          { type: 'Rider 1', NoOfViolations: 30 },
          { type: 'Rider 2', NoOfViolations: 150 },
          { type: 'Rider 3', NoOfViolations: 70 },
          { type: 'Rider 4', NoOfViolations: 140 },
          { type: 'Rider 5', NoOfViolations: 200 },
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

  const threshold = 20; // Define threshold value
  const COLORS = ['#E16A3D', '#FFA45D', '#1C9290', '#016A6D', '#043E52']; // Colors for different riders

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "500px" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
        <Title level={3} style={{ fontFamily: 'Inter, sans-serif',fontSize: '22px', margin: '0', lineHeight: '20px' }}>Time Violations</Title>
        <Select defaultValue="Today" onChange={handleFilterChange} style={{fontFamily: 'Inter, sans-serif',fontSize: '17px', width: 200, marginRight: '20px' }}>
          <Option value="Today" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Today</Option>
          <Option value="This Week" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Week</Option>
          <Option value="Last Week" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Last Week</Option>
          <Option value="This Month" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Month</Option>
          <Option value="Last Month" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Last Month</Option>
          <Option value="Yearly" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>This Year</Option>
        </Select>
      </div>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          {/* <Legend /> */}
          <YAxis />
          <Tooltip />
          
          <Bar dataKey="NoOfViolations" fill={"#043E52"} />
          
        </BarChart>
      </ResponsiveContainer>
  </div>
  );
};

export default TimeViolations;