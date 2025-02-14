import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Payroll = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [payrollRecords, setPayrollRecords] = useState([
    {
      key: "1",
      employeeId: "E001",
      basicSalary: 50000,
      attendanceData: 20,
      taxDeductions: 5000,
      netSalary: 45000,
    },
    {
      key: "2",
      employeeId: "E002",
      basicSalary: 60000,
      attendanceData: 22,
      taxDeductions: 6000,
      netSalary: 54000,
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const netSalary = values.basicSalary - values.taxDeductions;
        const newRecord = {
          key: payrollRecords.length + 1,
          ...values,
          netSalary: netSalary,
        };
        setPayrollRecords([...payrollRecords, newRecord]);
        message.success("Payroll record added successfully!");
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

  const generatePayslip = (record) => {
    const payslip = `
      Employee ID: ${record.employeeId}\n
      Basic Salary: ${record.basicSalary}\n
      Attendance Data: ${record.attendanceData}\n
      Tax Deductions: ${record.taxDeductions}\n
      Net Salary: ${record.netSalary}
    `;
    message.info(payslip);
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "Attendance Data",
      dataIndex: "attendanceData",
      key: "attendanceData",
    },
    {
      title: "Tax Deductions",
      dataIndex: "taxDeductions",
      key: "taxDeductions",
    },
    {
      title: "Net Salary",
      dataIndex: "netSalary",
      key: "netSalary",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => generatePayslip(record)}>
          Generate Payslip
        </Button>
      ),
    },
  ];

  return (
    <div className="view-menu-container">
      <div className="main-content">
        <div>
          <Button className="primary-button" icon={<PlusOutlined />} onClick={showModal}>
            Add Payroll
          </Button>
          <Table dataSource={payrollRecords} columns={columns} style={{ marginTop: 20 }} />

          <Modal title="Add Payroll" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true, message: "Please enter Employee ID!" }]}>
                <Input placeholder="Enter Employee ID" />
              </Form.Item>
              <Form.Item name="employeeName" label="Employee Name" rules={[{ required: true, message: "Please enter Employee Name!" }]}>
                <Input placeholder="Enter Employee Name" />
              </Form.Item>
              <Form.Item name="basicSalary" label="Basic Salary" rules={[{ required: true, message: "Please enter Basic Salary!" }]}>
                <Input placeholder="Enter Basic Salary" type="number" />
              </Form.Item>
              <Form.Item name="attendanceData" label="Attendance Data" rules={[{ required: true, message: "Please enter Attendance Data!" }]}>
                <Input placeholder="Enter Attendance Data" type="number" />
              </Form.Item>
              <Form.Item name="taxDeductions" label="Tax Deductions" rules={[{ required: true, message: "Please enter Tax Deductions!" }]}>
                <Input placeholder="Enter Tax Deductions" type="number" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
