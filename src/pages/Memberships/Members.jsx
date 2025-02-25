import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Tag, Image, Select, message , Input , Button ,  } from "antd";
import * as XLSX from "xlsx";


const { Option } = Select

const Members = () => {
    const [member, setMember] = useState([])

    const [tableData, setTableData] = useState(member);
    const [searchText, setSearchText] = useState(""); // Search state

      const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(member);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Membership Member Data");
        XLSX.writeFile(workbook, "MembersData.xlsx");
      };

    const getAllMembers = async () => {
        const res = await axios.get("http://localhost:8000/api/memberships/renewals")
        console.log(res)
        setMember(res.data)
    }

    useEffect(() => { getAllMembers() }, [])

    // Function to update status in the backend
    const handleStatusChange = async (record, newStatus) => {
        try {
            // Assuming API endpoint: PUT /api/renewal/:id
            await axios.put(`http://localhost:8000/api/memberships/renewals/${record._id}`, { status: newStatus });

            // Update UI Optimistically
            setTableData((prevData) =>
                prevData.map((item) =>
                    item._id === record._id ? { ...item, status: newStatus } : item
                )
            );

            message.success("Status updated successfully!");
            getAllMembers()
        } catch (error) {
            console.error("Error updating status:", error);
            message.error("Failed to update status.");
        }
    };

    const columns = [
        {
            title: "Sl No",
            dataIndex: "slNo",
            key: "slNo",
            render: (text, record, index) => index + 1,
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Membership Name",
            dataIndex: "membershipName",
            key: "membershipName",
        },
        {
            title: "Membership Type",
            dataIndex: "membershipType",
            key: "membershipType",
            render: (type) => <Tag color={type === "corporate" ? "blue" : "green"}>{type.toUpperCase()}</Tag>,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `₹${amount.toLocaleString()}`,
        },
        {
            title: "Expiry Date",
            dataIndex: "membershipExpairy",
            key: "membershipExpairy",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Benefits",
            dataIndex: "benefit",
            key: "benefit",
            render: (benefits) =>
                benefits.map((benefit, index) => (
                    <Tag color="purple" key={index}>
                        {benefit}
                    </Tag>
                )),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <Select value={status} onChange={(value) => handleStatusChange(record, value)} style={{ width: 120 }}>
                    <Option value="Pending">Pending</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Rejected">Rejected</Option>
                </Select>
            ),
        },
        {
            title: "QR Code",
            dataIndex: "qrCode",
            key: "qrCode",
            render: (qrCode) => <Image width={50} src={qrCode} />,
        },
    ];

    const filteredData = member.filter((member) =>
        Object.keys(member).some((key) =>
            String(member[key]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className='main-content'>
            <div className=" flex justify-between items-center">
                <h2>Membership Members</h2>
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
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={filteredData} rowKey="_id" />;
        </div>
    )
}

export default Members