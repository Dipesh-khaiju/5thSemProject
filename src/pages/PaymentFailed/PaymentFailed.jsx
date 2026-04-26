import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Result
        status="error"
        title="Payment Failed!"
        subTitle="Unfortunately, your payment could not be processed. Please check your payment details and try again."
        extra={[
          <Button type="primary" danger key="cart" onClick={() => navigate('/cart')}>
            Back to Cart
          </Button>,
          <Button key="home" onClick={() => navigate('/')}>
            Go to Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentFailed;
