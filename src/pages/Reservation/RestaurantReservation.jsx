import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table, message, Select, DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import * as XLSX from "xlsx";
import moment from 'moment';



const RestaurantReservation = () => {
    const { Option } = Select;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState(""); // Search state
    const [data, setData] = useState([])
    

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Restaurant Reservation Data"
        );
        XLSX.writeFile(workbook, "RestaurantReservationData.xlsx");
    };

    const filteredData = data.filter((member) =>
        Object.keys(member).some((key) =>
            String(member[key]).toLowerCase().includes(searchText.toLowerCase())
        )
    );



    const showModal = () => {
        setIsModalVisible(true);
    };

    // const handleOk = () => {
    //     form.validateFields()
    //         .then(async (values) => {
    //             try {
    //                 console.log("Form values:", values);

    //                 // Send form data to API
    //                 const res = await axios.post("http://localhost:8000/api/restaurant/reservation/add", values);

    //                 if (res.status === 201) {
    //                     message.success("Reservation added successfully.");
    //                     setIsModalVisible(false);
    //                     form.resetFields();
    //                     getAllReservations();
    //                 } else {
    //                     message.error("Failed to add reservation. Please try again.");
    //                 }
    //             } catch (error) {
    //                 console.error("Error adding reservation:", error);
    //                 message.error("Something went wrong!");
    //             }
    //         })
    //         .catch((info) => {
    //             console.log("Validate Failed:", info);
    //         });
    // };



    const handleOk = () => {
        form
          .validateFields()
          .then(async (values) => {
            try {
              console.log("Form values before adding reservationType:", values);
    
              // Add reservationType to form data
              const formData = {
                ...values,
                reservationType: "Restaurant", // Set the appropriate value
              };
    
              console.log("Final form data:", formData);
    
              // Send form data to API
              const res = await axios.post(
                "http://localhost:8000/api/restaurant/reservation/add",
                formData
              );
    
              if (res.status === 201) {
                message.success("Reservation added successfully.");
                setIsModalVisible(false);
                form.resetFields();
                getAllReservations();
              } else {
                message.error("Failed to add reservation. Please try again.");
              }
            } catch (error) {
              console.error("Error adding reservation:", error);
              message.error("Something went wrong!");
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      };



    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Reservation ID', dataIndex: 'reservationId', key: 'reservationId' },
        { title: 'Member Name', dataIndex: 'memberName', key: 'memberName' },
        { title: 'Phone', dataIndex: 'memberPhone', key: 'memberPhone' },
        { title: 'Email', dataIndex: 'memberEmail', key: 'memberEmail' },
  {
      title: "Reservation Date",
      dataIndex: "reservationDate",
      render: (date) => <p>{moment(date).format("DD/MM/YYYY")}</p>
    },
        { title: 'Reservation Time', dataIndex: 'reservationTime', key: 'reservationTime' },
        { title: 'Number of Guests', dataIndex: 'numberOfGuests', key: 'numberOfGuests' },
        { title: 'Table Number', dataIndex: 'tableNumber', key: 'tableNumber' },
        { title: "Items", dataIndex: "preOrder",
            render: (order) => (
              <ul className="items-list">
                {order?.map((item) => (
                  <li key={item._id}>
                    <div className="flex gap-2">
                      {item?.image && <img
                        src={`http://192.168.1.79:8000/menu/${item?.image}`}
                        style={{ height: "70px", borderRadius: "10px" }}
                      />}
                     
                        <p> {item.foodName} {item.measure} - {item.quantity}x (₹{item.price})</p>
                    </div>
                  </li>
                ))}
              </ul>
            )
            
           },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
        { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus' },
        // { title: 'Referred By', dataIndex: 'referedBy', key: 'referedBy' },
        // { title: 'Referred By ID', dataIndex: 'referedById', key: 'referedById' },
        { title: "Created At", dataIndex: "createdAt",render:(item)=>(
             <p>{moment(item).format("lll")}</p>
           ) },
    ];


    const getAllReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/restaurant/reservation/bycategory/Restaurant');
            console.log(response.data.data)
           
            setData(response?.data?.data)
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    }



    // const getAllReservations = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/restaurant/reservation/get');
    
    //         // Check if response and data exist
    //         const reservations = response?.data?.data || [];
    
    //         // Filter reservations with type 'Restaurant'
    //         const filteredReservations = reservations.filter(
    //             (reservation) => reservation?.reservationType === 'Restaurant'
    //         );
    
    //         console.log(filteredReservations);
    
    //         // Ensure setData exists before calling it
    //         if (typeof setData === 'function') {
    //             setData(filteredReservations);
    //         } else {
    //             console.warn('setData is not defined');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching reservations:', error);
    //     }
    // };
    



    useEffect(() => { getAllReservations() }, [])

    return (
        <div className='main-content'>
            <div className="view-menu-content flex justify-between items-center" >
                <h2 className="menu-title">Restaurant Reservation</h2>
                <div className='flex items-center gap-3'>
                    <Input
                        placeholder="Search members..."
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300, marginRight: 10 }}
                    />
                    <Button onClick={handleExport} style={{ marginLeft: 10 }}>
                        Export to Excel
                    </Button>
                    <Button className='primary-button' onClick={showModal}>Add Menu Item</Button>
                </div>
            </div>

            <Table columns={columns} dataSource={filteredData} />

            <Modal
                title="Add Reservation"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="reservationForm">
                    <Form.Item
                        name="memberName"
                        label="Member Name"
                        rules={[{ required: true, message: 'Please input the member name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="memberPhone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="memberEmail"
                        label="Email"
                    >
                        <Input />
                    </Form.Item>
                    {/* 🗓️ Date Picker for Reservation Date */}
                    <Form.Item
                        name="reservationDate"
                        label="Reservation Date"
                        rules={[{ required: true, message: "Please select the reservation date!" }]}
                    >
                        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                    </Form.Item>

                    {/* ⏰ Time Picker for Reservation Time */}
                    <Form.Item
                        name="reservationTime"
                        label="Reservation Time"
                        rules={[{ required: true, message: "Please select the reservation time!" }]}
                    >
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="numberOfGuests"
                        label="Number of Guests"
                        rules={[{ required: true, message: 'Please input the number of guests!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tableNumber"
                        label="Table Number"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="totalAmount"
                        label="Total Amount"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="referedBy"
                        label="Referred By"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="referedById"
                        label="Referred By ID"
                    >
                        <Input />
                    </Form.Item>
                    {/* Payment Status Dropdown */}
                    <Form.Item label="Payment Status" name="paymentStatus" rules={[{ required: true, message: "Select payment status" }]}>
                        <Select placeholder="Select Payment Status">
                            <Option value="Pending">Pending</Option>
                            <Option value="Paid">Paid</Option>
                            <Option value="Failed">Failed</Option>
                        </Select>
                    </Form.Item>

                    {/* Status Dropdown */}
                    <Form.Item label="Reservation Status" name="status" rules={[{ required: true, message: "Select reservation status" }]}>
                        <Select placeholder="Select Reservation Status">
                            <Option value="Pending">Pending</Option>
                            <Option value="Confirmed">Confirmed</Option>
                            <Option value="Cancelled">Cancelled</Option>
                            <Option value="Completed">Completed</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RestaurantReservation;
