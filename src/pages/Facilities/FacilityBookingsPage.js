// src/pages/Facilities/FacilityBookingsPage.js
import React, { useEffect, useState } from 'react';

import FacilityBookingTable from '../../components/facilities/FacilityBookingTable';
import './FacilityBookingsPage.css';
import { Modal, Button, Form, Input, Select, message, InputNumber, TimePicker, DatePicker } from "antd";
import axios from 'axios';
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;


const FacilityBookingsPage = () => {

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

  const [AllBooking, setAllBooking] = useState([]);

  const getAllBooking = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/facility/booking');
      if (res.status == 200) {
        setAllBooking(res.data.success)
      }
    } catch (error) {
      console.log(error);

    }
  }

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      let res = await axios.post('http://localhost:8000/api/facility/booking', {
        ...values,
        startTime: values.startTime ? values.startTime.format("HH:mm") : null,
        endTime: values.endTime ? values.endTime.format("HH:mm") : null,
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 201) {
        message.success('Facility book created successfully!');
        form.resetFields();
        setIsModalVisible(false);
        getAllBooking()
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

  const [members, setMembers] = useState([]);

  const getAllMembers = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/users/getAllusers');
      if (res.status == 200) {
        setMembers(res.data.success)
      }
    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getAllFacility();
    getAllMembers();
    getAllBooking();
  }, []);

  return (
    <div className="facility-bookings-container">
      <div className="main-content">
        <div className="facility-bookings-content">
          <div className='flex justify-between'>
            <h2 >Facility Bookings</h2>
            <div className="facility-bookings-actions">
              <button className="primary-button" onClick={() => setIsModalVisible(true)}>Add Booking</button>
            </div>
          </div>
          <FacilityBookingTable data={AllBooking} getAllBooking={getAllBooking} members={members} AllFacility={AllFacility} />
        </div>
      </div>


      <Modal
        title="Facility Booking"
        visible={isModalVisible}
        onOk={() => {
          form.validateFields()
            .then(values => {
              handleOk(values); // Pass form values to `handleOk`
            })
            .catch(info => {
              message.error("Please correct the form errors before submitting.");
            });
        }}

        onCancel={() => {
          form.resetFields(); // Reset the form on cancel
          handleCancel();
        }}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{

            people: 1, // Default number of people
            person: [{ name: "", gender: "", age: "" }],
          }}
        >
          {/* Member */}
          <Form.Item
            name="memberId"
            label="Member"
            rules={[{ required: true, message: "Please select a member!" }]}
          >
            <Select placeholder="Select a member">
              {members?.map((member) => (
                <Option key={member._id} value={member._id}>
                  {member.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Facility */}
          <Form.Item
            name="facilityId"
            label="Facility"
            rules={[{ required: true, message: "Please select a facility!" }]}
          >
            <Select placeholder="Select a facility">
              {AllFacility?.map((facility) => (
                <Option key={facility._id} value={facility._id}>
                  {facility.name} ({facility.type})
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Facility Name */}
          {/* <Form.Item
            name="facilityName"
            label="Facility Name"
            rules={[{ required: true, message: "Facility name is required!" }]}
          >
            <Input placeholder="Enter the facility name" />
          </Form.Item> */}

          {/* Booking Date */}
          <Form.Item
            name="bookingDate"
            label="Booking Date"
            rules={[{ required: true, message: "Please select a booking date!" }]}
          >
            <DatePicker style={{ width: "100%" }} disabledDate={(current) => {
              // Disable dates before today
              return current && current < moment().startOf("day");
            }} />
          </Form.Item>

          {/* Start Time */}
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: "Please select a start time!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          {/* End Time */}
          <Form.Item
            name="endTime"
            label="End Time"
            dependencies={["startTime"]}
            rules={[
              { required: true, message: "Please select an end time!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startTime = getFieldValue("startTime");
                  if (startTime && value && value.isBefore(startTime)) {
                    return Promise.reject("End time must be after the start time!");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          {/* Number of People */}
          <Form.Item
            name="people"
            label="Number of People"

            rules={[{ required: true, message: "Please enter the number of people!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter number of people" onChange={(value) => {
              const peopleDetails = form.getFieldValue("person") || [];
              const updatedPeopleDetails = [...peopleDetails];

              // Add or remove entries in the peopleDetails array
              if (value > updatedPeopleDetails.length) {
                for (let i = updatedPeopleDetails.length; i < value; i++) {
                  updatedPeopleDetails.push({ name: "", gender: "", age: "" });
                }
              } else if (value < updatedPeopleDetails.length) {
                updatedPeopleDetails.splice(value);
              }

              // Update the form with the new peopleDetails array
              form.setFieldsValue({ person: updatedPeopleDetails });
            }} />
          </Form.Item>

          {/* People Details */}
          <Form.Item label="People Details">
            <Form.List name="person">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        gap: "10px",
                        // marginBottom: "5px",
                        // alignItems: "center",
                        // alignContent:"center"
                      }}
                    >
                      {/* Name */}
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        fieldKey={[fieldKey, "name"]}
                        rules={[{ required: true, message: "Please enter a name!" }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>

                      {/* Gender */}
                      <Form.Item
                        {...restField}
                        name={[name, "gender"]}
                        fieldKey={[fieldKey, "gender"]}
                        rules={[{ required: true, message: "Please select gender!" }]}
                      >
                        <Select placeholder="Gender">
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>

                      {/* Age */}
                      <Form.Item
                        {...restField}
                        name={[name, "age"]}
                        fieldKey={[fieldKey, "age"]}
                        rules={[
                          { required: true, message: "Please enter age!" },
                          { pattern: /^\d+$/, message: "Age must be a number!" },
                        ]}
                      >
                        <Input placeholder="Age" />
                      </Form.Item>

                      {/* Remove Button */}
                      <a
                        onClick={() => {
                          remove(name);

                          // Update the people count to match the current length of peopleDetails
                          const currentPeopleDetails = form.getFieldValue("person");
                          form.setFieldsValue({ people: currentPeopleDetails.length });
                        }}
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          cursor: "pointer",

                        }}
                      >
                        Remove
                      </a>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>


          {/* Special Requests */}
          <Form.Item
            name="specialRequests"
            label="Special Requests"
          >
            <TextArea placeholder="Enter any special requests (optional)" rows={3} />
          </Form.Item>

          {/* Price */}
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter the price" />
          </Form.Item>

          {/* Discount */}
          <Form.Item
            name="discount"
            label="Discount"
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter the discount" />
          </Form.Item>

          {/* Tax */}
          <Form.Item
            name="tax"
            label="Tax"
          >
            <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter the tax amount" />
          </Form.Item>

          {/* Payment Type */}
          <Form.Item
            name="paymentType"
            label="Payment Type"
          >
            <Select placeholder="Select payment type">
              <Option value="cash">Cash</Option>
              <Option value="card">Card</Option>
              <Option value="online">Online</Option>
            </Select>
          </Form.Item>

          {/* Payment Status */}
          <Form.Item
            name="paymentsStatus"
            label="Payment Status"
          >
            <Select placeholder="Select payment status">
              <Option value="completed">Completed</Option>
              <Option value="inprogress">In Progress</Option>
              <Option value="failed">Failed</Option>
            </Select>
          </Form.Item>

          {/* Booking Status */}
          <Form.Item
            name="status"
            label="Booking Status"
          >
            <Select placeholder="Select booking status">
              <Option value="pending">Pending</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default FacilityBookingsPage;
