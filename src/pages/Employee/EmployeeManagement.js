import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import axios from "axios";
import { render } from "@testing-library/react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [modalType, setModalType] = useState("");
  const [searchText, setSearchText] = useState(""); // Search state

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Data");
    XLSX.writeFile(workbook, "EmployeeData.xlsx");
  };

  const showAddModal = () => {
    setModalType("add");
    setIsModalVisible(true);
  };

  const showEditModal = (employee) => {
    setCurrentEmployee(employee);
    setModalType("edit");
    setIsModalVisible(true);
    form.setFieldsValue({
      name: employee.name,
      email: employee.email,
      address: employee.address,
      phone: employee.phone,
      position: employee.position,
      panNo: employee.panNo,
      aadharNo: employee.aadharNo,
      accountNo: employee.accountNo,
      ifsc: employee.ifsc,
      bank: employee.bank,
    }); // ✅ Pre-fill form with previous values
  };

  const showDeleteModal = (employee) => {
    setCurrentEmployee(employee);
    setModalType("delete");
    setIsModalVisible(true);
  };

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();

      if (modalType === "add") {
        Object.entries(values).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });

        // Handle file uploads
        if (values.photo && values.photo[0]?.originFileObj) {
          formData.append("photo", values.photo[0].originFileObj);
        }
        if (values.aadharPhoto && values.aadharPhoto[0]?.originFileObj) {
          formData.append("aadharPhoto", values.aadharPhoto[0].originFileObj);
        }
        if (values.panPhoto && values.panPhoto[0]?.originFileObj) {
          formData.append("panPhoto", values.panPhoto[0].originFileObj);
        }
        await axios.post("http://localhost:8000/api/employee/add", formData);
        message.success("Employee added successfully!");
        getEmployees(); // Refresh the employee list after adding a new employee
      } else if (modalType === "edit" && currentEmployee) {
        // Append only selected files for editing
        if (values.photo?.[0]?.originFileObj) {
          formData.append("photo", values.photo[0].originFileObj);
        }
        if (values.aadharPhoto?.[0]?.originFileObj) {
          formData.append("aadharPhoto", values.aadharPhoto[0].originFileObj);
        }
        if (values.panPhoto?.[0]?.originFileObj) {
          formData.append("panPhoto", values.panPhoto[0].originFileObj);
        }

        if (
          formData.has("photo") ||
          formData.has("aadharPhoto") ||
          formData.has("panPhoto")
        ) {
          await axios.put(
            `http://localhost:8000/api/employee/update/${currentEmployee._id}`,
            formData
          );
          message.success("Files updated successfully!");
          getEmployees();
        } else {
          message.info("No new files uploaded.");
        }
        message.success("Employee updated successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error("Operation failed!");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/employee/delete/${currentEmployee._id}`
      );
      message.success("Employee deleted successfully!");
      setIsModalVisible(false);
      getEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      message.error("Failed to delete employee.");
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/employee/get"
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentEmployee(null);
  };

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
      key: "slNo",
      render: (text, record, index) => index + 1,
    },
  
      {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text, record) => (
      //   <Link
      //     to={`/employee/${record._id}`}
      //     style={{ color: "blue" }}
      //   >
      //     {text}
      //   </Link>
      // ),
    },
    {
      title: "Phone ",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email ",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "EmployeId ",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Address ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Position ",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Pan No ",
      dataIndex: "panNo",
      key: "panNo",
    },
    {
      title: "Aadhar No ",
      dataIndex: "aadharNo",
      key: "aadharNo",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Account No ",
      dataIndex: "aadharNo",
      key: "aadharNo",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifsc",
      key: "ifsc",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/employee/${record.photo}`}
          alt="Photo"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Aadhar Photo",
      dataIndex: "aadharPhoto",
      key: "aadharPhoto",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/employee/${record.aadharPhoto}`}
          alt="Aadhar Photo"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Pan Photo",
      dataIndex: "panPhoto",
      key: "panPhoto",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/employee/${record.panPhoto}`}
          alt="Pan Photo"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button onClick={() => showDeleteModal(record)}>Delete</Button>
        </>
      ),
    },
  ];

  const filteredData = employees.filter((member) =>
    Object.keys(member).some((key) =>
      String(member[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="">
      <div className="dashboard-container">
        <div className="main-content">
          <div className="dashboard-content">
            <div className="flex justify-between items-center">
              <h2>Employee Management</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search members..."
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 300, marginRight: 10 }}
                />
                <div className="flex items-center gap-3">
                  <Button onClick={handleExport} style={{ marginLeft: 10 }}>
                    Export to Excel
                  </Button>
                  <Button
                    className="primary-button w-40"
                    onClick={showAddModal}
                  >
                    Add Employee
                  </Button>
                </div>
              </div>
            </div>
            <Table dataSource={filteredData} columns={columns} rowKey="key" />

            <Modal
              title={`${
                modalType.charAt(0).toUpperCase() + modalType.slice(1)
              } Employee`}
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form}
                onFinish={handleOk}
                initialValues={currentEmployee || {}}
              >
                {modalType !== "delete" ? (
                  <>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      label="Address"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="position"
                      label="Position"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="panNo"
                      label="Pan No"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="aadharNo"
                      label="Aadhar No"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="bank"
                      label="Bank"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="accountNo"
                      label="Account No"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="ifsc"
                      label="IFSC Code"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    {/* <Form.Item
                      name="photo"
                      label="Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e?.fileList || [];
                      }}
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Photo</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="aadharPhoto"
                      label="Aadhar Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e?.fileList || [];
                      }}
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Aadhar Photo</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="panPhoto"
                      label="Pan Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                          return e;
                        }
                        return e?.fileList || [];
                      }}
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Pan Photo</Button>
                      </Upload>
                    </Form.Item> */}

                    <Form.Item
                      name="photo"
                      label="Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) =>
                        e?.fileList ? [...e.fileList] : []
                      }
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Photo</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="aadharPhoto"
                      label="Aadhar Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) =>
                        e?.fileList ? [...e.fileList] : []
                      }
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Aadhar Photo</Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="panPhoto"
                      label="Pan Photo"
                      valuePropName="fileList"
                      getValueFromEvent={(e) =>
                        e?.fileList ? [...e.fileList] : []
                      }
                    >
                      <Upload beforeUpload={() => false} listType="picture">
                        <Button>Upload Pan Photo</Button>
                      </Upload>
                    </Form.Item>
                  </>
                ) : (
                  <p>Are you sure you want to delete this employee?</p>
                )}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {modalType === "delete" ? "Delete" : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
