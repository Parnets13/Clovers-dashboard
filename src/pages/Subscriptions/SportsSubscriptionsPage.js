// src/pages/Subscriptions/SportsSubscriptionsPage.js
import React, { useEffect, useState } from 'react';
import SportsSubscriptionsTable from '../../components/subscriptions/SportsSubscriptionsTable';
import './SportsSubscriptionsPage.css';
import { Modal, Button, Form, Input, Select, message, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
const { Option } = Select;


const SportsSubscriptionsPage = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();


  const showModal = () => {
    setIsModalVisible(true);
  };

  const [AllSubScription, setAllSub] = useState([]);

  const getAllSubScription = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/subscription/type/Sport');
      if (res.status == 200) {
        setAllSub(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOk = async () => {

    try {
      const values = await form.validateFields();
      let res = await axios.post('http://localhost:8000/api/subscription', {
        ...values,
        subscriptiontype: "Sport"
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 201) {
        message.success('Subscription created successfully!');
        form.resetFields();

        setIsModalVisible(false);
        getAllSubScription()
      }
    } catch (error) {
      console.log('Validation Failed:', error);
      if (error.errorFields) {
        message.error("Please fix the errors in the form.");
        console.error("Validation Errors:", error.errorFields);
      }
      // Check if it's an API error
      else if (error.response) {
        message.error(error.response.data.error || "API Error occurred.");
        console.error("API Error:", error.response);
      }
      // Handle unexpected errors
      else {
        message.error(error.message || "An unexpected error occurred.");
        console.error("Unexpected Error:", error);
      }
    }
  };

  // Close the modal
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };




  useEffect(() => {
    getAllSubScription()
  }, [])
  return (
    <div className="sports-subscriptions-container">

      <div className="main-content">

        <div className="sports-subscriptions-content">
          <div className='flex justify-between'>
            <h2>Sports Subscriptions</h2>
            <div className="sports-subscriptions-actions">
              <button className="primary-button" onClick={() => showModal(true)}>Add New Subscription</button>
            </div>
          </div>
          <SportsSubscriptionsTable data={AllSubScription} getAllSubScription={getAllSubScription} type="Sports" />
        </div>
      </div>
      <Modal
        title="Create Sports Subscription"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="sportsSubscriptionForm">
          {/* Subscription Name */}
          <Form.Item
            name="name"
            label="Subscription Name"
            rules={[{ required: true, message: 'Please enter a subscription name!' }]}
          >
            <Input placeholder="Enter subscription name (e.g., Tennis Membership)" />
          </Form.Item>

          {/* General or Specialized */}
          <Form.Item
            name="type"
            label="Subscription Type"
            rules={[{ required: true, message: 'Please select a subscription type!' }]}
          >
            <Select placeholder="Select a subscription type">
              <Option value="general">General Sports</Option>
              <Option value="specialized">Specialized Sports</Option>
            </Select>
          </Form.Item>

          {/* Sport Selection */}
          <Form.Item
            name="sport"
            label="Sport"
            rules={[{ required: true, message: 'Please select a sport!' }]}
          >
            <Select placeholder="Select a sport">
              <Option value="tennis">Tennis</Option>
              <Option value="swimming">Swimming</Option>
              <Option value="badminton">Badminton</Option>
              <Option value="soccer">Soccer</Option>
            </Select>
          </Form.Item>

          {/* Duration */}
          <Form.Item
            name="duration"
            label="Duration (Months)"
            rules={[{ required: true, message: 'Please enter the duration!' }]}
          >
            <InputNumber min={1} placeholder="Enter duration in months" style={{ width: '100%' }} />
          </Form.Item>

          {/* Price */}
          <Form.Item
            name="price"
            label="Price (per month)"
            rules={[
              { required: true, message: 'Please enter the price!' },
              { type: 'number', message: 'Price must be a number!', transform: (value) => Number(value) },
            ]}
          >
            <InputNumber min={0} placeholder="Enter price per month" style={{ width: '100%' }} />
          </Form.Item>

          {/* Discount */}
          <Form.Item
            name="discount"
            label="Discount (%) for Longer Durations"
            rules={[{ required: false, type: 'number', message: 'Discount must be a number!', transform: (value) => Number(value) }]}
          >
            <InputNumber min={0} max={100} placeholder="Enter discount percentage" style={{ width: '100%' }} />
          </Form.Item>

          {/* Start Date */}
          {/* <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select a start date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default SportsSubscriptionsPage;
