// src/components/facilities/RoomBookingTable.js
import React, { useEffect, useState } from 'react';
import './RoomBookingTable.css';
import moment from 'moment';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Modal, Descriptions, Button, Form, Input, Select, message, InputNumber, TimePicker, DatePicker } from "antd";
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const RoomBookingTable = ({ data, getAllBooking }) => {

  const [viewData, setviewData] = useState({});
  const [isView, setisView] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();


  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close modal
  };

  const [editid, seteditid] = useState("")
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      let res = await axios.put('http://localhost:8000/api/room/booking/' + editid, {
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

      if (res.status === 200) {
        message.success('Room booking details updated successfully!');
        form.resetFields();
        setIsModalVisible(false);
        getAllBooking()
      }
    } catch (error) {
      console.log(error);

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

  useEffect(() => {
    getAllMembers()
    getAllRoom()
  }, []);

  return (
    <div className="room-booking-table-container">
      <table className="room-booking-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Room Name</th>
            <th>Room Number</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(r => (
            <tr key={r._id}>
              <td>{r?.memberId?.Member_Name}</td>
              <td>{r?.roomName}</td>
              <td>{r?.roomId?.roomNumber}</td>
              <td>{moment(r.checkInDate).format("DD/MM/YYYY")} {r.checkInTime}</td>
              <td>{moment(r.checkOutDate).format("DD/MM/YYYY")} {r.checkOutTime}</td>
              <td>{((r.price + r.tax) - r.discount)?.toFixed(2)}</td>

              <td>{r.status}</td>
              <td>
                <div className='flex gap-1 align-center'>
                  <button style={{
                    color: "blue",
                    border: "none",
                    borderRadius: "50px",
                    padding: "7px 9px",
                    cursor: "pointer"
                  }} onClick={() => {
                    setviewData(r);
                    setisView(true)
                  }}>

                    <FaEye size={20} title='View' />
                  </button>
                  <button
                    className="qr-button"
                    onClick={() => {

                      form.setFieldsValue({
                        ...r,
                        memberId: r?.memberId?._id,
                        checkInDate: r.checkInDate ? moment(r.checkInDate) : null, // Convert to moment
                        checkOutDate: r.checkOutDate ? moment(r.checkOutDate) : null, // Convert to moment
                        checkInTime: r.checkInTime ? moment(r.checkInTime, "HH:mm") : null, // Convert to moment for time
                        checkOutTime: r.checkOutTime ? moment(r.checkOutTime, "HH:mm") : null,
                        roomId:JSON.stringify(r.roomId)
                      })
                      setIsModalVisible(true)
                      seteditid(r?._id);
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

                </div>
              </td>
            </tr>
          ))}
          {data.length == 0 && <tr>
            <td colSpan="9" className='text-center'>No Booking found.</td>
          </tr>}
        </tbody>
      </table>

      <Modal
        title="Booking Details"
        visible={isView}
        onOk={() => setisView(false)} // You can add a button action here or remove it if unnecessary
        onCancel={() => setisView(false)}
        okText="Close"
        cancelButtonProps={{ style: { display: "none" } }} // Hide the Cancel button if it's unnecessary
      >
        <Descriptions column={1} bordered>
          {/* Member */}
          <Descriptions.Item label="Member">
            {viewData?.memberId?.Member_Name || "N/A"}
          </Descriptions.Item>

          {/* Facility */}
          <Descriptions.Item label="Room">
            {viewData?.roomName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Room Number">
            {viewData?.roomId?.roomNumber || "N/A"}
          </Descriptions.Item>

          {/* Booking Date */}
          <Descriptions.Item label="Check In">
            {viewData?.checkInDate
              ? `${moment(viewData.checkInDate).format("DD/MM/YYYY")} ${viewData?.checkInTime}`
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Check Out">
            {viewData?.checkInDate
              ? `${moment(viewData.checkOutDate).format("DD/MM/YYYY")} ${viewData?.checkOutTime}`
              : "N/A"}
          </Descriptions.Item>

          {/* Number of People */}
          <Descriptions.Item label="Number of People">
            {viewData?.people || "N/A"}
          </Descriptions.Item>

          {/* People Details */}
          <Descriptions.Item label="People Details">
            {viewData?.person?.length ? (
              viewData.person.map((person, index) => (
                <div key={index}>
                  <strong>Person {index + 1}:</strong> {person?.name} ({person?.gender}, {person?.age} years old)
                </div>
              ))
            ) : (
              "N/A"
            )}
          </Descriptions.Item>

          {/* Special Requests */}
          <Descriptions.Item label="Special Requests">
            {viewData?.specialRequests || "N/A"}
          </Descriptions.Item>

          {/* Price */}
          <Descriptions.Item label="Price">
            {viewData?.price ? `₹${(viewData.price)?.toFixed(2)}` : "N/A"}
          </Descriptions.Item>

          {/* Discount */}
          <Descriptions.Item label="Discount">
            {viewData?.discount ? `₹${(viewData.discount)?.toFixed(2)}` : "N/A"}
          </Descriptions.Item>

          {/* Tax */}
          <Descriptions.Item label="Tax">
            {viewData?.tax ? `₹${viewData.tax?.toFixed(2)}` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            {viewData?.price ? `₹${((viewData.price + viewData.tax) - viewData.discount)?.toFixed(2)}` : "N/A"}
          </Descriptions.Item>

          {/* Payment Type */}
          <Descriptions.Item label="Payment Type">
            {viewData?.paymentType || "N/A"}
          </Descriptions.Item>

          {/* Payment Status */}
          <Descriptions.Item label="Payment Status">
            {viewData?.paymentsStatus || "N/A"}
          </Descriptions.Item>

          {/* Booking Status */}
          <Descriptions.Item label="Booking Status">
            {viewData?.status || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>


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
                  {member.Member_Name}
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
            <Select placeholder="Select a room" onChange={(value) => {


              if (value) {
                value = JSON.parse(value);

                form.setFieldsValue({ price: value?.price })

              } else {

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

export default RoomBookingTable;
