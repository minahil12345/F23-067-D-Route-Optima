import React, { useRef } from 'react';
import { Form, Input,Typography, Button, Row, Col } from 'antd';
import axios from 'axios';
import pic from '../../Assets/images/Register Screen Pic.png'
import './RegisterRidersPage.css';

const { Title } = Typography;
const RegisterForm = () => {
  const name = useRef();
  const cnic = useRef();
  const phone = useRef();
  const address = useRef();
  const email = useRef();
  const password = useRef();

  // const onFinish = (values) => {
  //   console.log('Received values:', values);
  //   // Add your logic here if needed
  // };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // Add your logic here if needed
  };

  const handleRegister = async () => {
    console.log('Entered!!!!');

    const registerData = {
      name: name.current?.input.value,
      cnic: cnic.current?.input.value,
      phone: phone.current?.input.value,
      address: address.current?.input.value,
      email: email.current?.input.value,
      password: password.current?.input.value,
    };

    console.log('Data ', registerData);
    // Add your registration logic here
    await axios.post("http://localhost:9000/rider/signup", registerData,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  return (
    <div>
     <Row justify="center" align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="form-container">
          <Form
            className="registration-form"
            layout="vertical"
            onFinish={handleRegister}
            onFinishFailed={onFinishFailed}
            style={{fontFamily: "'Inter', sans-serif", fontSize: '17px'}}
          >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
                labelStyle={{fontFamily: 'Inter, sans-serif', fontSize: '20px'}}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }} // Adjust font size
              >
                <Input placeholder="Name" ref={name} style={{ fontSize: '17px', width: '100%' }} /> {/* Adjust font size and width */}
              </Form.Item>

              <Form.Item
                label="CNIC"
                name="cnic"
                rules={[
                  {
                    required: true,
                    message: 'Please input your cnic!',
                  },
                ]}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }} // Adjust font size
              >
                <Input placeholder="CNIC" ref={cnic} style={{ fontSize: '17px', width: '100%' }} /> {/* Adjust font size and width */}
              </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                      {
                      required: true,
                      message: 'Please input your Phone number!',
                      },
                  ]}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}
                >
                  <Input placeholder="Phone" ref={phone} style={{ fontSize: '17px', width: '100%' }}/>
                </Form.Item>
                
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                      {
                      required: true,
                      message: 'Please input your address!',
                      },
                  ]}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}
                >
                  <Input placeholder="Address" ref={address} style={{ fontSize: '17px', width: '100%' }}/>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                      {
                      required: true,
                      message: 'Please input your email!',
                      },
                  ]}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}
                >
                  <Input placeholder="Email" ref={email} style={{ fontSize: '17px', width: '100%' }}/>
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                      {
                      required: true,
                      message: 'Please input your password!',
                      },
                  ]}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px' }}
                >
                  <Input.Password placeholder="Password" ref={password} style={{ fontSize: '17px', width: '100%' }}/>
                </Form.Item>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit"  onClick={handleRegister} style={{
                    width: '150px', // Adjust the width as needed
                    fontSize: '18px', // Adjust the font size as needed
                    color: 'black', // Set text color to black
                    textAlign: 'center',
                    lineHeight: '23px',
                    color: 'white',
                    backgroundColor: 'black',
                  }} >Register</Button>
                </Form.Item>
                </div>
           </Form>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          {/* <div className="image-container"> */}
            <img src={pic} alt="RouteOptima Logo"  className="image-container"/>
          {/* </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default RegisterForm;