"use client";
import { useCart } from "@/app/context/cart/cartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Book({ info }) {
  const { _id, title, cover, price, author, inStock } = info;
  const router = useRouter();
  const { setCartData } = useCart();

  function handelDetails() {
    router.push(`/${_id}`);
  }
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
          className="mt-auto w-full bg-[#059669] text-white py-2 rounded-lg hover:bg-[#2e6554] transition duration-200"
          onClick={(e) => handelAddtoCart(e)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
