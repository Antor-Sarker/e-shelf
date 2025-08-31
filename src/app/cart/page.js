"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Empty } from "../components/cart/empty";
import { useCart } from "../context/cart/cartContext";
import { useUser } from "../context/user/userContext";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import CheckOut from "../components/order/checkOut";
import { placeOrder } from "../actions/dashboard/order/placeOrder";

export default function Cart() {
  const [isOpenModal,setIsOpenModal] = useState(false)
  const { cartData, setCartData } = useCart();
  const {userId} = useUser()
  const router = useRouter();

  // count total selected
  const selectedCount = cartData?.filter((item) => item.isSelected).length;

  //count subTotal
  const subTotal = cartData?.reduce((prev, curr) => {
    if (curr.isSelected) {
      return prev + curr.totalPrice;
    } else {
      return prev + 0;
    }
  }, 0);

  function handelSelect(id) {
    const updateCart = cartData.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return item;
      }
    });

    localStorage.setItem("cartData", JSON.stringify(updateCart));
    setCartData(updateCart);
  }

  function handelQuantity(type, id) {
    const updateCart = cartData.map((item) => {
      if (item.id === id) {
        if (type === "+")
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.price * (item.quantity + 1),
          };
        else
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            totalPrice:
              item.price *
              (item.quantity > 1 ? item.quantity - 1 : item.quantity),
          };
      } else {
        return item;
      }
    });

    localStorage.setItem("cartData", JSON.stringify(updateCart));
    setCartData(updateCart);
  }

  function handelDelete(id) {
    const updatedData = cartData.filter((item) => item.id !== id);
    setCartData(updatedData);
    localStorage.setItem("cartData", JSON.stringify(updatedData));
  }

  function handelCheckOut(){
    if(userId){
      setIsOpenModal(true)
    }
    else{
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
      router.push("/auth/login")
    }
  }

  async function handelPlaceOrder(userInfo){
    const orderBooks=await cartData.filter(item=>item.isSelected===true)
    
    if(orderBooks?.length===0){
      toast.error("please select minimum one book", {
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
      setIsOpenModal(false)
    }
    else{
      const orderData = {
        userId,
      books: orderBooks,client:{
        ...userInfo
      }, orderTime: new Date(),status:"pending"
    }

    const res = await placeOrder(orderData)
      
      if(res){
        setIsOpenModal(false)
        setCartData([])
        localStorage.removeItem("cartData")
        router.push('/dashboard/orders')

        toast.success("Order placed successfully!", {
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
  }

  return (
    <div>
      {isOpenModal && <CheckOut setIsOpenModal={setIsOpenModal} handelPlaceOrder={handelPlaceOrder}/>}
      {cartData?.length ? (
        <div className="w-screen h-screen bg-[#f1f2f4] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 p-5">
          <div className="col-span-9 px-5 space-y-3 mt-5">
            <div className="bg-white flex justify-between border-1 p-4 border-gray-200 rounded">
              <div>
                Select ({selectedCount} {selectedCount === 1 ? "Item" : "Items"}
                )
              </div>
              <div>Total: {subTotal} TK.</div>
            </div>

            {cartData?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="bg-white grid grid-cols grid-cols-12 border-1 border-gray-200 rounded text-gray-600 p-3"
                >
                  <div className="flex col-span-8">
                    <input
                      type="checkbox"
                      name="select"
                      className="mx-2"
                      checked={item?.isSelected}
                      onChange={() => handelSelect(item?.id)}
                    />
                    <Image
                      src={item?.cover}
                      width={50}
                      height={70}
                      alt="cover"
                      className="rounded cursor-pointer"
                      onClick={() => router?.push(`/${item?.id}`)}
                    />
                    <div className="flex flex-col space-y-3 px-4">
                      <p>{item?.title}</p>
                      <TrashIcon
                        className="w-6 h-5 text-red-400 hover:text-red-600 cursor-pointer"
                        onClick={() => handelDelete(item?.id)}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex mt-4">
                      <button
                        className="bg-gray-100 hover:bg-gray-300 border border-gray-300 w-7 h-7 text-center cursor-pointer"
                        onClick={() => handelQuantity("-", item?.id)}
                        disabled={item?.quantity === 1 ? true : false}
                      >
                        -
                      </button>
                      <div className="border border-gray-300 w-7 h-7 text-center">
                        {item?.quantity}
                      </div>
                      <button
                        className="bg-gray-100 hover:bg-gray-300 border border-gray-300 w-7 h-7 text-center cursor-pointer"
                        onClick={() => handelQuantity("+", item?.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-end mt-4">
                    {item?.totalPrice} TK.
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-12/12 sm:h-12/12 md:h-12/12 lg:h-7/12 xl:h-7/12 2xl:7/12 col-span-3 mt-5">
            <div className="rounded space-y-4 text-gray-600 bg-white p-3">
              <div className="text-xl border-b border-gray-300">
                Checkout Summary
              </div>
              <div className="flex justify-between border-b border-gray-300 border-dashed">
                <div>Subtotal</div>
                <div>{subTotal} Tk.</div>
              </div>
              <div className="flex justify-between border-b border-gray-300 border-dashed">
                <div>Online Fee</div>
                <div>{selectedCount === 0 ? 0 : 50} Tk.</div>
              </div>
              <div className="flex justify-between border-b border-gray-300 border-dashed">
                <div>Total</div>
                <div>{subTotal + (selectedCount === 0 ? 0 : 50)} Tk.</div>
              </div>

              <div className="flex justify-between border-b border-gray-300 border-dashed font-bold">
                <div>Total Payable</div>
                <div>{subTotal + (selectedCount === 0 ? 0 : 50)} Tk.</div>
              </div>
              <div className=" bottom-0 p-2 text-center rounded w-full text-white">
                <button className="bg-green-400 hover:bg-green-500 w-full p-3 rounded cursor-pointer font-bold" onClick={handelCheckOut}>
                  Proceed to order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
