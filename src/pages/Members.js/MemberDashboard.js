import React, { useState } from "react";
import { Button, Modal, Table, List, Card, Badge, Input, Form, Select } from "antd";
import { PlusOutlined, BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { BiNotification } from "react-icons/bi";

const { Option } = Select;

const MemberDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: 'New Member Added', description: 'Member 1 has been added.' },
    { title: 'Membership Renewal', description: 'Member 2 has renewed their membership.' }
  ]);
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', membershipDate: '2023-01-01', expiryDate: '2025-12-31', membershipType: 'Gold' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', membershipDate: '2023-02-15', expiryDate: '2025-11-30', membershipType: 'Silver' }
  ]);
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', membershipDate: '', expiryDate: '', membershipType: '' });

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Membership Date',
      dataIndex: 'membershipDate',
      key: 'membershipDate',
    },
    {
      title: 'Membership Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Membership Type',
      dataIndex: 'membershipType',
      key: 'membershipType',
    }
  ];

  const addMember = () => {
    const newId = members.length + 1;
    const member = { id: newId, ...newMember };
    setMembers([...members, member]);
    setNotifications([...notifications, { title: 'New Member Added', description: `Member ${newId} has been added.` }]);
    setNewMember({ name: '', email: '', phone: '', membershipDate: '', expiryDate: '', membershipType: '' });
    setModalVisible(false);
  };

  return (
    <div className="dashboard-container" style={{ padding: 20 }}>
      <div className="main-content">
        <div className="flex justify-between items-center">
          <h1>Member Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button icon={<UserAddOutlined />} onClick={() => setModalVisible(true)} className="primary-button">
              Add Member
            </Button>
            <Badge count={notifications.length}>
              <BiNotification className="text-2xl" onClick={() => setNotificationModalVisible(true)} />
            </Badge>
          </div>
        </div>
        <Card title="Members List">
          <Table dataSource={members} columns={memberColumns} />
        </Card>
        <Modal
          title="Add Member"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={addMember}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input 
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input 
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input 
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Membership Date">
              <Input 
                value={newMember.membershipDate}
                onChange={(e) => setNewMember({ ...newMember, membershipDate: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Membership Expiry Date">
              <Input 
                value={newMember.expiryDate}
                onChange={(e) => setNewMember({ ...newMember, expiryDate: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Membership Type">
              <Select
                value={newMember.membershipType}
                onChange={(value) => setNewMember({ ...newMember, membershipType: value })}
              >
                <Option value="Gold">Gold</Option>
                <Option value="Silver">Silver</Option>
                <Option value="Bronze">Bronze</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Notifications"
          visible={notificationModalVisible}
          onCancel={() => setNotificationModalVisible(false)}
          footer={null}
        >
          <List
            dataSource={notifications}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MemberDashboard;
