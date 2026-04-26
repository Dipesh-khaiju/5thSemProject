import './App.css';
import Home from './pages/Home/Home';
import Cart from "./pages/Cart/Cart"
// import AllProducts from './components/AllProducts/AllProducts';
import{ BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom"
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import {useEffect, useState} from "react";
import Navbar from "../src/components/Navbar/Navbar"
import Footer from "../src/components/Footer/Footer";
import toast,{Toaster} from "react-hot-toast";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./FireBaseAuth/FireBaseAuth";
import SingleProduct from './pages/SingleProduct/SingleProduct';
import About from './pages/AboutUs/About';
import Contact from './pages/Contact/Contact';
import {lazy,Suspense} from "react";
import { ProductProvider } from './context/ProductContext';
import Success from './pages/Success/Success';
import PaymentFailed from './pages/PaymentFailed/PaymentFailed';
import { AdminApp } from './admin';
const AllProducts = lazy(() => import('./components/AllProducts/AllProducts'));



function App() {

  const [cart,setCart]=useState([]);
  const [userName,setUserName] =useState("");

  const handleAdd=(id)=>{
    const item = cart.find(i => i.id === id);
    if (item && item.quantity >= item.stock) {
      toast.error(`Cannot add more. Only ${item.stock} items in stock.`);
      return;
    }
    const incQuantity = cart.map((item)=>(
      item.id === id ? {...item,quantity:item.quantity+1} :item 
    ))
    setCart(incQuantity);
  }
  const handleSub=(id)=>{
   const incQuantity = cart.map((item)=>(
      item.id === id && item.quantity > 1 ? {...item,quantity:item.quantity-1} :item 
    ))
    setCart(incQuantity);
  }
  const removeItem = (id)=>{
   const updateByFilter = cart.filter((filterItem)=> filterItem.id !== id)
   setCart(updateByFilter)
  }
  // calculate total
  const getTotal = ()=>{
    const anb = cart.reduce((total,cartReduceItem)=>{
      return total + cartReduceItem.price * cartReduceItem.quantity
    },0)
    return anb;
  }

  const addToCart=(product)=>{
    console.log(product);

    // console.log(cart)
    // setCart([...cart,product]);
    // setCart((prevCart) => [...prevCart,  product]);
  
    const productExist = cart.find((findItem)=>findItem.id === product.id)
    if(productExist){
      if (productExist.quantity >= product.stock) {
        toast.error(`Cannot add more. Only ${product.stock} items in stock.`);
        return;
      }
      const updateCart =  cart.map((item)=>(
        item.id===product.id ? {...item, quantity:item.quantity+1} :  item
      ))
      setCart(updateCart)
      toast.success("Added To Cart Successfully")
      
    }
    else{  
      if (product.stock > 0) {
        setCart((prevCart) => [...prevCart, { ...product,quantity:1}]); // Adding quantity to the api as it donot have quantity
        toast.success("Added To Cart Successfully")
      } else {
        toast.error("Product is out of stock")
      }
    }
    
  }

  // username Display
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName);
      }
      else{
        setUserName("")
      }

    });  
  },[setUserName])

  // Layout component to conditionally render navbar and footer
  const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
      <>
        {!isAdminRoute && <Navbar Carter={cart} userName={userName} />}
        {children}
        {!isAdminRoute && <Footer />}
      </>
    );
  };

    return (
      <>
      <div>
      <BrowserRouter>
      <ProductProvider>
      <Layout>
      <Suspense fallback={<div className="text-4xl w-full h-screen  items-center flex  justify-center "><h1 className=''>Loading your items...</h1></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cart={cart} addCount={handleAdd} subCount={handleSub} getTotal={getTotal} removeItem={removeItem} />} />
        <Route path="/allproducts" element={<AllProducts AddToCart={addToCart} />} />
        <Route path="/singleproduct/:productid" element={<SingleProduct AddToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUP" element={<Signup />} setUserName={setUserName} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/success" element={<Success />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
     </Suspense>
     </Layout>
     </ProductProvider>
     <Toaster />
      </BrowserRouter>
       
      </div>
    </>
  )
}

// Admin route protection component
const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'khaijudipesh@gmail.com') {
        localStorage.setItem('role', 'admin');
        setIsAdmin(true);
      } else {
        localStorage.removeItem('role');
        setIsAdmin(false);
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (isAdmin === null) {
    return (
      <div className="text-4xl w-full h-screen items-center flex justify-center">
        <h1>Verifying admin access...</h1>
      </div>
    );
  }

  if (!isAdmin) return null;
  return <AdminApp />;
};

export default App

