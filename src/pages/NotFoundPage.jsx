import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FrownOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Result
        icon={<FrownOutlined style={{ fontSize: '72px', color: '#ff4d4f' }} />}
        status="404"
        title="404 - Page Not Found"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Button type="primary" size="large" onClick={handleGoHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
