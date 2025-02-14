import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const Maintenance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    {
      key: "1",
      maintenanceId: "MT001",
      itemId: "ITEM001",
      itemName: "Generator",
      scheduledDate: "2025-02-15",
      maintenanceType: "Preventive",
      technicianName: "John Doe",
      status: "Pending",
      lastMaintenanceDate: "2024-12-10",
      nextMaintenanceDue: "2025-03-15",
      notes: "Routine checkup",
    },
    {
      key: "2",
      maintenanceId: "MT002",
      itemId: "ITEM002",
      itemName: "Air Conditioner",
      scheduledDate: "2025-02-20",
      maintenanceType: "Corrective",
      technicianName: "Jane Smith",
      status: "In Progress",
      lastMaintenanceDate: "2024-11-20",
      nextMaintenanceDue: "2025-04-20",
      notes: "Cooling issue",
    },
  ]);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newTask = {
        key: maintenanceTasks.length + 1,
        ...values,
        scheduledDate: values.scheduledDate.format("YYYY-MM-DD"),
      };
      setMaintenanceTasks([...maintenanceTasks, newTask]);
      message.success("Maintenance task added successfully!");
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleStatusChange = (value, record) => {
    const updatedTasks = maintenanceTasks.map(task => 
      task.key === record.key ? { ...task, status: value } : task
    );
    setMaintenanceTasks(updatedTasks);
  };

  const columns = [
    { title: "Maintenance ID", dataIndex: "maintenanceId", key: "maintenanceId" },
    { title: "Item ID", dataIndex: "itemId", key: "itemId" },
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Scheduled Date", dataIndex: "scheduledDate", key: "scheduledDate" },
    { title: "Maintenance Type", dataIndex: "maintenanceType", key: "maintenanceType" },
    { title: "Technician Name", dataIndex: "technicianName", key: "technicianName" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select defaultValue={text} onChange={(value) => handleStatusChange(value, record)}>
          <Option value="Pending">Pending</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    { title: "Last Maintenance Date", dataIndex: "lastMaintenanceDate", key: "lastMaintenanceDate" },
    { title: "Next Maintenance Due", dataIndex: "nextMaintenanceDue", key: "nextMaintenanceDue" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
  ];

  return (
    <div className="main-content">
      <div style={{ padding: 20 }}>
        <Button className="primary-button" icon={<PlusOutlined />} onClick={showModal}>
          Add Maintenance Task
        </Button>
        <Table dataSource={maintenanceTasks} columns={columns} style={{ marginTop: 20 }} />
        <Modal title="Add Maintenance Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} layout="vertical">
            <Form.Item name="maintenanceId" label="Maintenance ID" rules={[{ required: true, message: "Please enter Maintenance ID!" }]}>
              <Input placeholder="Enter Maintenance ID" />
            </Form.Item>
            <Form.Item name="itemId" label="Item ID" rules={[{ required: true, message: "Please enter Item ID!" }]}>
              <Input placeholder="Enter Item ID" />
            </Form.Item>
            <Form.Item name="itemName" label="Item Name" rules={[{ required: true, message: "Please enter Item Name!" }]}>
              <Input placeholder="Enter Item Name" />
            </Form.Item>
            <Form.Item name="scheduledDate" label="Scheduled Date" rules={[{ required: true, message: "Please select a date!" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="maintenanceType" label="Maintenance Type" rules={[{ required: true, message: "Please select Maintenance Type!" }]}>
              <Select>
                <Option value="Preventive">Preventive</Option>
                <Option value="Corrective">Corrective</Option>
              </Select>
            </Form.Item>
            <Form.Item name="technicianName" label="Technician Name" rules={[{ required: true, message: "Please enter Technician Name!" }]}>
              <Input placeholder="Enter Technician Name" />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status!" }]}>
              <Select>
                <Option value="Pending">Pending</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
            <Form.Item name="lastMaintenanceDate" label="Last Maintenance Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="nextMaintenanceDue" label="Next Maintenance Due">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea placeholder="Enter Notes" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Maintenance;
