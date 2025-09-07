"use client";
import { useCart } from "@/app/context/cart/cartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function Book({ info, cartData }) {
  const [isAddedTocart, setIsAddedToCart] = useState(false);
  const { _id, title, cover, price, author, inStock } = info;
  const router = useRouter();
  const { setCartData } = useCart();

  useEffect(() => {
    setIsAddedToCart(cartData?.some((item) => item.id === info._id));
  }, [cartData, info._id]);

  function handelDetails() {
    //store history at local storage
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));
    //store head for already exist data
    if (recentlyViewed) {
      if (recentlyViewed.some((item) => item._id)) {
        const updatedHistory = recentlyViewed.filter(
          (item) => item._id !== _id
        );
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify([{ _id, cover }, ...updatedHistory])
        );
      } else {
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify([{ _id, cover }, ...recentlyViewed])
        );
      }
    } else {
      localStorage.setItem("recentlyViewed", JSON.stringify([{ _id, cover }]));
    }
    // navigate details page
    router.push(`/${_id}`);
  }

  // add to cart with local storage
  function handelAddtoCart(e) {
    e.stopPropagation();

    if (localStorage.getItem("cartData")) {
      const existingData = JSON.parse(localStorage.getItem("cartData"));

      // if item not exist
      if (!existingData?.some((item) => item.id === _id)) {
        const data = {
          id: _id,
          title,
          cover,
          price,
          quantity: 1,
          totalPrice: price,
          isSelected: true,
        };
        const newData = [...existingData, data];

        //update cart
        localStorage.setItem("cartData", JSON.stringify(newData));
        setCartData(newData);
        setIsAddedToCart(true);
      }
    } else {
      const data = {
        id: _id,
        title,
        cover,
        price,
        quantity: 1,
        totalPrice: price,
        isSelected: true,
      };

      //insert to localStorage
      localStorage.setItem("cartData", JSON.stringify([data]));
      setCartData([data]);
    }
    setIsAddedToCart(true);

    // success message
    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition duration-300 hover:shadow-lg hover:scale-[1.02] w-full sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto cursor-pointer"
      onClick={handelDetails}
    >
      {/* Image Section */}
      <div className="relative w-full h-52">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover border-b border-gray-200"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-grow text-center">
        <h3 className="text-base font-semibold text-emerald-900 line-clamp-1 mb-1">
          {title}
        </h3>
        <h4 className="text-sm text-blue-950 line-clamp-1">by {author}</h4>

        <p className="text-base font-bold text-[#05966e] mt-2">৳ {price}</p>

        <button
          disabled={isAddedTocart}
          className={`mt-auto w-full ${
            isAddedTocart
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#059669] hover:bg-[#2e6554]"
          }  text-white py-2 rounded-lg transition duration-200`}
          onClick={(e) => handelAddtoCart(e)}
        >
          {isAddedTocart ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
