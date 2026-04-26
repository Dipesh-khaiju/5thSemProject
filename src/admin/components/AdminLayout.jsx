import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Drawer } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../FireBaseAuth/FireBaseAuth';
import toast from 'react-hot-toast';
import {
  DashboardOutlined,
  ShoppingOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

const menuItems = [
  {
    key: '/admin',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/admin/products',
    icon: <ShoppingOutlined />,
    label: 'Products',
  },
  {
    key: '/admin/products/create',
    icon: <PlusCircleOutlined />,
    label: 'Add Product',
  },
];

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMobileDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('role');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // Determine active menu key
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/admin') return '/admin';
    if (path.includes('/admin/products/create')) return '/admin/products/create';
    if (path.includes('/admin/products')) return '/admin/products';
    return '/admin';
  };

  const siderContent = (
    <>
      {/* Logo */}
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '0' : '0 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>K</span>
        </div>
        {!collapsed && (
          <span style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            marginLeft: 10,
            whiteSpace: 'nowrap',
          }}>
            KhaijuShop
          </span>
        )}
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          borderRight: 0,
          marginTop: 8,
        }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={80}
        width={240}
        style={{
          background: '#111827',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          overflow: 'auto',
        }}
        className="hidden-mobile-sider"
      >
        {siderContent}
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        width={260}
        styles={{ body: { padding: 0, background: '#111827' }, header: { display: 'none' } }}
        className="mobile-drawer"
      >
        {siderContent}
      </Drawer>

      {/* Main Content Area */}
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        {/* Header */}
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 64,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              className="mobile-menu-btn"
              style={{ display: 'none' }}
            />
            <Typography.Text strong style={{ fontSize: 16, color: '#111827' }}>
              Admin Panel
            </Typography.Text>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              type="text"
              icon={<HomeOutlined />}
              onClick={() => window.open('/', '_blank')}
              style={{ color: '#6b7280' }}
            >
              Visit Store
            </Button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              background: '#f9fafb',
              borderRadius: 8,
            }}>
              <div style={{
                width: 30,
                height: 30,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <UserOutlined style={{ color: '#fff', fontSize: 13 }} />
              </div>
              <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                {user?.displayName || 'Admin'}
              </span>
            </div>

            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        {/* Page Content */}
        <Content style={{ padding: 24, background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 991px) {
          .hidden-mobile-sider {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          .ant-layout {
            margin-left: 0 !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-drawer .ant-drawer-mask,
          .mobile-drawer .ant-drawer-content-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default AdminLayout;
