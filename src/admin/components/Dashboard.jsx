import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Typography, Spin, Alert } from 'antd';
import {
  ShoppingOutlined,
  AppstoreOutlined,
  WarningOutlined,
  DollarOutlined,
  StarOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://khaijushop-server.onrender.com/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products?limit=100`);
      setProducts(res.data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 16, color: '#6b7280' }}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message="Error loading data" description={error} showIcon />;
  }

  const totalProducts = products.length;
  const categories = [...new Set(products.map((p) => p.category))];
  const lowStockProducts = products.filter((p) => p.stock <= 10);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const avgRating = products.length
    ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
    : 0;
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  // Low stock table columns
  const lowStockColumns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      responsive: ['md'],
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock <= 5 ? 'red' : 'orange'} style={{ fontWeight: 600 }}>
          {stock} left
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `Rs. ${price}`,
      responsive: ['sm'],
    },
  ];

  // Category breakdown for stats
  const categoryData = categories.map((cat) => ({
    category: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 24, color: '#111827' }}>
        Dashboard
      </Typography.Title>

      {/* Stat Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#111827', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title="Categories"
              value={categories.length}
              prefix={<AppstoreOutlined style={{ color: '#8b5cf6' }} />}
              valueStyle={{ color: '#111827', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title="Low Stock"
              value={lowStockProducts.length}
              prefix={<WarningOutlined style={{ color: lowStockProducts.length > 0 ? '#ef4444' : '#22c55e' }} />}
              valueStyle={{ color: lowStockProducts.length > 0 ? '#ef4444' : '#111827', fontWeight: 700 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={4}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title="Inventory Value"
              value={totalValue}
              precision={0}
              prefix={<span style={{ color: '#10b981', marginRight: 4, fontSize: 20 }}>Rs. </span>}
              valueStyle={{ color: '#111827', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={12} md={8} lg={4}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title="Brands"
              value={brands.length}
              prefix={<TagOutlined style={{ color: '#06b6d4' }} />}
              valueStyle={{ color: '#111827', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Category Breakdown */}
        <Col xs={24} md={12}>
          <Card
            title="Category Breakdown"
            style={{ borderRadius: 12, height: '100%' }}
            headStyle={{ fontWeight: 600 }}
          >
            {categoryData.map((item) => (
              <div
                key={item.category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <span style={{ textTransform: 'capitalize', fontWeight: 500, color: '#374151' }}>
                  {item.category}
                </span>
                <Tag color="blue">{item.count} products</Tag>
              </div>
            ))}
          </Card>
        </Col>

        {/* Low Stock Alerts */}
        <Col xs={24} md={12}>
          <Card
            title={`Low Stock Alerts (${lowStockProducts.length})`}
            style={{ borderRadius: 12, height: '100%' }}
            headStyle={{ fontWeight: 600 }}
          >
            {lowStockProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#6b7280' }}>
                <p style={{ fontSize: 28, marginBottom: 8 }}>✅</p>
                <p>All products are well stocked!</p>
              </div>
            ) : (
              <Table
                dataSource={lowStockProducts}
                columns={lowStockColumns}
                rowKey={(record) => record._id || record.id}
                pagination={false}
                size="small"
                onRow={(record) => ({
                  onClick: () => navigate(`/admin/products/${record._id}`),
                  style: { cursor: 'pointer' },
                })}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
