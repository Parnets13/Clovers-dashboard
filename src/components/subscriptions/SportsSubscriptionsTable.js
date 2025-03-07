// src/components/subscriptions/SportsSubscriptionsTable.js
import React, { useState } from 'react';
import './SportsSubscriptionsTable.css';
import { Modal, Button, Form, Input, Select, message, InputNumber, DatePicker } from 'antd';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
const { Option } = Select;

const SportsSubscriptionsTable = ({ data, getAllSubScription, type }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();



  const [editid, seteditid] = useState("")
  const handleOk = async () => {

    try {
      const values = await form.validateFields();
      let res = await axios.put('http://localhost:8000/api/subscription/' + editid, {
        ...values,
        subscriptiontype: "Sport"
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 200) {
        message.success('Subscription updated successfully!');
        form.resetFields();
        getAllSubScription()
        setIsModalVisible(false);
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
  const deleteSubscription = async (id) => {
    try {
      let res = await axios.delete('http://localhost:8000/api/subscription/' + id);
      if (res.status == 200) {
        message.success("Subscription deleted successfully!");
        getAllSubScription()
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
      title: "Are you sure you want to delete this subscription?",
      content: `This action will permanently delete the subscription "${item.name}".`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteSubscription(item?._id)
      },
    });
  };
  const [facilityType, setFacilityType] = useState("");


  return (
    <div className="sports-subscriptions-table-container">
      <table className="sports-subscriptions-table">
        <thead>
          <tr>
          <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>{type}</th>
            <th>Duration</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(sub => (
            <tr key={sub._id}>
                 <td>{sub.subscriptionID}</td>
              <td>{sub.name}</td>
              <td>{sub.type} </td>
              <td>{sub.price}</td>
              <td>{sub.sport}</td>
              <td>{sub.duration} months</td>
              <td>{sub.discount} %</td>
           
              <td>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="qr-button"
                    onClick={() => {
                      setFacilityType(sub?.type)
                      form.setFieldsValue(sub)
                      setIsModalVisible(true)

                      seteditid(sub?._id);
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

                      handleDelete(sub)
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
            <td colSpan="9" className='text-center'>No subscriptions found.</td>
          </tr>}
        </tbody>
      </table>

      <Modal
        title="Update Subscription"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="sportsSubscriptionForm">
          {/* Subscription Name */}
          <Form.Item
            name="name"
            label="Subscription Name"
            rules={[{ required: true, message: 'Please enter a subscription name!' }]}
          >
            <Input placeholder="Enter subscription name " />
          </Form.Item>

          {/* General or Specialized */}
          {type == "Sports" ? <>
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

          </> : <>  <Form.Item
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


          </>}

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

export default SportsSubscriptionsTable;
