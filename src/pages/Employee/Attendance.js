import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  DatePicker,
  TimePicker,
  Select,
  message,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const Attendance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const getAttendance = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/employee/attendance/"
    );
    console.log(res.data);
    setAttendanceRecords(res.data);
  };

  useEffect(() => {
    getAttendance();
  }, []);

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
          attendanceDateTime:
            values.attendanceDateTime.format("YYYY-MM-DD HH:mm"),
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

  const columns = [
    {
      title: "Employee ID",
      dataIndex: ["employeeId"],
      key: "employeeId",
      render: (employeeId) => (employeeId ? employeeId.employeeId : "N/A"),
    },
    // {
    //   title: "Employee Name",
    //   dataIndex: ["name"],
    //   key: "employeeName",
    //   render: (name) => name || "N/A",
    // },
    {
      title: "Email",
      dataIndex: ["employeeId", "email"],
      key: "employeeEmail",
      render: (email) => email || "N/A",
    },
    {
      title: "Punch In",
      dataIndex: "punchIn",
      key: "punchIn",
      render: (time) => (time ? new Date(time).toLocaleTimeString() : "N/A"),
    },
    {
      title: "Punch Out",
      dataIndex: "punchOut",
      key: "punchOut",
      render: (time) => (time ? new Date(time).toLocaleTimeString() : "N/A"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Present"
              ? "green"
              : status === "Late"
              ? "orange"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    // {
    //   title: "Total Hours",
    //   dataIndex: "totalHours",
    //   key: "totalHours",
    //   render: (hours) => (hours ? hours.toFixed(2) : "N/A"),
    // },
  ];

  return (
    // <div className="view-menu-container">
    //   <div className="main-content">
    //     <div>
    //       <Button
    //         className="primary-button"
    //         icon={<PlusOutlined />}
    //         onClick={showModal}
    //       >
    //         Add Attendance
    //       </Button>
    //       <Table
    //         dataSource={attendanceRecords}
    //         columns={columns}
    //         style={{ marginTop: 20 }}
    //       />

    //       <Modal
    //         title="Add Attendance"
    //         visible={isModalVisible}
    //         onOk={handleOk}
    //         onCancel={handleCancel}
    //       ></Modal>
    //     </div>
    //   </div>
    // </div>

    <div className="view-menu-container">
      <div className="main-content">
        <div className="flex justify-between items-center">
          <h1>Member Dashboard</h1>
          <Button
            className="primary-button"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Attendance
          </Button>
        </div>
        <div>
          <Table
            dataSource={attendanceRecords}
            columns={columns}
            style={{ marginTop: 20 }}
            rowKey="_id"
          />

          <Modal
            title="Add Attendance"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
