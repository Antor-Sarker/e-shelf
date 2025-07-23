import {
  HeartIcon as HeartSolid,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function details({ params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/books/${id}`);
  const book = await res.json();

  const {
    _id,
    title,
    cover,
    price,
    author,
    category,
    publication,
    inStock,
    details,
    review,
    wishList,
  } = await book;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <Image
            src={cover}
            width={400}
            height={600}
            alt={title}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* book info */}
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <h2 className="text-lg text-blue-950"> by {author}</h2>
          <p className="text-xl text-green-600 font-semibold">৳{price}</p>
          <p className="text-blue-900 text-base">copies avilable: {inStock}</p>
          <p className="text-gray-800">{details}</p>
          <div className="flex space-x-4 mt-6">
            <button className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 px-5 py-2 rounded-lg shadow cursor-pointer">
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="flex items-center hover:text-red-600 cursor-pointer">
              <HeartSolid className="w-8 h-8 text-red-500" />
              <span className="text-blue-950 hover:text-red-500">
                Add to wishlist
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}