import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ImageField,
  EditButton,
  DeleteButton,
  ShowButton,
  BooleanField,
} from 'react-admin';

export const ProductList = (props) => (
  <List {...props} title="Products">
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="brand" />
      <TextField source="category" />
      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
      <NumberField source="stock" />
      <NumberField source="rating" />
      <ImageField source="thumbnail" title="Product Image" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
