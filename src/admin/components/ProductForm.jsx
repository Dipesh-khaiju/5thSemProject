import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Spin,
  message,
  Alert,
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://khaijushop-server.onrender.com/api';

const { TextArea } = Input;

const ProductForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`${API_URL}/products/${id}`);
      const product = res.data.product;
      form.setFieldsValue({
        title: product.title,
        brand: product.brand,
        category: product.category,
        sku: product.sku,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        rating: product.rating,
        availabilityStatus: product.availabilityStatus,
        minimumOrderQuantity: product.minimumOrderQuantity,
        thumbnail: product.thumbnail,
        images: product.images || [],
        tags: product.tags || [],
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        returnPolicy: product.returnPolicy,
      });
    } catch (err) {
      setError(err.message);
      message.error('Failed to load product');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // Clean up empty values from tags/images arrays
      const stockAmount = values.stock || 0;
      const calculatedStatus = stockAmount <= 0 ? 'Out of Stock' : (stockAmount <= 5 ? 'Low Stock' : 'In Stock');
      const data = {
        ...values,
        availabilityStatus: calculatedStatus,
        tags: (values.tags || []).filter(Boolean),
        images: (values.images || []).filter(Boolean),
      };

      if (isEdit) {
        await axios.put(`${API_URL}/admin/products/${id}`, data);
        message.success('Product updated successfully');
      } else {
        await axios.post(`${API_URL}/admin/products`, data);
        message.success('Product created successfully');
      }
      navigate('/admin/products');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" />
        <p style={{ marginTop: 16, color: '#6b7280' }}>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message="Error" description={error} showIcon />;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
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
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </Typography.Title>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
        initialValues={{
          warrantyInformation: '1 year warranty',
          shippingInformation: 'Ships in 1 week',
          returnPolicy: '30 days return policy',
        }}
      >
        {/* Basic Information */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Basic Information
          </Typography.Text>
          <Divider style={{ margin: '12px 0 20px' }} />

          <Row gutter={16}>
            <Col xs={24} md={16}>
              <Form.Item
                name="title"
                label="Product Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="brand" label="Brand" rules={[{ required: true, message: 'Please enter brand name' }]}>
                <Input placeholder="Brand name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={24}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category">
                  <Select.Option value="beauty">Beauty</Select.Option>
                  <Select.Option value="fashion">Fashion</Select.Option>
                  <Select.Option value="electronics">Electronics</Select.Option>
                  <Select.Option value="home">Home</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} placeholder="Product description" />
          </Form.Item>
        </Card>

        {/* Pricing & Inventory */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Pricing & Inventory
          </Typography.Text>
          <Divider style={{ margin: '12px 0 20px' }} />

          <Row gutter={16}>
            <Col xs={12} md={8}>
              <Form.Item
                name="price"
                label="Price (Rs.)"
                rules={[{ required: true, message: 'Required' }]}
              >
                <InputNumber min={0} step={0.01} style={{ width: '100%' }} placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col xs={12} md={8}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Media */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Media
          </Typography.Text>
          <Divider style={{ margin: '12px 0 20px' }} />

          <Form.Item
            name="thumbnail"
            label="Thumbnail URL"
            rules={[{ required: true, message: 'Please enter a thumbnail URL' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                <Typography.Text style={{ color: '#6b7280', fontSize: 13, display: 'block', marginBottom: 8 }}>
                  Additional Images
                </Typography.Text>
                {fields.map((field) => (
                  <Space key={field.key} align="start" style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item {...field} style={{ marginBottom: 0, flex: 1 }}>
                      <Input placeholder="Image URL" style={{ width: '100%' }} />
                    </Form.Item>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ borderRadius: 8 }}
                  block
                >
                  Add Image URL
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        {/* Policies */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Policies & Info
          </Typography.Text>
          <Divider style={{ margin: '12px 0 20px' }} />

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="warrantyInformation" label="Warranty">
                <Input placeholder="1 year warranty" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="shippingInformation" label="Shipping">
                <Input placeholder="Ships in 1 week" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="returnPolicy" label="Return Policy">
                <Input placeholder="30 days return policy" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Tags */}
        <Card style={{ borderRadius: 12, marginBottom: 16 }}>
          <Typography.Text strong style={{ fontSize: 15, color: '#374151' }}>
            Tags
          </Typography.Text>
          <Divider style={{ margin: '12px 0 20px' }} />

          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: fields.length > 0 ? 12 : 0 }}>
                  {fields.map((field) => (
                    <Space key={field.key} align="start">
                      <Form.Item {...field} style={{ marginBottom: 0 }}>
                        <Input placeholder="Tag" style={{ width: 150 }} />
                      </Form.Item>
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                        size="small"
                      />
                    </Space>
                  ))}
                </div>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ borderRadius: 8 }}
                >
                  Add Tag
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button onClick={() => navigate('/admin/products')} style={{ borderRadius: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
            style={{ borderRadius: 8 }}
          >
            {isEdit ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
