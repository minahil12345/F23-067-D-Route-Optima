import React, { useState, useEffect } from 'react';
import { Typography, Select } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell,ResponsiveContainer } from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const OngoingDeliveries = () => {
  const [data, setData] = useState([
    { type: 'On-Time', value: 80 },
    { type: 'Late', value: 20 },
  ]);
  const [selectedRider, setSelectedRider] = useState(null);

  useEffect(() => {
    // Fetch data based on filter option and selected rider (not implemented in this example)
    fetchData('Rider 1');
  }, ['Rider 1']);

  const fetchData = (filterOption) => {
    let newData = [];
    switch (filterOption) {
      case 'Rider 1':
        newData = [{ type: 'On-Time', value: 50 },{ type: 'Late', value: 50 }];
        break;
      case 'Rider 2':
        newData = [{ type: 'On-Time', value: 70 },{ type: 'Late', value: 30 }];
        break;
      case 'Rider 3':
        newData = [{ type: 'On-Time', value: 90 },{ type: 'Late', value: 10 }];
        break;
      default:
        break;
    }
    setData(newData);
  };

  const handleRiderChange = (value) => {
    setSelectedRider(value);
  };

  const COLORS = ['#00A86B', '#A8201A']; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',height: "500px" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
        <Title level={3} style={{fontFamily: 'Inter, sans-serif',fontSize: '22px', margin: '0', lineHeight: '20px' }}>On-Going Deliveries</Title>
        <Select defaultValue="Rider 1" onChange={handleRiderChange} style={{fontFamily: 'Inter, sans-serif',fontSize: '17px',width: 200, marginRight: '20px' }}>
              <Option value="Rider 1" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Rider 1</Option>
              <Option value="Rider 2" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Rider 2</Option>
              <Option value="Rider 3" style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>Rider 3</Option>
            </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={170}
            fill="#8884d8"
            dataKey="value"
            label={({ type, value }) => `${type}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OngoingDeliveries;
