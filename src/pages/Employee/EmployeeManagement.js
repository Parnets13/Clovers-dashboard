import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';



const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [modalType, setModalType] = useState('');

    const showAddModal = () => {
        setModalType('add');
        setIsModalVisible(true);
    };

    const showEditModal = (employee) => {
        setCurrentEmployee(employee);
        setModalType('edit');
        setIsModalVisible(true);
    };

    const showDeleteModal = (employee) => {
        setCurrentEmployee(employee);
        setModalType('delete');
        setIsModalVisible(true);
    };

    const handleOk = (values) => {
        if (modalType === 'add') {
            setEmployees([...employees, values]);
        } else if (modalType === 'edit') {
            setEmployees(employees.map(emp => (emp.key === currentEmployee.key ? values : emp)));
        } else if (modalType === 'delete') {
            setEmployees(employees.filter(emp => emp.key !== currentEmployee.key));
        }
        setIsModalVisible(false);
        setCurrentEmployee(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentEmployee(null);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone ',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email ',
            dataIndex: 'Email',
            key: 'email',
        },
        {
            title: 'Address ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Position ',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                    <Button onClick={() => showDeleteModal(record)}>Delete</Button>
                </>
            ),
        },
    ];

    const employeesDta = [
        { key: 1, name: 'John Doe', position: 'Software Engineer', phone: '123-456-7890', address: '123 Main St, Bengaluru', attendance: '95%', shift: '9 AM - 5 PM', salary: '₹1,200,000', taxProcessing: '₹150,000', payslip: 'URL_TO_PDF' },
        { key: 2, name: 'Jane Smith', position: 'Product Manager', phone: '987-654-3210', address: '456 Elm St, Bengaluru', attendance: '98%', shift: '10 AM - 6 PM', salary: '₹1,500,000', taxProcessing: '₹180,000', payslip: 'URL_TO_PDF' },
        { key: 3, name: 'Alice Johnson', position: 'UI/UX Designer', phone: '456-789-1230', address: '789 Oak St, Bengaluru', attendance: '92%', shift: '11 AM - 7 PM', salary: '₹1,000,000', taxProcessing: '₹120,000', payslip: 'URL_TO_PDF' },
        { key: 4, name: 'Bob Brown', position: 'Data Scientist', phone: '654-321-9870', address: '321 Pine St, Bengaluru', attendance: '97%', shift: '9 AM - 5 PM', salary: '₹1,800,000', taxProcessing: '₹220,000', payslip: 'URL_TO_PDF' },
        { key: 5, name: 'Charlie Davis', position: 'DevOps Engineer', phone: '789-123-4560', address: '654 Maple St, Bengaluru', attendance: '93%', shift: '10 AM - 6 PM', salary: '₹1,300,000', taxProcessing: '₹160,000', payslip: 'URL_TO_PDF' },
        { key: 6, name: 'Diana Evans', position: 'Marketing Specialist', phone: '321-987-6540', address: '987 Cedar St, Bengaluru', attendance: '94%', shift: '11 AM - 7 PM', salary: '₹900,000', taxProcessing: '₹110,000', payslip: 'URL_TO_PDF' },
        { key: 7, name: 'Frank Green', position: 'Sales Manager', phone: '567-890-1234', address: '123 Birch St, Bengaluru', attendance: '96%', shift: '9 AM - 5 PM', salary: '₹1,400,000', taxProcessing: '₹170,000', payslip: 'URL_TO_PDF' },
        { key: 8, name: 'Grace Harris', position: 'Customer Support', phone: '890-123-4567', address: '456 Redwood St, Bengaluru', attendance: '95%', shift: '10 AM - 6 PM', salary: '₹800,000', taxProcessing: '₹100,000', payslip: 'URL_TO_PDF' },
        { key: 9, name: 'Henry Jackson', position: 'HR Manager', phone: '234-567-8901', address: '789 Willow St, Bengaluru', attendance: '97%', shift: '11 AM - 7 PM', salary: '₹1,600,000', taxProcessing: '₹200,000', payslip: 'URL_TO_PDF' },
        { key: 10, name: 'Isla Kelly', position: 'Finance Analyst', phone: '567-123-8904', address: '321 Spruce St, Bengaluru', attendance: '94%', shift: '9 AM - 5 PM', salary: '₹1,100,000', taxProcessing: '₹140,000', payslip: 'URL_TO_PDF' },
    ];

    return (
        <div className="">


            <div className="dashboard-container">
           
                <div className="main-content">
             
                    <div className="dashboard-content">
                        <Button className="primary-button w-40" onClick={showAddModal}>
                            Add Employee
                        </Button>
                        <Table dataSource={employeesDta} columns={columns} rowKey="key" />
                        <Modal
                            title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Employee`}
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Form onFinish={handleOk} initialValues={currentEmployee || { key: Date.now() }}>
                                {modalType !== 'delete' ? (
                                    <>
                                        <Form.Item name="key" hidden>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Enter employee Employee Name' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Enter Employee Phone Number' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Enter Employee Email' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="email" label="Adddress" rules={[{ required: true, message: 'Enter Employee Address' }]}>
                                            <Input />
                                        </Form.Item>
                                    </>
                                ) : (
                                    <p>Are you sure you want to delete this employee?</p>
                                )}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {modalType === 'delete' ? 'Delete' : 'Submit'}
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
