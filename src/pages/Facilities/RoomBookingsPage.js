// src/pages/Facilities/RoomBookingsPage.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Select, message, InputNumber, TimePicker, DatePicker } from "antd";
import RoomBookingTable from '../../components/facilities/RoomBookingTable';
import './RoomBookingsPage.css';
import axios from 'axios';
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const RoomBookingsPage = () => {

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
  const [rooms, setRooms] = useState([]);
  const getAllRoom = async () => {
    try {
      // setLoading(true)
      let res = await axios.get('http://localhost:8000/api/room');
      if (res.status == 200) {
        // setLoading(false)
        setRooms(res.data.success);
      }
    } catch (error) {
      console.log(error);
      // setLoading(false)

    }
  }

  const [AllBooking, setAllBooking] = useState([]);
  const getAllBooking = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/room/booking/all');
      if (res.status == 200) {
        setAllBooking(res.data.success)
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAllBooking();
    getAllMembers();
    getAllRoom();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm(); // Ant Design form instance

  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close modal
  }

  const [selectRoom,setSelectRoom]=useState({});



  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      let res = await axios.post('http://localhost:8000/api/room/booking', {
        ...values,
        roomId:JSON.parse(values?.roomId)?._id,
        roomName:JSON.parse(values?.roomId)?.roomName,
        checkInTime: values.checkInTime ? values.checkInTime.format("HH:mm") : null,
        checkOutTime: values.checkOutTime ? values.checkOutTime.format("HH:mm") : null,
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 201) {
        message.success('Room booked successfully!');
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
        message.error(error.response.data.error?.msg || "API Error occurred.");
        // console.error("API Error:", error.response);
      }
      // Handle unexpected errors
      else {
        message.error(error.message || "An unexpected error occurred.");
        // console.error("Unexpected Error:", error);
      }
    }
  };

  console.log("Alll",AllBooking);
  


  return (
    <div className="room-bookings-container">

      <div className="main-content">

        <div className="room-bookings-content">
          <div className='flex justify-between'>
            <h2>Room Bookings</h2>
            <div className="room-bookings-actions">
              <button className="primary-button" onClick={() => {
                setIsModalVisible(true);
              }}>Add Room Booking</button>
            </div>
          </div>
          <RoomBookingTable data={AllBooking} getAllBooking={getAllBooking}/>
        </div>
      </div>
      <Modal
        title="Room Booking"
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
                  {member.Member_Name}-{member.Membership_No}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Facility */}
          <Form.Item
            name="roomId"
            label="Room"
            rules={[{ required: true, message: "Please select a facility!" }]}
          >
            <Select placeholder="Select a room" onChange={(value)=>{
             
              
              if(value){
                value=JSON.parse(value);
                setSelectRoom(value);
                form.setFieldsValue({price:value?.price})
                console.log("vallll",value);
              }else{
                setSelectRoom({});
              }
            }} >
              {rooms?.map((facility) => (
                <Option key={facility._id} value={JSON.stringify(facility)}>
                  {facility.roomName} ({facility.roomNumber})
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
            name="checkInDate"
            label="Check In Date"
            rules={[{ required: true, message: "Please select a booking check in date!" }]}
          >
            <DatePicker style={{ width: "100%" }} disabledDate={(current) => {
              // Disable dates before today
              return current && current < moment().startOf("day");
            }} />
          </Form.Item>

          {/* Start Time */}
          <Form.Item
            name="checkInTime"
            label="Check In Time"
            rules={[{ required: true, message: "Please select a start time!" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="checkOutDate"
            label="Check Out Date"
            rules={[{ required: true, message: "Please select a booking checkout date!" }]}
          >
            <DatePicker style={{ width: "100%" }} disabledDate={(current) => {
              // Disable dates before today
              return current && current < moment().startOf("day");
            }} />
          </Form.Item>

          {/* End Time */}
          <Form.Item
            name="checkOutTime"
            label="Check Time"
            dependencies={["checkOutTime"]}
            rules={[
              { required: true, message: "Please select an end time!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startTime = getFieldValue("checkInTime");
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

export default RoomBookingsPage;
