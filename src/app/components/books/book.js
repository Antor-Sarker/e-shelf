import Image from "next/image";

export default function Book({ info }) {
  const { _id, title, cover, price, author, inStock } = info;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 w-full cursor-pointer">
      <div className="relative w-96 sm:w-full lg:w-full xl:w-full 2xl:w-full h-72">
        <Image
          src={cover}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="border-b border-gray-200"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow text-center">
        <h3 className="text-sm font-semibold text-emerald-900 mb-2">{title}</h3>
        <h4 className="text-sm text-blue-950">by {author}</h4>

        <div>
          <p className="text-sm font-bold text-[#05966e] mb-4">৳ {price}</p>
        </div>

        <button className="mt-auto bg-[#059669] text-white py-1 px-4 rounded-md hover:bg-[#2e6554] transition duration-200 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
