import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Book({ info }) {
  const { _id, title, cover, price, author, inStock } = info;

  return (
    <div className="rounded-sm p-0 m-3 bg-[#edf7f1] shawow shadow-black shadow-md">
      <div className="relative">
        <div className="overflow-hidden">
          <Image
            className="rounded-sm cursor-pointer transition-transform duration-300 hover:scale-105"
            src={cover}
            alt="cover"
            width={285}
            height={50}
          />
        </div>
        <div className="absolute top-0 bg-[#16a34a] text-gray-100 px-2 rounded-br-sm">
          in stock
        </div>
      </div>
      <div className="w-full h-32 relative">
        <h2 className="text-emerald-900 text-xl font-light px-2">{title}</h2>
        <div className="absolute bottom-7">
          <h3 className=" text-sm text-blue-950 px-3">by {author}</h3>
          <h3 className="text-base text-[#05966e] font-bold text-center">
            ৳{price} Tk
          </h3>
        </div>

        <button className="flex justify-center text-center gap-2 py-0.5 cursor-pointer w-full text-white rounded-sm bg-[#059669] hover:bg-[#225f4c] hover:bold absolute bottom-0">
          <ShoppingCartIcon className="size-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
