"use client";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { detailsBook } from "../actions/detailsBook";
import { useCart } from "../context/cart/cartContext";
import { useUser } from "../context/user/userContext";

export default function Details() {
  const [book, setBook] = useState(null);
  const [isExist, setIsExist] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { cartData, setCartData } = useCart();
  const { userId } = useUser();

  useEffect(() => {
    (async function () {
      const data = await detailsBook(params.id, "get");
      setBook(data);

      //Recently view on footer
      if (!localStorage.getItem("recentlyViewed")) {
        localStorage.setItem(
          "recentlyViewed",
          JSON.stringify([{ bookId: data?._id, bookCover: data?.cover }])
        );
      } else {
        const localData = JSON.parse(localStorage.getItem("recentlyViewed"));
        const withoutExistedData = localData.filter(
          (item) => item.bookId != data?._id
        );
        const newData = [
          ...withoutExistedData,

          { bookId: data?._id, bookCover: data?.cover },
        ];
        localStorage.setItem("recentlyViewed", JSON.stringify(newData));
      }

      //check for cart existing data
      if (cartData?.some((item) => item.id === book?._id)) {
        setIsExist(true);
      }
    })();
  }, [book?._id, cartData, params?.id]);

  function handelAddtoCart() {
    //navigate Cart Page
    if (isExist) {
      router.push("/cart");
    } else {
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
  }

  async function handelFavorite() {
    if (!userId) {
      toast.error("Login required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      const bookData = await detailsBook(
        params?.id,
        "update",
        !book.isFavorite
      );
      setBook(bookData);
      if (bookData.isFavorite)
        toast.success("Added to favorites", {
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
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          {book?.cover && (
            <Image
              src={book?.cover || null}
              width={400}
              height={600}
              className="rounded-xl shadow-lg w-full object-cover"
              alt="cover"
            />
          )}
        </div>

        {/* book info */}
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-3xl font-bold text-gray-900">{book?.title}</h1>
          <h2 className="text-lg text-blue-950"> by {book?.author}</h2>
          <p className="text-xl text-green-600 font-semibold">৳{book?.price}</p>
          <p className="text-blue-900 text-base">
            copies avilable: {book?.inStock}
          </p>
          <p className="text-gray-800">{book?.details}</p>
          <div className="flex space-x-4 mt-6">
            <button
              className={`flex items-center gap-2 text-white ${
                isExist === true
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-green-500 hover:bg-green-700"
              } px-7 py-2 rounded-lg shadow cursor-pointer`}
              onClick={() => handelAddtoCart}
            >
              <ShoppingCartIcon className="w-5 h-5 animate-bounce hover:animate-none" />
              {isExist ? "Go to Cart" : "Add to Cart"}
            </button>
            <div className="border border-red-400 rounded-full p-2 transition-transform duration-500 ease-in-out hover:scale-110 animate-pulse cursor-pointer">
              <button
                className="flex items-center hover:text-red-600 cursor-pointer"
                onClick={handelFavorite}
              >
                {book?.isFavorite === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 text-red-500"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <HeartIcon className="size-8 text-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
