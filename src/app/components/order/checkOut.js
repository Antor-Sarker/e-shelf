"use client";
import { useState } from "react";

export default function CheckOut({ setIsOpenModal, handelPlaceOrder }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  function handelOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();
    handelPlaceOrder(formData);
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center top-16">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl shadow-lg p-6 relative overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute text-xl top-3 right-5 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsOpenModal(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Checkout</h2>

        <form className="space-y-4" onSubmit={handelSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
              placeholder="Enter your full name"
              onChange={handelOnChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="number"
              name="phone"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
              placeholder="e.g. 017XXXXXXXX"
              onChange={handelOnChange}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm mb-1">Delivery Address</label>
            <textarea
              name="address"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300 outline-none"
              rows="3"
              placeholder="Enter your delivery address"
              onChange={handelOnChange}
            />
          </div>

          {/* Cash on delivery */}
          <div className="flex items-center space-x-2">
            <input type="radio" id="cd" name="payment" defaultChecked />
            <label htmlFor="cd" className="text-sm">
              Cash on Delivery
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition cursor-pointer"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
