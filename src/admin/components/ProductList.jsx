import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Image,
  Typography,
  Popconfirm,
  message,
  Spin,
  Alert,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://khaijushop-server.onrender.com/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/products?limit=100`);
      setProducts(res.data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/products/${id}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      message.error('Failed to delete product');
    }
  };

  // Filter products by search text
  const filteredProducts = products.filter((p) => {
    const search = searchText.toLowerCase();
    return (
      p.title?.toLowerCase().includes(search) ||
      p.brand?.toLowerCase().includes(search) ||
      p.category?.toLowerCase().includes(search)
    );
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 70,
      render: (url) => (
        <Image
          src={url}
          alt="product"
          width={45}
          height={45}
          style={{ borderRadius: 6, objectFit: 'cover' }}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPk3p7HRAAAAABJRU5ErkJggg=="
          preview={false}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ellipsis: true,
      render: (text, record) => (
        <a
          onClick={() => navigate(`/admin/products/${record._id}`)}
          style={{ fontWeight: 500, color: '#111827' }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      responsive: ['md'],
      sorter: (a, b) => (a.brand || '').localeCompare(b.brand || ''),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      responsive: ['sm'],
      filters: [...new Set(products.map((p) => p.category))].map((cat) => ({
        text: cat?.charAt(0).toUpperCase() + cat?.slice(1),
        value: cat,
      })),
      onFilter: (value, record) => record.category === value,
      render: (cat) => (
        <Tag style={{ textTransform: 'capitalize', borderRadius: 6 }}>
          {cat}
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <span style={{ fontWeight: 600, color: '#4f46e5' }}>Rs. {price}</span>
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => {
        let color = 'green';
        if (stock <= 5) color = 'red';
        else if (stock <= 20) color = 'orange';
        return <Tag color={color} style={{ fontWeight: 600, borderRadius: 6 }}>{stock}</Tag>;
      },
    },
    {
      title: 'Status',
      key: 'availabilityStatus',
      responsive: ['lg'],
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Low Stock', value: 'Low Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
      ],
      onFilter: (value, record) => {
        const stock = record.stock || 0;
        const calcStatus = stock <= 0 ? 'Out of Stock' : (stock <= 5 ? 'Low Stock' : 'In Stock');
        return calcStatus === value;
      },
      render: (_, record) => {
        const stock = record.stock || 0;
        const status = stock <= 0 ? 'Out of Stock' : (stock <= 5 ? 'Low Stock' : 'In Stock');
        const colorMap = {
          'In Stock': 'green',
          'Low Stock': 'orange',
          'Out of Stock': 'red',
        };
        return <Tag color={colorMap[status] || 'default'} style={{ borderRadius: 6 }}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      fixed: 'right',
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="View">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/admin/products/${record._id}`)}
              style={{ color: '#6366f1' }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => navigate(`/admin/products/edit/${record._id}`)}
              style={{ color: '#f59e0b' }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete this product?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record._id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Tooltip title="Delete">
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                danger
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    return <Alert type="error" message="Error loading products" description={error} showIcon />;
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <Typography.Title level={4} style={{ margin: 0, color: '#111827' }}>
          Products
        </Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/admin/products/create')}
          style={{ borderRadius: 8 }}
        >
          Add Product
        </Button>
      </div>

      <Card style={{ borderRadius: 12 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 320, borderRadius: 8 }}
            allowClear
          />
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchProducts}
            style={{ borderRadius: 8 }}
          >
            Refresh
          </Button>
        </div>

        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey={(record) => record._id || record.id}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
          }}
          scroll={{ x: 700 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ProductList;
