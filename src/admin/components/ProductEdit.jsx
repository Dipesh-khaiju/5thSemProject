import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';

const categoryChoices = [
  { id: 'beauty', name: 'Beauty' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home' },
];

const availabilityChoices = [
  { id: 'In Stock', name: 'In Stock' },
  { id: 'Low Stock', name: 'Low Stock' },
  { id: 'Out of Stock', name: 'Out of Stock' },
];

export const ProductEdit = (props) => (
  <Edit {...props} title="Edit Product">
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="brand" fullWidth />
      <SelectInput source="category" choices={categoryChoices} validate={[required()]} />
      <TextInput source="sku" label="SKU" />
      <NumberInput source="price" validate={[required()]} />
      <NumberInput source="discountPercentage" label="Discount %" />
      <NumberInput source="stock" validate={[required()]} />
      <NumberInput source="rating" step={0.1} />
      <SelectInput source="availabilityStatus" choices={availabilityChoices} />
      <TextInput source="thumbnail" label="Thumbnail URL" fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <TextInput source="warrantyInformation" fullWidth />
      <TextInput source="shippingInformation" fullWidth />
      <TextInput source="returnPolicy" fullWidth />
      <NumberInput source="minimumOrderQuantity" />
      <ArrayInput source="tags">
        <SimpleFormIterator>
          <TextInput source="." />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="images">
        <SimpleFormIterator>
          <TextInput source="." label="Image URL" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
