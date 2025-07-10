import axios from "axios";
import toast from "react-hot-toast";

const OrderDone = ({ cart, validateForm, onSuccess }) => {
  // calculate total
  const getTotal = () => {
    const anb = cart.reduce((total, cartReduceItem) => {
      return total + cartReduceItem.price * cartReduceItem.quantity;
    }, 0);
    return anb;
  };

  const handleEsewaPayment = async (e) => {
    // Prevent default button behavior
    e.preventDefault();
    
    // First validate the form
    const isFormValid = validateForm();
    
    // Only proceed with payment if form validation passed
    if (isFormValid) {
      const url = "https://khaijushop-server.onrender.com/api/createOrder";
      const data = {
        amount: getTotal() + 10,
        products: [{
          product: "test",
          amount: getTotal() + 10,
          quantity: 1
        }]
      };
      
      try {
        const response = await axios.post(url, data);
        console.log(response?.data?.formData);
        if (response?.status === 200) {
          onSuccess();
          esewaCall(response?.data?.formData);
        } else {
          console.error("Failed to create order");
          toast.error("Failed to create order");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error processing payment");
      }
    } else {
      // Show a more descriptive error message
      toast.error("All fields must be filled correctly before proceeding");
      // Prevent form submission
      return false;
    }
  };

  const esewaCall = (formData) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button
      className="bg-[#60bb46] hover:bg-[#53a63e] font-semibold py-3 text-sm text-white uppercase w-full flex justify-center items-center"
      onClick={handleEsewaPayment}
      type="button" // Explicitly set as button to avoid accidental form submission
    >
      PAY WITH <img className="w-5 h-5 mx-1" src="https://th.bing.com/th/id/OIP.ntWij_8IZKqCcXwHeegmaQAAAA?rs=1&pid=ImgDetMain" alt="eSewa" /> SEWA
    </button>
  );
};

export default OrderDone;