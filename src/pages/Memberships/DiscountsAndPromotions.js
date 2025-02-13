import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import * as XLSX from "xlsx";

const { Option } = Select;

const DiscountsAndPromotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [discounts, setDiscounts] = useState([
    {
      key: "1",
      discountId: "DISC001",
      membershipTier: "Gold",
      discountPercentage: 10,
      validityPeriod: ["2025-01-01", "2025-12-31"],
    },
    {
      key: "2",
      discountId: "DISC002",
      membershipTier: "Silver",
      discountPercentage: 5,
      validityPeriod: ["2025-02-01", "2025-12-31"],
    },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newDiscount = {
          key: discounts.length + 1,
          ...values,
          validityPeriod: [values.validityPeriod[0].format("YYYY-MM-DD"), values.validityPeriod[1].format("YYYY-MM-DD")],
        };
        setDiscounts([...discounts, newDiscount]);
        message.success("Discount added successfully!");
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

  const handleApplyDiscount = (tier) => {
    // Logic to apply discount based on membership tier or promotion
    message.info(`Discount applied for ${tier} membership`);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(discounts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Discounts and Promotions");
    XLSX.writeFile(workbook, "DiscountsAndPromotions.xlsx");
  };

  const columns = [
    {
      title: "Discount ID",
      dataIndex: "discountId",
      key: "discountId",
    },
    {
      title: "Membership Tier",
      dataIndex: "membershipTier",
      key: "membershipTier",
      filters: [
        { text: "Gold", value: "Gold" },
        { text: "Silver", value: "Silver" },
        { text: "Bronze", value: "Bronze" },
      ],
      onFilter: (value, record) => record.membershipTier.includes(value),
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text) => `${text}%`,
    },
    {
      title: "Validity Period",
      dataIndex: "validityPeriod",
      key: "validityPeriod",
      render: (dates) => `${dates[0]} to ${dates[1]}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleApplyDiscount(record.membershipTier)}>
          Apply Discount
        </Button>
      ),
    },
  ];

  return (
    <div className="view-menu-container">
      <div className="main-content">
        <div>
          <Button className="menu-button" icon={<PlusOutlined />} onClick={showModal}>
            Add Discount
          </Button>
          <Button onClick={handleExport} style={{ marginLeft: 10 }}>
            Export to Excel
          </Button>
          <Table dataSource={discounts} columns={columns} style={{ marginTop: 20 }} />

          <Modal title="Add Discount" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
              <Form.Item name="discountId" label="Discount ID" rules={[{ required: true, message: "Please enter Discount ID!" }]}>
                <Input placeholder="Enter Discount ID" />
              </Form.Item>
              <Form.Item name="membershipTier" label="Membership Tier" rules={[{ required: true, message: "Please select membership tier!" }]}>
                <Select placeholder="Select Membership Tier">
                  <Option value="Gold">Gold</Option>
                  <Option value="Silver">Silver</Option>
                  <Option value="Bronze">Bronze</Option>
                </Select>
              </Form.Item>
              <Form.Item name="discountPercentage" label="Discount Percentage" rules={[{ required: true, message: "Please enter discount percentage!" }]}>
                <Input placeholder="Enter Discount Percentage" type="number" />
              </Form.Item>
              <Form.Item name="validityPeriod" label="Validity Period" rules={[{ required: true, message: "Please select validity period!" }]}>
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DiscountsAndPromotions;
