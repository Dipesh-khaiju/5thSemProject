import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ImageField,
  ArrayField,
  Datagrid,
  SingleFieldList,
  ChipField,
} from 'react-admin';

export const ProductShow = (props) => (
  <Show {...props} title="Product Details">
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="brand" />
      <TextField source="category" />
      <TextField source="sku" />
      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
      <NumberField source="discountPercentage" label="Discount %" />
      <NumberField source="rating" />
      <NumberField source="stock" />
      <TextField source="availabilityStatus" />
      <ImageField source="thumbnail" title="Product Thumbnail" />
      <TextField source="description" />
      <TextField source="warrantyInformation" />
      <TextField source="shippingInformation" />
      <TextField source="returnPolicy" />
      <NumberField source="minimumOrderQuantity" />
      <ArrayField source="tags">
        <SingleFieldList>
          <ChipField source="." />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="images" label="Product Images">
        <Datagrid>
          <ImageField source="." title="Image" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);
