import React, { useState } from "react";
import { Button, Modal, Table, List, Card, Badge } from "antd";
import { PlusOutlined, BellOutlined, UserAddOutlined } from "@ant-design/icons";

const MemberDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [members, setMembers] = useState([]);
  
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
    }
  ];

  const addMember = () => {
    // Logic for adding new member
    const newMember = { id: members.length + 1, name: `Member ${members.length + 1}`, expiryDate: '2025-12-31' };
    setMembers([...members, newMember]);
    setNotifications([...notifications, { title: 'New Member Added', description: `Member ${members.length + 1} has been added.` }]);
  };

  return (
    <div className="dashboard-container" style={{ padding: 20 }}>
    <div className="main-content">
        <div className="flex justify-between items-center">
          <h1>Member Dashboard</h1>
          <div>
            <button className="menu-button" onClick={() => setModalVisible(true)}>
              <UserAddOutlined /> Add Member
            </button>
            
          </div>
        </div>
    </div>
    </div>
  );
};

export default MemberDashboard;
