import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import './RoomManagementPage.css';
import { Modal, Button, Form, Input, Select, message, InputNumber, TimePicker, DatePicker, Switch, Flex, Spin } from "antd";
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;

const RoomManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm();




  // Hardcoded room data with availability dates
  const [rooms, setRooms] = useState([]);

  const [selectedDate, setSelectedDate] = useState('');

  // Function to check room availability
  const isRoomAvailable = (roomDate) => {
    return new Date(selectedDate) >= new Date(roomDate);
  };

  // Function to update room status
  const [loading, setLoading] = useState(false);

  const updateRoomStatus = async (id, newStatus) => {
    setLoading(true)
    try {
      let res = await axios.put('http://localhost:8000/api/room/status/' + id, {
        availability: newStatus
      });
      if (res.status == 200) {

        setLoading(false)
        getAllRoom()
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      if (error.response) {
        message.error(error.response.data.error || "API Error occurred.");
        // console.error("API Error:", error.response);
      } else {
        message.error(error.message || "An unexpected error occurred.");
        // console.error("Unexpected Error:", error);
      }
    }
  };


  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close modal
  };

  const getAllRoom = async () => {
    try {
      setLoading(true)
      let res = await axios.get('http://localhost:8000/api/room');
      if (res.status == 200) {
        setLoading(false)
        setRooms(res.data.success);
      }
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      let res = await axios.post('http://localhost:8000/api/room/add', {
        ...values

      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (res.status === 201) {
        message.success('Room added successfully!');
        form.resetFields();
        setIsModalVisible(false);
        getAllRoom()
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
    getAllRoom()
  }, []);
  const [editid, setEditId] = useState("");
  const updateRoom = async () => {
    setLoading(true)
    const values = await form.validateFields();
    try {
      let res = await axios.put('http://localhost:8000/api/room/' + editid, values);
      if (res.status == 200) {
        message.success("Successfully updated");
        setIsModalVisible(false);
        setLoading(false)
        getAllRoom()
      }
    } catch (error) {
      setLoading(false)
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
  }


  const [edit, setEdit] = useState(false);


  const deleteRoom = async (id) => {
    try {
      let res = await axios.delete('http://localhost:8000/api/room/' + id);
      if (res.status == 200) {
        message.success("Room deleted successfully!");
        getAllRoom()
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
      title: "Are you sure you want to delete this room?",
      content: `This action will permanently delete the room "${item.name}".`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteRoom(item?._id)
      },
    });
  };



  return (
    <div className="room-management-container ">

      <div className="main-content">

        <div className="room-management-content">
          <div className='flex justify-between mb-5'>
            <h2 className='m-0'>Room Management</h2>
            <div className="facility-bookings-actions">
              <button className="primary-button" onClick={() => {
                setEdit(false)
                setIsModalVisible(true)
              }}>Add Room</button>
            </div>
          </div>
          {/* Date Picker */}

          {/* Room Table */}

          <div className="room-table-container reletive">
            <table className="room-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Room Name</th>
                  <th>Room No</th>
                  <th>Room Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  {/* <th>Available Date</th> */}
                  {/* <th>Availability</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr key={room._id}>
                    <td>{i + 1}.</td>
                    <td>{room.roomName}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>{room.price}</td>
                    <td>
                      <select
                        value={room.availability}
                        onChange={(e) => updateRoomStatus(room._id, e.target.value)}
                        className="status-dropdown"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </td>
                    {/* <td>{room.availableDate}</td> */}
                    {/* <td>
                      {selectedDate ? (
                        isRoomAvailable(room.availableDate) ? (
                          <span className="availability available">Available</span>
                        ) : (
                          <span className="availability not-available">Not Available</span>
                        )
                      ) : (
                        '-'
                      )}
                    </td> */}
                    <td>
                      <button className="action-button edit" onClick={() => {
                        setEdit(true)
                        setEditId(room?._id)
                        form.setFieldsValue(room);
                        setIsModalVisible(true)
                      }}>Edit</button>
                      <button className="action-button delete" onClick={() => handleDelete(room)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <div className=" h-screen w-full">
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10">
                <Spin size="large" />
              </div>
            </div>}

          </div>
        </div>
      </div>
      <Modal
        title="Room Details"
        visible={isModalVisible}
        onOk={() => {
          form.validateFields()
            .then(values => {
              if (edit) {
                updateRoom(values)
              } else {
                handleOk(values); // Pass form values to `handleOk`
              }

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
          initialValues={{ availability: true }}
        >
          <Form.Item
            label="Room Name"
            name="roomName"
            rules={[{ required: true, message: "Please enter room name!" }]}
          >
            <Input placeholder="Enter room name" />
          </Form.Item>

          <Form.Item
            label="Room Type"
            name="roomType"
            rules={[{ required: true, message: "Please select room type!" }]}
          >
            <Select placeholder="Select room type">
              <Option value="single">Single</Option>
              <Option value="double">Double</Option>
              <Option value="suite">Suite</Option>
              <Option value="luxury">Luxury</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Room Number"
            name="roomNumber"
            rules={[{ required: true, message: "Please enter room number!" }]}
          >
            <InputNumber min={1} placeholder="Enter room number" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Price Per Night"
            name="price"
            rules={[{ required: true, message: "Please enter price!" }]}
          >
            <InputNumber min={1} placeholder="Enter price" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Availability"
            name="availability"
          >
            <Select placeholder="Select status">
              <Option value="Available">Available</Option>
              <Option value="Occupied">Occupied</Option>
              <Option value="Maintenance">Maintenance</Option>

            </Select>
          </Form.Item>


        </Form>
      </Modal>
    </div>
  );
};

export default RoomManagementPage;
