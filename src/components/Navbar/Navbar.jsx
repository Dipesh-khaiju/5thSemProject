import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { signOut,getAuth } from "firebase/auth";
import toast from "react-hot-toast";


const Navbar = ({ Carter, userName }) => {
  const [show, setShow] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Check user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [userName]); // Re-check when userName changes (login/logout)
  const toogleChange = () => {
    show === false ? setShow(true) : setShow(false);
  };
  // const toogleClose =()=>{
  //   setShow(false)
  // }
const handleLogout =()=>{
  const auth = getAuth();
signOut(auth).then(() => {
  // Clear role from localStorage on logout
  localStorage.removeItem("role");
  setUserRole(null); // Clear role state
  toast.success("Logged Out Successfully")
}).catch((error) => {
  console.log(error)
});
}
  return (
    <>
      <div>
        <header className=" max-sm bg-white border-b border-gray-200 relative py-2">
          <div className="container mx-auto flex justify-between p-5 items-center">
            <div>
              <Link to="/">
                <h3 className="font-bold md:text-3xl  lg:4xl  text-xl">
                  Hamroo<span className="text-[red]">Shop</span>
                </h3>
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center  md:text-sm lg:text-xl  justify-center font-semibold">
                <Link to="/">
                  <li className="mr-7 hover:text-gray-900 cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link to="/allproducts">
                  <li className="mr-7 hover:text-gray-900 cursor-pointer">
                    All products
                  </li>
                </Link>
                <Link to="/aboutus">
                  <li className="mr-7 hover:text-gray-900 cursor-pointer">About Us
                  </li>
                </Link>
                <Link to="/contact">
                <li className="mr-7 hover:text-gray-900 cursor-pointer">
                  Contact 
                </li>
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin">
                  <li className="mr-7 hover:text-blue-600 cursor-pointer text-blue-500 font-bold">
                    Admin
                  </li>
                  </Link>
                )}
            
              </ul>
            </div>
            {show ? (
              <div>
                <ul className="flex flex-col gap-10 text-2xl absolute top-[88px] left-0  h-screen w-full text-[white] z-10 bg-[red] text-lg justify-center items-center font-semibold">
                  <Link to="/">
                    <li className="mt-5  hover:text-gray-900 cursor-pointer">
                      Home
                    </li>
                  </Link>
                  <Link to="/allproducts">
                    <li className="mt-5 hover:text-gray-900 cursor-pointer">
                      All products
                    </li>
                    </Link>
                    <Link to="/aboutus">
                    <li className="mt-5 hover:text-gray-900 cursor-pointer">
                    About Us
                  </li>
                    </Link>
                    <Link to="/contact">
                    <li className="mt-5 hover:text-gray-900 cursor-pointer">
                   Contact 
                  </li>
                    </Link>
                    {userRole === "admin" && (
                      <Link to="/admin">
                      <li className="mt-5 hover:text-blue-300 cursor-pointer text-blue-200 font-bold">
                     Admin
                    </li>
                      </Link>
                    )}

                </ul>
                <button
                  onClick={toogleChange}
                  className="absolute top-[75px] z-10 right-0 text-white py-6 px-4 cursor-pointer"
                >
                  <RxCross2 size={30} />
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center items-center gap-4 sm:gap-6">
              {userName ? (
                <>
                  <Link to="/login">
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 text-sm md:text-base rounded shadow transition-colors"
                    >
                      Log Out
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 text-sm md:text-base rounded shadow transition-colors">
                    Log In
                  </button>
                </Link>
              )}

              <div className="flex items-center gap-4">
                <Link to="/cart">
                  <button className="relative flex items-center">
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 z-10">
                      {Carter?.length || 0}
                    </span>
                    <FaCartArrowDown className="text-gray-700 hover:text-gray-900 transition-colors" size={24} />
                  </button>
                </Link>

                {userName && (
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold text-sm sm:text-base uppercase" title={userName}>
                    {userName.substring(0, 2)}
                  </div>
                )}
              </div>

              {!show && (
                <button onClick={toogleChange} className="block md:hidden p-1 text-gray-700 hover:text-gray-900 transition-colors">
                  <GiHamburgerMenu size={24} />
                </button>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
