import React, { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Image,
  Button,
  Space,
  Typography,
  Spin,
  Alert,
  Popconfirm,
  Divider,
  Row,
  Col,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://khaijushop-server.onrender.com/api';

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/admin/products/${id}`);
      message.success('Product deleted successfully');
      navigate('/admin/products');
    } catch (err) {
      message.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 16, color: '#6b7280' }}>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <Alert
        type="error"
        message="Error loading product"
        description={error || 'Product not found'}
        showIcon
        action={
          <Button onClick={() => navigate('/admin/products')}>Back to Products</Button>
        }
      />
    );
  }

  const statusColor = {
    'In Stock': 'green',
    'Low Stock': 'orange',
    'Out of Stock': 'red',
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/admin/products')}
            style={{ borderRadius: 8 }}
          />
          <Typography.Title level={4} style={{ margin: 0, color: '#111827' }}>
            Product Details
          </Typography.Title>
        </div>
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/products/edit/${id}`)}
            style={{ borderRadius: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this product?"
            description="This action cannot be undone."
            onConfirm={handleDelete}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} style={{ borderRadius: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>

      {/* Product Header Card */}
      <Card style={{ borderRadius: 12, marginBottom: 16 }}>
        <Row gutter={24}>
          <Col xs={24} md={8} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              style={{ borderRadius: 8, maxHeight: 250, objectFit: 'cover' }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPk3p7HRAAAAABJRU5ErkJggg=="
            />
          </Col>
          <Col xs={24} md={16}>
            <Typography.Title level={3} style={{ margin: 0, color: '#111827' }}>
              {product.title}
            </Typography.Title>

            <Space style={{ marginTop: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <Tag style={{ textTransform: 'capitalize', borderRadius: 6 }}>{product.category}</Tag>
              <Tag color="blue" style={{ borderRadius: 6 }}>{product.brand}</Tag>
              <Tag color={statusColor[product.stock <= 0 ? 'Out of Stock' : (product.stock <= 5 ? 'Low Stock' : 'In Stock')] || 'default'} style={{ borderRadius: 6 }}>
                {product.stock <= 0 ? 'Out of Stock' : (product.stock <= 5 ? 'Low Stock' : 'In Stock')}
              </Tag>

            </Space>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                  Price
                </Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, color: '#4f46e5' }}>
                  Rs. {product.price}
                </Typography.Title>
              </div>
              {product.discountPercentage > 0 && (
                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                    Discount
                  </Typography.Text>
                  <Typography.Title level={3} style={{ margin: 0, color: '#ef4444' }}>
                    {product.discountPercentage}%
                  </Typography.Title>
                </div>
              )}
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                  Stock
                </Typography.Text>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {product.stock}
                </Typography.Title>
              </div>

            </div>
          </Col>
        </Row>
      </Card>

      {/* Description */}
      <Card style={{ borderRadius: 12, marginBottom: 16 }}>
        <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
          Description
        </Typography.Text>
        <Divider style={{ margin: '12px 0' }} />
        <Typography.Paragraph style={{ color: '#4b5563', marginBottom: 0 }}>
          {product.description}
        </Typography.Paragraph>
      </Card>

      {/* Details */}
      <Card style={{ borderRadius: 12, marginBottom: 16 }}>
        <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
          Product Details
        </Typography.Text>
        <Divider style={{ margin: '12px 0' }} />
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
          <Descriptions.Item label="SKU">{product.sku || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Warranty">{product.warrantyInformation || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Shipping">{product.shippingInformation || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Return Policy">{product.returnPolicy || 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Tags
          </Typography.Text>
          <Divider style={{ margin: '12px 0' }} />
          <Space wrap>
            {product.tags.map((tag, i) => (
              <Tag key={i} color="blue" style={{ borderRadius: 6 }}>{tag}</Tag>
            ))}
          </Space>
        </Card>
      )}

      {/* Images */}
      {product.images && product.images.length > 0 && (
        <Card style={{ borderRadius: 12 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Product Images
          </Typography.Text>
          <Divider style={{ margin: '12px 0' }} />
          <Image.PreviewGroup>
            <Space wrap size={12}>
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  width={120}
                  height={120}
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPk3p7HRAAAAABJRU5ErkJggg=="
                />
              ))}
            </Space>
          </Image.PreviewGroup>
        </Card>
      )}
    </div>
  );
};

export default ProductView;
