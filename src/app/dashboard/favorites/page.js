"use client";
import { getFavorite } from "@/app/actions/dashboard/favorite/getFavorite";
import { removeFavorite } from "@/app/actions/dashboard/favorite/removeFavorite";
import EmptyFavorite from "@/app/components/dashboard/emptyFavorite";
import { useUser } from "@/app/context/user/userContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [books, setBooks] = useState([]);
  const { userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getFavorite(userId);
      setBooks(res);
    })();
  }, [userId]);

  async function handelRemove(bookId) {
    const isRemove = await removeFavorite(bookId);

    if (isRemove) {
      const updatedBooks = await books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    }
  }

  return (
    <div>
      {" "}
      {books?.length === 0 ? (
        <EmptyFavorite />
      ) : (
        <div className="p-4 text-gray-600">
          <p className="mb-4 font-semibold text-gray-500">
            Total: {books?.length}
          </p>

          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="flex items-center bg-white rounded-xl shadow-lg shadow-gray-400"
              >
                {/* Cover image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover rounded-xl p-2"
                  />
                </div>

                {/* Info section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 gap-4">
                  <div>
                    <h3 className=" font-semibold">{book.title}</h3>
                    <p className="my-2 text-sm text-gray-500 font-medium">
                      Price: {book.price} Tk
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-2 py-2 bg-green-400 text-gray-50 rounded-xl hover:bg-green-500 transition cursor-pointer"
                      onClick={() => router.push(`/${book._id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="px-2 py-2 bg-red-400 text-gray-50 rounded-xl hover:bg-red-500 transition cursor-pointer"
                      onClick={() => handelRemove(book._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
