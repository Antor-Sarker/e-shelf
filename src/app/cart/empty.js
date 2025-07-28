import Link from "next/link";
import { useCart } from "../context/cart/cartContext";

export function Empty() {
  const { cartData } = useCart();
  return (
    <div className="text-center w-screen py-32">
      <h2 className="text-3xl text-red-400">Your Cart is Empty!</h2>
      <p className="text-base py-8 text-gray-700">
        Looks like you haven&apos;t made order yet.
      </p>
      <Link href="/">
        <p className="text-blue-600 font-bold">Continue to Shopping</p>
      </Link>
    </div>
  );
}
