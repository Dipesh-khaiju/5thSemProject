import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Result
        status="success"
        title="Payment Successfully Completed!"
        subTitle="Thank you for your purchase. Your order is being processed and will be delivered soon."
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/')}>
            Back to Home
          </Button>,
          <Button key="products" onClick={() => navigate('/allproducts')}>
            Continue Shopping
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
