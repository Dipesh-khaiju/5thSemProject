import React from 'react';
import {
  Create,
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

export const ProductCreate = (props) => (
  <Create {...props} title="Create New Product">
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="brand" fullWidth />
      <SelectInput source="category" choices={categoryChoices} validate={[required()]} />
      <TextInput source="sku" label="SKU" />
      <NumberInput source="price" validate={[required()]} />
      <NumberInput source="discountPercentage" label="Discount %" defaultValue={0} />
      <NumberInput source="stock" validate={[required()]} />
      <NumberInput source="rating" step={0.1} defaultValue={0} />
      <SelectInput source="availabilityStatus" choices={availabilityChoices} defaultValue="In Stock" />
      <TextInput source="thumbnail" label="Thumbnail URL" fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <TextInput source="warrantyInformation" fullWidth defaultValue="1 year warranty" />
      <TextInput source="shippingInformation" fullWidth defaultValue="Ships in 1 week" />
      <TextInput source="returnPolicy" fullWidth defaultValue="30 days return policy" />
      <NumberInput source="minimumOrderQuantity" defaultValue={1} />
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
  </Create>
);
