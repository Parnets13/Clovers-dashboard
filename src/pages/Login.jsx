import React from "react";
import { Layout, Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, CoffeeOutlined, KeyOutlined } from "@ant-design/icons";
import logo from '../assets/logo.png'
import axios from "axios";
import { toast } from "sonner";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const Login = () => {
  const onFinish = async (values) => {
    try {
      let res = await axios.post("http://localhost:8000/api/admin/login", values);
      if (res.status == 200) {
        toast.success("Successfully login");
        localStorage.setItem("token", res.data.token)
        setTimeout(()=>{
          window.location.assign("/")
        },300)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error)
      } else {
        toast.error("Something went wrong");
      }
    }

    console.log("Success:", values);
  };

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <Sider width={400} style={{ background: "#1A1A2E", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="flex justify-center">
          <img src={logo} alt="Bar & Restaurant Logo" style={{ width: 250, marginBottom: 20, textAlign: "center" }} />
        </div>

        <Title level={2} style={{ color: "#fff", textAlign: "center" }}>
          <CoffeeOutlined style={{ marginRight: 10 }} /> Welcome to Bar & Restaurant
        </Title>
        <Text style={{ color: "#ddd", display: "block", textAlign: "center", fontSize: "16px" }}>
          Enjoy the best dining experience with us!
        </Text>
      </Sider>

      {/* Login Form Section */}
      <Layout>
        <Content style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F5", padding: "20px" }}>
          <Card style={{ width: 400, padding: 30, boxShadow: "0px 4px 20px rgba(0,0,0,0.3)", borderRadius: "10px" }}>
            <Title level={3} style={{ textAlign: "center", color: "#1A1A2E" }}>
              <KeyOutlined style={{ marginRight: 10, color: "#d8a47e" }} /> Login
            </Title>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input prefix={<UserOutlined style={{ color: "#1A1A2E" }} />} placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password prefix={<LockOutlined style={{ color: "#1A1A2E" }} />} placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" style={{ background: "#d8a47e", borderColor: "#d8a47e", fontWeight: "bold" }}>Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Login;
