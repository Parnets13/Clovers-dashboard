import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import moment from "moment";

const { Option } = Select;

const FeesAndCharges = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [feesRecords, setFeesRecords] = useState([
    {
      key: "1",
      invoiceId: "INV001",
      memberId: "M001",
      amountDue: 1000,
      dueDate: "2025-02-15",
      paymentStatus: "Paid",
    },
    {
      key: "2",
      invoiceId: "INV002",
      memberId: "M002",
      amountDue: 1500,
      dueDate: "2025-02-20",
      paymentStatus: "Overdue",
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
          key: feesRecords.length + 1,
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
        };
        setFeesRecords([...feesRecords, newRecord]);
        message.success("Invoice generated successfully!");
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

  const sendOverdueReminder = (record) => {
    if (record.paymentStatus === "Overdue") {
      message.info(`Reminder sent to member ${record.memberId} for invoice ${record.invoiceId}`);
    } else {
      message.warning(`Invoice ${record.invoiceId} is not overdue`);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(feesRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fees and Charges");
    XLSX.writeFile(workbook, "FeesAndCharges.xlsx");
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
    },
    {
      title: "Member ID",
      dataIndex: "memberId",
      key: "memberId",
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => record.paymentStatus.includes(value),
      render: (text) => (
        <Select defaultValue={text} style={{ width: 120 }}>
          <Option value="Paid">Paid</Option>
          <Option value="Overdue">Overdue</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => sendOverdueReminder(record)}>
          Send Reminder
        </Button>
      ),
    },
  ];

  return (
    <div className="view-menu-container">
      <div className="main-content">
        <div>
          <Button className="primary-button" icon={<PlusOutlined />} onClick={showModal}>
            Generate Invoice
          </Button>
          <Button onClick={handleExport} style={{ marginLeft: 10 }}>
            Export to Excel
          </Button>
          <Table dataSource={feesRecords} columns={columns} style={{ marginTop: 20 }} />

          <Modal title="Generate Invoice" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item name="invoiceId" label="Invoice ID" rules={[{ required: true, message: "Please enter Invoice ID!" }]}>
                <Input placeholder="Enter Invoice ID" />
              </Form.Item>
              <Form.Item name="memberId" label="Member ID" rules={[{ required: true, message: "Please enter Member ID!" }]}>
                <Input placeholder="Enter Member ID" />
              </Form.Item>
              <Form.Item name="amountDue" label="Amount Due" rules={[{ required: true, message: "Please enter Amount Due!" }]}>
                <Input placeholder="Enter Amount Due" type="number" />
              </Form.Item>
              <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: "Please select a due date!" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="paymentStatus" label="Payment Status" rules={[{ required: true, message: "Please select payment status!" }]}>
                <Select>
                  <Option value="Paid">Paid</Option>
                  <Option value="Overdue">Overdue</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FeesAndCharges;
