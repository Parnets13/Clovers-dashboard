import React from 'react';
import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const { Content } = Layout;

const AppLayout = () => {
  let token=localStorage.getItem("token");
  if(!token){
    window.location.assign("/login");
    return;
  }else
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      {/* <Topbar /> */}
      <Layout style={{ padding: '10px' }}>
        <Content
          style={{
            // padding: 10,
            margin: 0,
            background: '#fff',
          }}
        >
          {/* This will render the nested routes */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
