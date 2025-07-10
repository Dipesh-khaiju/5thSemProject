import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await axios("https://khaijushop-server.onrender.com/api/products");
        setAllProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
