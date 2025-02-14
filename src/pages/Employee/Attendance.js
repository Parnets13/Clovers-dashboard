import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, DatePicker, TimePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const Attendance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      key: "1",
      employeeId: "E001",
      attendanceDateTime: "2025-02-12 09:00",
      shiftStartTime: "09:00",
      shiftEndTime: "17:00",
      leaveStatus: "Approved",
    },
    {
      key: "2",
      employeeId: "E002",
      attendanceDateTime: "2025-02-12 08:45",
      shiftStartTime: "08:45",
      shiftEndTime: "16:45",
      leaveStatus: "Rejected",
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRecord = {
          key: attendanceRecords.length + 1,
          ...values,
          attendanceDateTime: values.attendanceDateTime.format("YYYY-MM-DD HH:mm"),
          shiftStartTime: values.shiftStartTime.format("HH:mm"),
          shiftEndTime: values.shiftEndTime.format("HH:mm"),
        };
        setAttendanceRecords([...attendanceRecords, newRecord]);
        message.success("Attendance record added successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClockInOut = (record) => {
    const updatedRecords = attendanceRecords.map((r) => {
      if (r.key === record.key) {
        return {
          ...r,
          attendanceDateTime: moment().format("YYYY-MM-DD HH:mm"),
        };
      }
      return r;
    });
    setAttendanceRecords(updatedRecords);
    message.success("Clock-in/out recorded successfully!");
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Attendance Date and Time",
      dataIndex: "attendanceDateTime",
      key: "attendanceDateTime",
    },
    {
      title: "Shift Start Time",
      dataIndex: "shiftStartTime",
      key: "shiftStartTime",
    },
    {
      title: "Shift End Time",
      dataIndex: "shiftEndTime",
      key: "shiftEndTime",
    },
    {
      title: "Leave Status",
      dataIndex: "leaveStatus",
      key: "leaveStatus",
      filters: [
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
      ],
      onFilter: (value, record) => record.leaveStatus.includes(value),
      render: (text) => (
        <Select defaultValue={text} style={{ width: 120 }}>
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleClockInOut(record)}>
          Clock In/Out
        </Button>
      ),
    },
  ];

  return (
    <div className="view-menu-container">
      <div className="main-content">
        <div>
          <Button className="primary-button" icon={<PlusOutlined />} onClick={showModal}>
            Add Attendance
          </Button>
          <Table dataSource={attendanceRecords} columns={columns} style={{ marginTop: 20 }} />

          <Modal title="Add Attendance" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true, message: "Please enter Employee ID!" }]}>
                <Input placeholder="Enter Employee ID" />
              </Form.Item>
              <Form.Item name="attendanceDateTime" label="Attendance Date and Time" rules={[{ required: true, message: "Please select date and time!" }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="shiftStartTime" label="Shift Start Time" rules={[{ required: true, message: "Please select shift start time!" }]}>
                <TimePicker format="HH:mm" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="shiftEndTime" label="Shift End Time" rules={[{ required: true, message: "Please select shift end time!" }]}>
                <TimePicker format="HH:mm" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="leaveStatus" label="Leave Status" rules={[{ required: true, message: "Please select leave status!" }]}>
                <Select>
                  <Option value="Approved">Approved</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
