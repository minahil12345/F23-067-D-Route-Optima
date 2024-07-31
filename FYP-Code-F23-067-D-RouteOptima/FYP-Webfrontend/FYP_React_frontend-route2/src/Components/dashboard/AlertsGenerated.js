import React, { useState, useEffect } from 'react';
import { Typography, Select } from 'antd';
import { PieChart, Pie, Cell,ResponsiveContainer,Label} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const AlertsGenerated = ({selectedSegment}) => {
  const [data, setData] = useState([]);

  const fetchData = (filterOption) => {
    let newData = [];
    switch (filterOption) {
      case 'Today':
        newData = [{ type: 'Road Closure', value: 20 }, { type: 'Puncture', value: 30 }, { type: 'Accident', value: 25 }, { type: 'Other', value: 25 }];
        break;
      case 'This Week':
        newData = [{ type: 'Road Closure', value: 10 }, { type: 'Puncture', value: 80 }, { type: 'Accident', value: 5 }, { type: 'Other', value: 5 }];
        break;
      case 'Last Week':
        newData = [{ type: 'Road Closure', value: 50 }, { type: 'Puncture', value: 50 }, { type: 'Accident', value: 0 }, { type: 'Other', value: 0 }];
        break;
      case 'This Month':
        newData = [{ type: 'Road Closure', value: 40 }, { type: 'Puncture', value: 10 }, { type: 'Accident', value: 35 }, { type: 'Other', value: 15 }];
        break;
      case 'Last Month':
        newData = [{ type: 'Road Closure', value: 80 }, { type: 'Puncture', value: 8 }, { type: 'Accident', value: 2 }, { type: 'Other', value: 10 }];
        break;
      case 'Yearly':
        newData = [{ type: 'Road Closure', value: 30 }, { type: 'Puncture', value: 40 }, { type: 'Accident', value: 10 }, { type: 'Other', value: 20 }];
        break;
      default:
        break;
    }
    setData(newData);
  };

  const handleFilterChange = (value) => {
    fetchData(value);
  };

  useEffect(() => {
    fetchData(selectedSegment);
  }, [selectedSegment]);

  const COLORS = ['#F16A70', '#B1D877', '#8CDCDA', '#4D4D4D'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "500px" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
        <Title level={3} style={{fontFamily: 'Inter, sans-serif',fontSize: '22px', margin: '0', lineHeight: '20px' }}>Alerts Generated</Title>
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
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={170}
        fill="#8884d8"
        dataKey="value"
        label={({ type, value }) =>`${type}: ${value}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        {/* <Label value={`${data.type}: ${data.value}%`} position="center" style={{ fill: 'black', fontSize: '16px' }} /> */}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

      
    </div>
  );
};

export default AlertsGenerated;
