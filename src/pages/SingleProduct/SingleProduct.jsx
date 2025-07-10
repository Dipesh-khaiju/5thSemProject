import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ProductContext } from "../../context/ProductContext";

const SingleProduct = ({ AddToCart }) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { productid } = useParams();
  const location = useLocation();
  const { allProducts } = useContext(ProductContext);
  const allproductNavigate = useNavigate();

  useEffect(() => {
    // First try to get product from location state (passed from AllProducts)
    if (location.state && location.state.productData) {
      setSingleProduct(location.state.productData);
      return;
    }
    
    // If not in location state, find from context
    if (allProducts.length > 0) {
      const product = allProducts.find(product => product.id === parseInt(productid) || product.id === productid);
      
      if (product) {
        setSingleProduct(product);
      } else {
        toast.error("Product not found");
      }
    }
  }, [productid, location.state, allProducts]);

  const addSingleProduct = () => {
    if (singleProduct) {
      AddToCart(singleProduct);
      toast.success("Added To Cart Successfully");
    }
  };

  if (!singleProduct) {
    return <div className="flex justify-center items-center h-screen">Loading product details...</div>;
  }

  return (
    <>
      <div>
        <div className="flex justify-center w-1/2">
          <button
            onClick={() => allproductNavigate("/allproducts")} 
            className="flex ml-8 mt-10 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Go Back
          </button>
        </div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 pb-24 pt-16 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-contain rounded"
                src={singleProduct.thumbnail}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {singleProduct.brand}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {singleProduct.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* ...existing code... */}
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    {/* ...existing code... */}
                  </span>
                </div>
                <p className="leading-relaxed">{singleProduct.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Rs.{singleProduct.price}
                  </span>
                  <button
                    onClick={addSingleProduct}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleProduct;
