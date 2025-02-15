import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const Benefit = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [modalType, setModalType] = useState("");
    const [form] = Form.useForm();

    const showAddModal = () => {
        setModalType("add");
        setIsModalVisible(true);
        form.resetFields();
    };

    const showEditModal = (item) => {
        setCurrentItem(item);
        setModalType("edit");
        setIsModalVisible(true);
        form.setFieldsValue(item);
    };

    const showDeleteModal = (item) => {
        setCurrentItem(item);
        setIsDeleteModalVisible(true);
    };

    const getBenefit = async () => {
        const res = await axios.get('http://localhost:8000/api/benefit/get');
        setData(res.data.data);
    };

    useEffect(() => {
        getBenefit();
    }, []);

    const handleOk = async (values) => {
        if (modalType === "add") {
            const res = await axios.post('http://localhost:8000/api/benefit/add', values);
            setData([...data, res.data.data]);
            getBenefit();
        } else if (modalType === "edit") {
            const res = await axios.post(`http://localhost:8000/api/benefit/edit/${currentItem._id}`, values);
            setData(data.map((item) => (item.key === currentItem.key ? res.data.data : item)));
            getBenefit();
        }
        setIsModalVisible(false);
        setCurrentItem(null);
        form.resetFields();
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:8000/api/benefit/delete/${currentItem._id}`);
        setData(data.filter(item => item.key !== currentItem.key));
        setIsDeleteModalVisible(false);
        getBenefit();
        setCurrentItem(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDeleteModalVisible(false);
        setCurrentItem(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div className="flex gap-2 items-center">
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                    <Button onClick={() => showDeleteModal(record)} danger>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="main-content">
            <div className="form-wrapper flex justify-between items-center">
                <h2>Benefits</h2>
                <div className="w-[15%]">
                    <Button className="primary-button" onClick={showAddModal}>
                        Add Benefit
                    </Button>
                </div>
            </div>
            <Table dataSource={data} columns={columns} rowKey="key" />
            <Modal
                title={modalType === "add" ? "Add Benefit" : "Edit Benefit"}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleOk}
                    initialValues={currentItem || { key: Date.now() }}
                >
                    <Form.Item name="key" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please enter benefit name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {modalType === "add" ? "Add" : "Edit"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Delete Benefit"
                visible={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this benefit?</p>
            </Modal>
        </div>
    );
};

export default Benefit;