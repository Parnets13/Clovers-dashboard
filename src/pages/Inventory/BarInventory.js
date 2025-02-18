import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
  DatePicker,
} from "antd";

const { Option } = Select;

const BarInventory = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dummyData = [
    {
      _id: "1",
      itemName: "Jack Daniel's Old No. 7",
      category: "Liquor",
      brand: "Jack Daniel's",
      volume: 750,
      unit: "ml",
      pricePerUnit: 2000,
      stockQuantity: 50,
      minStockThreshold: 10,
      supplierName: "ABC Liquor Suppliers",
      supplierContact: "+91-1234567890",
      supplierEmail: "contact@abcliquors.com",
      supplierAddress: "123 Main Street, Bengaluru, Karnataka",
      lastStockUpdate: "2025-02-17T09:51:48.235Z",
      purchaseHistory: [
        {
          date: "2025-01-15T10:00:00.000Z",
          quantityAdded: 30,
          cost: 60000,
        },
        {
          date: "2025-02-10T10:00:00.000Z",
          quantityAdded: 20,
          cost: 40000,
        },
      ],
      usageLogs: [
        {
          date: "2025-02-15T10:00:00.000Z",
          quantityUsed: 5,
          purpose: "Sale",
        },
        {
          date: "2025-02-16T10:00:00.000Z",
          quantityUsed: 2,
          purpose: "Spillage",
        },
      ],
      status: "Available",
    },
    {
      _id: "2",
      itemName: "Heineken Lager",
      category: "Beer",
      brand: "Heineken",
      volume: 330,
      unit: "ml",
      pricePerUnit: 150,
      stockQuantity: 100,
      minStockThreshold: 20,
      supplierName: "XYZ Beer Distributors",
      supplierContact: "+91-9876543210",
      supplierEmail: "sales@xyzbeer.com",
      supplierAddress: "456 Market Road, Bengaluru, Karnataka",
      lastStockUpdate: "2025-02-17T09:51:48.235Z",
      purchaseHistory: [
        {
          date: "2025-01-20T10:00:00.000Z",
          quantityAdded: 50,
          cost: 7500,
        },
        {
          date: "2025-02-12T10:00:00.000Z",
          quantityAdded: 50,
          cost: 7500,
        },
      ],
      usageLogs: [
        {
          date: "2025-02-16T10:00:00.000Z",
          quantityUsed: 10,
          purpose: "Sale",
        },
      ],
      status: "Available",
    },
  ];

  useEffect(() => {
    setData(dummyData);
  }, []);

  const handleAdd = (values) => {
    const newItem = {
      ...values,
      _id: Math.random().toString(36).substr(2, 9),
      lastStockUpdate: new Date().toISOString(),
    };
    setData([...data, newItem]);
    notification.success({ message: "Item added successfully" });
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Volume (ml)", dataIndex: "volume", key: "volume" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Price Per Unit", dataIndex: "pricePerUnit", key: "pricePerUnit" },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Min Stock Threshold",
      dataIndex: "minStockThreshold",
      key: "minStockThreshold",
    },
    { title: "Supplier Name", dataIndex: "supplierName", key: "supplierName" },
    {
      title: "Supplier Contact",
      dataIndex: "supplierContact",
      key: "supplierContact",
    },
    {
      title: "Supplier Email",
      dataIndex: "supplierEmail",
      key: "supplierEmail",
    },
    {
      title: "Supplier Address",
      dataIndex: "supplierAddress",
      key: "supplierAddress",
    },
    {
      title: "Last Stock Update",
      dataIndex: "lastStockUpdate",
      key: "lastStockUpdate",
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
        title: "Purchase Date",
        key: "purchaseDate",
        render: (text, record) => record.purchaseHistory[0]?.date
      },
      {
        title: "Quantity Added",
        key: "quantityAdded",
        render: (text, record) => record.purchaseHistory[0]?.quantityAdded
      },
      {
        title: "Cost",
        key: "cost",
        render: (text, record) => record.purchaseHistory[0]?.cost
      },
      {
        title: "Usage Date",
        key: "usageDate",
        render: (text, record) => record.usageLogs[0]?.date
      },
      {
        title: "Quantity Used",
        key: "quantityUsed",
        render: (text, record) => record.usageLogs[0]?.quantityUsed
      },
      {
        title: "Usage Purpose",
        key: "usagePurpose",
        render: (text, record) => record.usageLogs[0]?.purpose
      },
  ];

  return (
    <div className="main-content">
      <div className="flex justify-between items-center form-wrapper">
        <h2>Bar Inventory Management</h2>
        <Button
          className="primary-button"
          onClick={() => setIsModalVisible(true)}
        >
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Modal
        title="Add New Item"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAdd}>
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="Liquor">Liquor</Option>
              <Option value="Beer">Beer</Option>
              <Option value="Wine">Wine</Option>
              <Option value="Mixer">Mixer</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="volume"
            label="Volume (ml)"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
            <Select style={{ width: "100%" }}>
              <Option value="ml">ml</Option>
              <Option value="liters">liters</Option>
              <Option value="bottles">bottles</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="pricePerUnit"
            label="Price Per Unit"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="minStockThreshold"
            label="Min Stock Threshold"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="supplierName"
            label="Supplier Name"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="supplierContact" label="Supplier Contact">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="supplierEmail" label="Supplier Email">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="supplierAddress" label="Supplier Address">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="lastStockUpdate"
            label="Last Stock Update"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="quantityAdded"
            label="Quantity Added"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="cost"
            label="Cost"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="usageDate"
            label="Usage Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="quantityUsed"
            label="Quantity Used"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="usagePurpose"
            label="Usage Purpose"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "100%" }}>
              <Option value="Sale">Sale</Option>
              <Option value="Breakage">Breakage</Option>
              <Option value="Spillage">Spillage</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select style={{ width: "100%" }}>
              <Option value="Available">Available</Option>
              <Option value="Out of Stock">Out of Stock</Option>
              <Option value="Low Stock">Low Stock</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default BarInventory;
