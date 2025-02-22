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
import axios from "axios";

const { Option } = Select;

const BarInventory = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inventory, setInventory] = useState([]);

  const getAllInventoryitems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/barInventory/get");
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllInventoryitems();
  }, []);

  console.log(data);

  const handleAdd = async (values) => {
    const newItem = {
      ...values,
      _id: Math.random().toString(36).substr(2, 9),
      lastStockUpdate: new Date().toISOString(),
      purchaseHistory: [
        {
          date: values.purchaseDate,
          quantityPurchased: values.quantityPurchased,
          pricePerUnit: values.pricePerUnitPurchase,
          totalCost: values.totalCost,
        },
      ],
      usageLogs: [
        {
          date: values.usageDate,
          quantityUsed: values.quantityUsed,
          purpose: values.usagePurpose,
        },
      ],
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/barInventory/add",
        newItem
      );
      if (res.status == 201) {
        setData([...data, res.data.data]);
        notification.success({ message: "Item added successfully" });
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
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
      render: (text, record) => record.purchaseHistory[0]?.date,
    },
    {
      title: "Quantity Added",
      key: "quantityAdded",
      render: (text, record) => record.purchaseHistory[0]?.quantityAdded,
    },
    {
      title: "Cost",
      key: "cost",
      render: (text, record) => record.purchaseHistory[0]?.cost,
    },
    {
      title: "Usage Date",
      key: "usageDate",
      render: (text, record) => record.usageLogs[0]?.date,
    },
    {
      title: "Quantity Used",
      key: "quantityUsed",
      render: (text, record) => record.usageLogs[0]?.quantityUsed,
    },
    {
      title: "Usage Purpose",
      key: "usagePurpose",
      render: (text, record) => record.usageLogs[0]?.purpose,
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
