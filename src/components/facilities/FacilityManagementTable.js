// src/components/facilities/FacilityManagementTable.js
import React, { useState } from 'react';
import './FacilityManagementTable.css';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Modal, Button, Form, Input, Select, message, InputNumber } from "antd";
import axios from 'axios';
const { Option } = Select;
const FacilityManagementTable = ({data,getAllFacility}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm(); // Ant Design form instance
  const [edit,setEdit]=useState([]);
  
  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close modal
  };

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      // console.log("Form Values:", values);
      let res = await axios.put('http://localhost:8000/api/facility/'+edit, {
        ...values,
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 200) {
        message.success('Facility updated successfully!');
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

  const deleteFacility = async (id) => {
    try {
      let res = await axios.delete('http://localhost:8000/api/facility/' + id);
      if (res.status == 200) {
        message.success("Subscription deleted successfully!");
        getAllFacility()
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        message.error(error.response.data.error)
      } else {
        message.error(error.response)
      }

    }
  }

  const handleDelete = (item) => {
    Modal.confirm({
      title: "Are you sure you want to delete this facility?",
      content: `This action will permanently delete the facility "${item.name}".`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteFacility(item?._id)
      },
    });
  };


  return (
    <div className="facility-management-table-container">
      <table className="facility-management-table">
        <thead>
          <tr>
          <th>S.No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((f,i) => (
            <tr key={f.id}>
               <td>{i+1}.</td>
              <td>{f.name}</td>
              <td>{f.status}</td>
              <td>{f.type}</td>
              <td>{f.capacity} people</td>
              <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                                 <button
                                   className="qr-button"
                                   onClick={() => {
                                    //  setFacilityType(sub?.type)
                                     form.setFieldsValue(f)
                                     setIsModalVisible(true)
               
                                    setEdit(f?._id);
                                   }}
                                   style={{
                                     color: "#C5A48A",
                                     border: "none",
                                     borderRadius: "50px",
                                     padding: "7px 9px",
                                     cursor: "pointer"
                                   }}
                                 >
                                   <FaEdit size={20} title='Edit' />
                                 </button>
                                 <button
                                   style={{
                                     color: "red",
                                     border: "none",
                                     borderRadius: "50px",
                                     padding: "7px 9px",
                                     cursor: "pointer"
                                   }}
                                   onClick={() => {
               
                                     handleDelete(f)
                                   }}
                                   className="qr-button"
                                 >
                                   <MdDelete size={20} title='Delete' />
                                 </button>
                               </div>
              </td>
            </tr>
          ))}
           {data.length == 0 && <tr>
            <td colSpan="5" className='text-center'>No subscriptions found.</td>
          </tr>}
        </tbody>
      </table>
        <Modal
              title="Update Facility "
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
      
                {/* Status */}
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
      
                {/* capacity */}
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true, message: "Please enter a capacity!" }]}
                >
                  <InputNumber min={1} placeholder="Enter feature capacity" style={{ width: '100%' }}/>
                </Form.Item>
      
              </Form>
            </Modal>
    </div>
  );
};

export default FacilityManagementTable;
