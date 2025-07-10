import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderDone from "../Order/OrderDone";

const ModalSection = ({cart}) => {
  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setorderDetails] = useState({
    fullName: "",
    address: "",
    mobile: "",
  });
  // Add state for validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    mobile: "",
  });

  function onCloseModal() {
    setOpenModal(false);
    setorderDetails({
      fullName: "",
      address: "",
      mobile: "",
    });
    // Reset errors on close
    setErrors({
      fullName: "",
      address: "",
      mobile: "",
    });
  }

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.trim().length < 5) return "Please enter a complete address";
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile.trim()) return "Mobile number is required";
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) return "Please enter a valid 10-digit mobile number";
    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setorderDetails({
      ...orderDetails, [name]: value
    });
  };

  // Add a function to validate field on blur
  const handleBlur = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";
    
    // Validate the field that lost focus
    switch (name) {
      case "fullName":
        errorMessage = validateFullName(value);
        break;
      case "address":
        errorMessage = validateAddress(value);
        break;
      case "mobile":
        errorMessage = validateMobile(value);
        break;
      default:
        break;
    }
    
    // Update only that field's error
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };
  
  const validateForm = () => {
    // Validate all fields
    const fullNameError = validateFullName(orderDetails.fullName);
    const addressError = validateAddress(orderDetails.address);
    const mobileError = validateMobile(orderDetails.mobile);

    // Update error states
    setErrors({
      fullName: fullNameError,
      address: addressError,
      mobile: mobileError,
    });

    // Return true if no errors (all fields must be valid)
    return !fullNameError && !addressError && !mobileError;
  };

  return (
    <>
      <div>
        <Button
          className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          onClick={() => setOpenModal(true)}
        >
          Checkout
        </Button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <h1 className="mx-auto mb-6 text-xl">Please enter your details before paying.</h1>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fullname" value="Your Name" />
                </div>
                <TextInput
                  id="fullname"
                  name="fullName"
                  placeholder="Your Full Name"
                  value={orderDetails.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  color={errors.fullName ? "failure" : "gray"}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Address" value="Your Address" />
                </div>
                <TextInput
                  id="Address"
                  name="address"
                  placeholder="Your Full Address"
                  value={orderDetails.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  color={errors.address ? "failure" : "gray"}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="PNumber" value="Your Mobile Number" />
                </div>
                <TextInput
                  id="PNumber"
                  name="mobile"
                  placeholder="Your Number"
                  value={orderDetails.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  color={errors.mobile ? "failure" : "gray"}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
                )}
              </div>
              <div className="w-full">
                <OrderDone 
                  cart={cart} 
                  validateForm={validateForm}
                  onSuccess={() => {
                    toast.success("Order Completed");
                    onCloseModal();
                  }}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ModalSection;