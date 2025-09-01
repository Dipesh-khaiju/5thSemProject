import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { ProductList } from './components/ProductList';
import { ProductShow } from './components/ProductShow';
import { ProductEdit } from './components/ProductEdit';
import { ProductCreate } from './components/ProductCreate';

// Custom theme
const theme = {
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
};

const AdminApp = () => (
  <Admin dataProvider={dataProvider} theme={theme} title="KhaijuShop Admin">
    <Resource
      name="products"
      list={ProductList}
      show={ProductShow}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default AdminApp;
