import { fetchUtils } from 'react-admin';

const apiUrl = 'https://khaijushop-server.onrender.com/api';
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  // Get list of products
  getList: (resource, params) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/products`)
        .then(({ json }) => ({
          data: json.products.map(product => ({ 
            ...product, 
            id: product._id || product.id 
          })),
          total: json.total || json.products.length,
        }));
    }
    return Promise.reject(new Error('Unknown resource'));
  },

  // Get one product
  getOne: (resource, params) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/products/${params.id}`)
        .then(({ json }) => ({
          data: { 
            ...json.product, 
            id: json.product._id || json.product.id 
          },
        }));
    }
    return Promise.reject(new Error('Unknown resource'));
  },

  // Get many products
  getMany: (resource, params) => {
    if (resource === 'products') {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      return httpClient(`${apiUrl}/products?${fetchUtils.queryParameters(query)}`)
        .then(({ json }) => ({
          data: json.products.map(product => ({ 
            ...product, 
            id: product._id || product.id 
          })),
        }));
    }
    return Promise.reject(new Error('Unknown resource'));
  },

  // Get many reference
  getManyReference: (resource, params) => {
    return Promise.resolve({ data: [], total: 0 });
  },

  // Create a product
    create: (resource, params) => {
      if (resource === 'products') {
        return httpClient(`${apiUrl}/admin/products`, {
          method: 'POST',
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({
          data: { 
            ...json.product, 
            id: json.product._id || json.product.id 
          },
        }));
      }
      return Promise.reject(new Error('Unknown resource'));
    },

  // Update a product
    update: (resource, params) => {
      if (resource === 'products') {
        return httpClient(`${apiUrl}/admin/products/${params.id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({
          data: { 
            ...json.product, 
            id: json.product._id || json.product.id 
          },
        }));
      }
      return Promise.reject(new Error('Unknown resource'));
    },

  // Update many products
  updateMany: (resource, params) => {
    return Promise.resolve({ data: params.ids });
  },

  // Delete a product
    delete: (resource, params) => {
      if (resource === 'products') {
        return httpClient(`${apiUrl}/admin/products/${params.id}`, {
          method: 'DELETE',
        }).then(() => ({ data: params.previousData }));
      }
      return Promise.reject(new Error('Unknown resource'));
    },

  // Delete many products
  deleteMany: (resource, params) => {
    return Promise.resolve({ data: params.ids });
  },
};
