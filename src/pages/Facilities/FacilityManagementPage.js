import React, { useEffect, useState } from 'react';

import FacilityManagementTable from '../../components/facilities/FacilityManagementTable';
import './FacilityManagementPage.css';
import { Modal, Button, Form, Input, Select, message, InputNumber } from "antd";
import axios from 'axios';

const { Option } = Select;

const FacilityManagementPage = () => {

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm(); // Ant Design form instance
  const [AllFacility, setAllFacility] = useState([]);

  const getAllFacility = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/facility');
      if (res.status == 200) {
        setAllFacility(res.data.success)
      }
    } catch (error) {
      console.log(error);

    }
  }
  // Close modal
  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close modal
  };

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      // console.log("Form Values:", values);
      let res = await axios.post('http://localhost:8000/api/facility', {
        ...values,
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 201) {
        message.success('Facility created successfully!');
        form.resetFields();
        setIsModalVisible(false);
        getAllFacility()
      }
    } catch (error) {
      if (error.errorFields) {
        message.error("Please fix the errors in the form.");
        // console.error("Validation Errors:", error.errorFields);
      }
      // Check if it's an API error
      else if (error.response) {
        message.error(error.response.data.error || "API Error occurred.");
        // console.error("API Error:", error.response);
      }
      // Handle unexpected errors
      else {
        message.error(error.message || "An unexpected error occurred.");
        // console.error("Unexpected Error:", error);
      }
    }
  };




  useEffect(() => {
    getAllFacility()
  }, []);

  return (
    <div className="facility-management-container">
      <div className="main-content">
        <div className="facility-management-content">
          <div className='flex justify-between'>
            <h2>Event Management</h2>
            <div className="facility-management-actions">
              <button className="primary-button" onClick={() => setIsModalVisible(true)}>Add Facility</button>
            </div>
          </div>
          <FacilityManagementTable data={AllFacility} getAllFacility={getAllFacility} />
        </div>
      </div>


      <Modal
        title="Add Event Facility "
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
        >
          {/* Feature Name */}
          <Form.Item
            name="name"
            label="facility Name"
            rules={[{ required: true, message: "Please enter the facility name!" }]}
          >
            <Input placeholder="Enter facility name" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please enter a type!" }]}
          >
            <Input placeholder="Enter facility type" />
          </Form.Item>

   
          
          {/* capacity */}
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please enter a capacity!" }]}
          >
            <InputNumber min={1} placeholder="Enter feature capacity" style={{ width: '100%' }} />
          </Form.Item>
          {/* capacity */}
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter a price!" }]}
          >
            <InputNumber min={1} placeholder="Enter feature price" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="maintenance">maintenance</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default FacilityManagementPage;
