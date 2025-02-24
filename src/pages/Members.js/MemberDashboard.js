import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  List,
  Card,
  Badge,
  Input,
  Form,
  Select,
} from "antd";
import { PlusOutlined, BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { BiNotification } from "react-icons/bi";
import axios from "axios";
import * as XLSX from "xlsx";

const { Option } = Select;

const MemberDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [data, setData] = useState([]);

  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState(""); // Search state

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members Data");
    XLSX.writeFile(workbook, "MembersData.xlsx");
  };

  // Filter members based on search input
  // const filteredData = data.filter(
  //   (member) =>
  //     member?.Member_Name?.toLowerCase().includes(searchText.toLowerCase()) ||
  //     String(member?.Mobile_Number || "").toLowerCase().includes(searchText.toLowerCase()) ||
  //     member?.email?.toLowerCase().includes(searchText.toLowerCase())
  // );

  const filteredData = data.filter((member) =>
    Object.keys(member).some((key) =>
      String(member[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const [notifications, setNotifications] = useState([
    { title: "New Member Added", description: "Member 1 has been added." },
    {
      title: "Membership Renewal",
      description: "Member 2 has renewed their membership.",
    },
  ]);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      membershipDate: "2023-01-01",
      expiryDate: "2025-12-31",
      membershipType: "Gold",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      membershipDate: "2023-02-15",
      expiryDate: "2025-11-30",
      membershipType: "Silver",
    },
  ]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    membershipDate: "",
    expiryDate: "",
    membershipType: "",
  });

  const columns = [
    {
      title: "Membership Status",
      dataIndex: "membershipStatus",
      key: "membershipStatus",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Application No.",
      dataIndex: "App_No",
      key: "App_No",
    },
    {
      title: "Membership No.",
      dataIndex: "Membership_No",
      key: "Membership_No",
    },
    {
      title: "Member Name",
      dataIndex: "Member_Name",
      key: "Member_Name",
    },
    {
      title: "A to Z",
      dataIndex: "A to Z",
      key: "A to Z",
    },
    {
      title: "Mobile Number",
      dataIndex: "Mobile_Number",
      key: "Mobile_Number",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Slab",
      dataIndex: "Slab",
      key: "Slab",
    },
    {
      title: "Full Amount",
      dataIndex: "Full_Amount",
      key: "Full_Amount",
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },
    {
      title: "Occupation",
      dataIndex: "Ocupation",
      key: "Ocupation",
    },
    {
      title: "Date of Birth",
      dataIndex: "DoB",
      key: "DoB",
    },
    {
      title: "Blood Group",
      dataIndex: "Blood_Gp",
      key: "Blood_Gp",
    },
    {
      title: "Phone No.",
      dataIndex: "Phone No",
      key: "Phone No",
    },
    {
      title: "Office No.",
      dataIndex: "Office No",
      key: "Office No",
    },
    {
      title: "Aadhar No.",
      dataIndex: "Aadhar_No",
      key: "Aadhar_No",
    },
    {
      title: "PAN",
      dataIndex: "Pan",
      key: "Pan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "C/O",
      dataIndex: "C/O",
      key: "C/O",
    },
    {
      title: "Photo",
      dataIndex: "Photo",
      key: "Photo",
    },
    {
      title: "Aadhar Document",
      dataIndex: "ADHAR",
      key: "ADHAR",
    },
    {
      title: "PAN Document",
      dataIndex: "PAN",
      key: "PAN",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <a
            style={{ marginRight: 8 }}
            onClick={() => console.log("Edit", record)}
          >
            Edit
          </a>
          <a
            style={{ color: "red" }}
            onClick={() => console.log("Delete", record)}
          >
            Delete
          </a>
        </>
      ),
    },
  ];

  const getAllMembers = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/users/getAllusers");
      console.log(res.data.success); // Debugging: Check API response structure
      setData(res?.data?.success);
    } catch (error) {
      console.log("Error fetching members:", error);
      setData([]); // Ensure data is always an array to prevent `.some` errors
    }
  };

  console.log(data);

  useEffect(() => {
    getAllMembers();
  }, []);

  const addMember = () => {
    const newId = members.length + 1;
    const member = { id: newId, ...newMember };
    setMembers([...members, member]);
    setNotifications([
      ...notifications,
      {
        title: "New Member Added",
        description: `Member ${newId} has been added.`,
      },
    ]);
    setNewMember({
      name: "",
      email: "",
      phone: "",
      membershipDate: "",
      expiryDate: "",
      membershipType: "",
    });
    setModalVisible(false);
  };

  return (
    <div className="dashboard-container" style={{ padding: 20 }}>
      <div className="main-content">
        <div className="flex justify-between items-center">
          <h1>Member Dashboard</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search members..."
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300, marginRight: 10 }}
            />
            <Button onClick={handleExport} style={{ marginLeft: 10 }}>
              Export to Excel
            </Button>
            <Button
              icon={<UserAddOutlined />}
              onClick={() => setModalVisible(true)}
              className="primary-button"
            >
              Add Member
            </Button>
            <Badge count={notifications.length}>
              <BiNotification
                className="text-2xl"
                onClick={() => setNotificationModalVisible(true)}
              />
            </Badge>
          </div>
        </div>
        <Card title="Members List">
          <Table columns={columns} dataSource={filteredData} rowKey="id" />
        </Card>
        <Modal
          title="Add Member"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => form.submit()} // Submit the form on OK button click
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={addMember} // Trigger the addMember function on form submit
          >
            <Form.Item
              label="Membership Status"
              name="membershipStatus"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Option value="Pending">Pending</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter role" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Application No."
              name="App_No"
              rules={[
                { required: true, message: "Please enter Application No." },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Membership No."
              name="Membership_No"
              rules={[
                { required: true, message: "Please enter Membership No." },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Member Name"
              name="Member_Name"
              rules={[{ required: true, message: "Please enter Member Name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="Mobile_Number"
              rules={[
                { required: true, message: "Please enter Mobile Number" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, message: "Please enter Address" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="DoB"
              rules={[
                { required: true, message: "Please enter Date of Birth" },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Aadhar No."
              name="Aadhar_No"
              rules={[{ required: true, message: "Please enter Aadhar No." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="PAN"
              name="Pan"
              rules={[{ required: true, message: "Please enter PAN" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Occupation"
              name="Ocupation"
              rules={[{ required: true, message: "Please enter Occupation" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
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
            renderItem={(item) => (
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
