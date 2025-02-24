import React, { useEffect, useState } from "react";
import { Table, Card, Calendar, Button, Modal, Form, Input, Select, Badge, List, message } from "antd";
import { PlusOutlined, BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { BiNotification } from "react-icons/bi";
import axios from "axios";

const { Option } = Select;

const Admin = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', expiryDate: '2025-12-31', type: 'Gold' },
    { id: 2, name: 'Jane Smith', expiryDate: '2025-11-30', type: 'Silver' }
  ]);
  const [bookings, setBookings] = useState([
    { id: 1, facility: 'Tennis Court', date: '2023-03-01' },
    { id: 2, facility: 'Swimming Pool', date: '2023-03-02' }
  ]);
  const [finances, setFinances] = useState([
    { id: 1, item: 'Membership Fees', amount: 5000, date: '2023-01-01' },
    { id: 2, item: 'Facility Booking Fees', amount: 2000, date: '2023-01-15' }
  ]);
  const [subAdmins, setSubAdmins] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubAdmin, setNewSubAdmin] = useState({ name: '', email: '', role: '' });

  const memberColumns = [
    {
      title: 'Member ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Membership Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Membership Type',
      dataIndex: 'type',
      key: 'type',
    }
  ];

  const bookingColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Facility',
      dataIndex: 'facility',
      key: 'facility',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  const financeColumns = [
    {
      title: 'Finance ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }
  ];

  const subAdminColumns = [
    {
      title: 'Sub Admin ID',
      dataIndex: 'subAdminId',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    }
  ];

  const getSubAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/subAdmins/get")
      setSubAdmins(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getSubAdmins() }, [])




  const addSubAdmin = async () => {
    if (!newSubAdmin.name || !newSubAdmin.email || !newSubAdmin.role) {
      message.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/subAdmins/add", newSubAdmin);

      if (res.status === 201) {
        message.success("Sub Admin added successfully!");
        setModalVisible(false);
        setNewSubAdmin({ name: "", email: "", role: "" }); // Reset form
        getSubAdmins();
      } else {
        message.error("Failed to add Sub Admin.");
      }
    } catch (error) {
      console.error("Error adding Sub Admin:", error);
      message.error("Something went wrong!");
    }
  };

  const dateCellRender = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const bookingsForDate = bookings.filter(booking => booking.date === formattedDate);
    return (
      <ul>
        {bookingsForDate.map(booking => (
          <li key={booking.id}>
            {booking.facility}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="admin-container main-content" style={{ padding: 20 }}>

      <div className="flex justify-between items-center">
        <h1>Admin Panel</h1>
        <Button className="primary-button" icon={<PlusOutlined />} onClick={() => setModalVisible(true)} style={{ marginTop: 20 }}>
          Add Sub Admin
        </Button>
      </div>

      <Card title="Sub Admins" style={{ marginBottom: 20 }}>
        <Table dataSource={subAdmins} columns={subAdminColumns} />
      </Card>

      <Card title="Membership Data" style={{ marginBottom: 20 }}>
        <Table dataSource={members} columns={memberColumns} />
      </Card>

      <Card title="Facility Booking Calendar" style={{ marginBottom: 20 }}>
        <Calendar dateCellRender={dateCellRender} />
      </Card>

      <Card title="Financial Dashboard Data" style={{ marginBottom: 20 }}>
        <Table dataSource={finances} columns={financeColumns} />
      </Card>

      {/* <Modal
          title="Add Sub Admin"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={addSubAdmin}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input
                value={newSubAdmin.name}
                onChange={(e) => setNewSubAdmin({ ...newSubAdmin, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={newSubAdmin.email}
                onChange={(e) => setNewSubAdmin({ ...newSubAdmin, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                value={newSubAdmin.role}
                onChange={(value) => setNewSubAdmin({ ...newSubAdmin, role: value })}
              >
                <Option value="Manager">Manager</Option>
                <Option value="Assistant">Assistant</Option>
                <Option value="Co-ordinator">Coordinator</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal> */}

      <Modal title="Add Sub Admin" visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={addSubAdmin}>
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={newSubAdmin.name} onChange={(e) => setNewSubAdmin({ ...newSubAdmin, name: e.target.value })} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={newSubAdmin.email} onChange={(e) => setNewSubAdmin({ ...newSubAdmin, email: e.target.value })} />
          </Form.Item>
          <Form.Item label="Role">
            <Select value={newSubAdmin.role} onChange={(value) => setNewSubAdmin({ ...newSubAdmin, role: value })}>
              <Option value="Manager">Manager</Option>
              <Option value="Assistant">Assistant</Option>
              <Option value="Co-ordinator">Coordinator</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Admin;
