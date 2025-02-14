import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, InputNumber, message, Descriptions } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const Inventory = () => {
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
  const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();
  const [inventory, setInventory] = useState([
    {
      key: "1",
      itemId: "101",
      itemName: "Laptop",
      quantity: 10,
      lowStockThreshold: 5,
      supplierId: "SUP001",
      supplierName: "Supplier A",
      supplierContact: "123-456-7890",
      image: "https://via.placeholder.com/50",
      lastUpdated: new Date().toLocaleString(),
    },
    {
      key: "2",
      itemId: "102",
      itemName: "Mouse",
      quantity: 15,
      lowStockThreshold: 3,
      supplierId: "SUP002",
      supplierName: "Supplier B",
      supplierContact: "098-765-4321",
      image: "https://via.placeholder.com/50",
      lastUpdated: new Date().toLocaleString(),
    },
  ]);

  const showInventoryModal = () => {
    setIsInventoryModalVisible(true);
  };

  const handleInventoryModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newItem = {
          key: inventory.length + 1,
          ...values,
          image: "https://via.placeholder.com/50", // Dummy image
          lastUpdated: new Date().toLocaleString(),
        };
        setInventory([...inventory, newItem]);
        message.success("Item added successfully!");
        setIsInventoryModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleInventoryModalCancel = () => {
    setIsInventoryModalVisible(false);
  };

  const handleQuantityClick = (item) => {
    setSelectedItem(item);
    setIsQuantityModalVisible(true);
  };

  const handleQuantityModalCancel = () => {
    setIsQuantityModalVisible(false);
  };

  const handleSupplierClick = (item) => {
    setSelectedItem(item);
    setIsSupplierModalVisible(true);
  };

  const handleSupplierModalCancel = () => {
    setIsSupplierModalVisible(false);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");
    XLSX.writeFile(workbook, "InventoryData.xlsx");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="Item" style={{ width: 50 }} />,
    },
    {
      title: "Item ID",
      dataIndex: "itemId",
      key: "itemId",
      filters: inventory.map(item => ({ text: item.itemId, value: item.itemId })),
      onFilter: (value, record) => record.itemId.includes(value),
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      sorter: (a, b) => a.itemName.localeCompare(b.itemName),
      sortDirections: ['ascend', 'descend'],
      filters: inventory.map(item => ({ text: item.itemName, value: item.itemName })),
      onFilter: (value, record) => record.itemName.includes(value),
    },
    {
      title: "Quantity Available",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, item) => <a onClick={() => handleQuantityClick(item)}>{text}</a>,
    },
    {
      title: "Low Stock Threshold",
      dataIndex: "lowStockThreshold",
      key: "lowStockThreshold",
    },
    {
      title: "Supplier ID",
      dataIndex: "supplierId",
      key: "supplierId",
      render: (text, item) => <a onClick={() => handleSupplierClick(item)}>{text}</a>,
      filters: inventory.map(item => ({ text: item.supplierId, value: item.supplierId })),
      onFilter: (value, record) => record.supplierId.includes(value),
    },
  ];

  return (
   <div className="dashboard-container">
       <div className="main-content">
            <div style={{ padding: 20 }}>
              <Button className="primary-button" icon={<PlusOutlined />} onClick={showInventoryModal}>
                Add Inventory
              </Button>
              <Button onClick={handleExport} style={{ marginLeft: 10 }}>
                Export to Excel
              </Button>
              <Table dataSource={inventory} columns={columns} style={{ marginTop: 20 }} />
        
              <Modal title="Add Inventory" visible={isInventoryModalVisible} onOk={handleInventoryModalOk} onCancel={handleInventoryModalCancel}>
                <Form form={form} layout="vertical">
                  <Form.Item name="itemId" label="Item ID" rules={[{ required: true, message: "Please enter Item ID!" }]}>
                    <Input placeholder="Enter Item ID" />
                  </Form.Item>
                  <Form.Item name="itemName" label="Item Name" rules={[{ required: true, message: "Please enter Item Name!" }]}>
                    <Input placeholder="Enter Item Name" />
                  </Form.Item>
                  <Form.Item name="quantity" label="Quantity Available" rules={[{ required: true, message: "Please enter Quantity!" }]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="lowStockThreshold" label="Low Stock Threshold" rules={[{ required: true, message: "Please enter Threshold!" }]}>
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item name="supplierId" label="Supplier ID" rules={[{ required: true, message: "Please enter Supplier ID!" }]}>
                    <Input placeholder="Enter Supplier ID" />
                  </Form.Item>
                </Form>
              </Modal>

              <Modal
                title="Quantity Details"
                visible={isQuantityModalVisible}
                onCancel={handleQuantityModalCancel}
                footer={null}
              >
                {selectedItem && (
                  <Descriptions column={1}>
                    <Descriptions.Item label="Item ID">{selectedItem.itemId}</Descriptions.Item>
                    <Descriptions.Item label="Item Name">{selectedItem.itemName}</Descriptions.Item>
                    <Descriptions.Item label="Quantity Available">{selectedItem.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Low Stock Threshold">{selectedItem.lowStockThreshold}</Descriptions.Item>
                    <Descriptions.Item label="Last Updated">{selectedItem.lastUpdated}</Descriptions.Item>
                  </Descriptions>
                )}
              </Modal>

              <Modal
                title="Supplier Details"
                visible={isSupplierModalVisible}
                onCancel={handleSupplierModalCancel}
                footer={null}
              >
                {selectedItem && (
                  <Descriptions column={1}>
                    <Descriptions.Item label="Supplier ID">{selectedItem.supplierId}</Descriptions.Item>
                    <Descriptions.Item label="Supplier Name">{selectedItem.supplierName}</Descriptions.Item>
                    <Descriptions.Item label="Supplier Contact">{selectedItem.supplierContact}</Descriptions.Item>
                  </Descriptions>
                )}
              </Modal>
            </div>
       </div>
   </div>
  );
};

export default Inventory;
