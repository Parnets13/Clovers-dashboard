import React, { useEffect, useState } from "react";
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

const RestaurantInventory = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getAllResturentInventory = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/resturentinventory");
      if (res.status == 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllResturentInventory();
  }, []);

  const handleAdd = async (values) => {
    const formattedValues = {
      ...values,
      lastStockUpdate: new Date(), // Auto-set last stock update time
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
      supplier: {
        name: values.supplierName,
        contact: values.supplierContact,
        email: values.supplierEmail,
        address: values.supplierAddress,
      },
    };

    try {
      let res = await axios.post(
        "http://localhost:8000/api/resturentinventory",
        formattedValues
      );
      if (res.status == 201) {
        getAllResturentInventory();
        notification.success({ message: "Item added successfully" });
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        notification.error({ message: error.response.data.error });
      }
    }
  };

  const columns = [
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Volume", dataIndex: "volume", key: "volume" },
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
    {
      title: "Supplier Name",
      dataIndex: "supplier.name",
      key: "supplierName",
      render: (text, record) => record?.supplier?.name,
    },
    {
      title: "Supplier Contact",
      dataIndex: "supplier.contact",
      key: "supplierContact",
      render: (text, record) => record?.supplier?.contact,
    },
    {
      title: "Supplier Email",
      dataIndex: "supplier.email",
      key: "supplierEmail",
      render: (text, record) => record?.supplier?.email,
    },
    {
      title: "Supplier Address",
      dataIndex: "supplier.address",
      key: "supplierAddress",
      render: (text, record) => record?.supplier?.address,
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
      title: "Quantity Purchased",
      key: "quantityPurchased",
      render: (text, record) => record.purchaseHistory[0]?.quantityPurchased,
    },
    {
      title: "Price Per Unit",
      key: "pricePerUnitPurchase",
      render: (text, record) => record.purchaseHistory[0]?.pricePerUnit,
    },
    {
      title: "Total Cost",
      key: "totalCost",
      render: (text, record) => record.purchaseHistory[0]?.totalCost,
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
        <h2>Restaurant Inventory Management</h2>
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
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="brand" label="Brand">
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="volume"
            label="Volume"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
            <Select style={{ width: "100%" }}>
              <Option value="kg">kg</Option>
              <Option value="g">g</Option>
              <Option value="L">L</Option>
              <Option value="ml">ml</Option>
              <Option value="pcs">pcs</Option>
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
            name="purchaseDate"
            label="Purchase Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="quantityPurchased"
            label="Quantity Purchased"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="pricePerUnitPurchase"
            label="Price Per Unit"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="totalCost"
            label="Total Cost"
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
              <Option value="Cooking">Cooking</Option>
              <Option value="Wastage">Wastage</Option>
              <Option value="Sale">Sale</Option>
              <Option value="Other">Other</Option>
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

export default RestaurantInventory;
