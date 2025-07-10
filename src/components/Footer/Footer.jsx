import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div>
      <footer className="bg-black   text-gray-300">
      <div className="container mx-auto py-4 px-4 flex flex-wrap justify-between">
        <div className="mb-2 ">
          <h2 className="text-4xl  font-semibold"> Hamroo<span className="text-[red]">Shop</span></h2>
        </div>
        <div className="flex flex-wrap items-start">
          <div className="mr-8 mb-4">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>Email: Khaijudipesh@gmail.com</p>
            <p>Phone: +977 9861488886</p>
          </div>
          <div className="mr-8 mb-4">
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/deepeshkhaiju?mibextid=kFxxJD" className="text-gray-300 hover:text-white"><span><FaFacebook size={22}/></span></a>
              <a href="https://www.linkedin.com/in/dipesh-khaiju-385b63243" className="text-gray-300 hover:text-white"><span><FaLinkedin size={22} /></span></a>
              <a href="https://instagram.com/khai_dipesh" className="text-gray-300 hover:text-white"><span><FaInstagram size={22}/></span></a>
              <a href="https://github.com/Dipesh-khaiju" className="text-gray-300 hover:text-white"><span><FaGithub size={22} /></span></a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Legal</h2>
            <div>
              <a href="#" className="text-gray-300 hover:text-white block">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white block">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-600 my-8" />
      <p className="text-center text-sm text-gray-400">&copy; 2024 HamrooShop. All Rights Reserved.</p>
    </footer>

      </div>
    </>
  )
}

export default Footer