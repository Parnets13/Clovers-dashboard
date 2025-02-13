import React, { useEffect, useState } from 'react';

import './FacilitySubscriptionsPage.css';
import { Modal, Button, Form, Input, Select, message, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
import SportsSubscriptionsTable from './SportsSubscriptionsTable';
const { Option } = Select;

const FacilitySubscriptionsPage = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();


  const showModal = () => {
    setIsModalVisible(true);
  };

  const [AllSubScription, setAllSub] = useState([]);

  const getAllSubScription = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/subscription/type/Facility');
      if (res.status == 200) {
        setAllSub(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [facilityType, setFacilityType] = useState("");
  const handleOk = async () => {

    try {
      const values = await form.validateFields();
      let res = await axios.post('http://localhost:8000/api/subscription', {
        ...values,
        subscriptiontype: "Facility"
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
    <div className="facility-subscriptions-container">

      <div className="main-content">

        <div className="facility-subscriptions-content" >
          <div className='flex justify-between'>
             <h2 >Facility Subscriptions</h2>
          <div className="facility-subscriptions-actions">
            <button className="primary-button " onClick={() => {
              setIsModalVisible(true);
            }}>Add New Subscription</button>
          </div>
          </div>
         
          <SportsSubscriptionsTable data={AllSubScription} getAllSubScription={getAllSubScription} type="Facility"/>
        </div>
      </div>
      <Modal
        title="Create Facilitys Subscription"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="FacilitysSubscriptionForm">
          {/* Subscription Name */}
          <Form.Item
            name="name"
            label="Subscription Name"
            rules={[{ required: true, message: 'Please enter a subscription name!' }]}
          >
            <Input placeholder="Enter the subscription name"  />
          </Form.Item>


          <Form.Item
            name="type"
            label="Facility Type"
            rules={[{ required: true, message: "Please select a facility type!" }]}
          >
            <Select
              placeholder="Select facility type"
              onChange={(value) => setFacilityType(value)} // Update facility type
            >
              <Option value="dining">Dining (Restaurant/Bar)</Option>
              <Option value="event">Event-based Membership</Option>
            </Select>
          </Form.Item>

          {/* Conditional Fields Based on Facility Type */}
          {facilityType === "dining" && (
            <Form.Item
              name="sport"
              label="Menu Options"
              rules={[{ required: true, message: "Please enter the menu options!" }]}
            >
              <Input placeholder="E.g., Buffet, A La Carte, Drinks" />
            </Form.Item>
          )}

          {facilityType === "event" && (
            <Form.Item
              name="sport"
              label="Event Access Details"
              rules={[{ required: true, message: "Please provide event access details!" }]}
            >
              <Input placeholder="E.g., Conferences, Workshops, Parties" />
            </Form.Item>
          )}

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
            label="Price"
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

export default FacilitySubscriptionsPage;
