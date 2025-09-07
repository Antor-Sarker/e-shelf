"use client";
import {
  ArchiveBoxXMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RecentlyViewed() {
  const [books, setBooks] = useState([]);
  const coverRef = useRef(null);
  const router = useRouter();
  const scrollAmount = 200;

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem("recentlyViewed")));

    const timeoutId = setTimeout(() => {
      if (timeoutId) clearTimeout(timeoutId);

      if (coverRef.current) {
        coverRef.current.scrollTo({
          right: coverRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  function handelScroll(type) {
    if (coverRef.current) {
      coverRef.current.scrollBy({
        left: type === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="w-full bg-gray-50 py-6 mt-6 rounded-t-2xl shadow-inner">
      <h2 className="text-center text-blue-900 font-semibold text-lg mb-4">
        Recently Viewed ({books?.length || 0})
      </h2>

      <div className="relative max-w-6xl mx-auto px-4">
        {!books?.length ? (
          <div className="flex flex-col items-center text-gray-500 py-6">
            <ArchiveBoxXMarkIcon className="text-red-500 w-10 h-10 mb-2" />
            <p className="text-sm">No recently viewed books</p>
          </div>
        ) : (
          <div className="relative">
            {/* Scroll buttons */}
            <button
              onClick={() => handelScroll("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-red-500 shadow-md rounded-full p-2 z-10 animate-pulse hover:animate-none"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
            </button>

            <div
              ref={coverRef}
              className="flex overflow-x-auto scroll-smooth gap-3 p-2 scrollbar-hide"
            >
              {books.map((book) => (
                <div
                  key={book?._id}
                  className="flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-48"
                >
                  {book?.cover && (
                    <Image
                      src={book?.cover}
                      width={200}
                      height={280}
                      alt="book-cover"
                      className="rounded-xl shadow-md cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
                      onClick={() => router.push(`/${book?._id}`)}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => handelScroll("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-red-500 shadow-md rounded-full p-2 z-10 animate-pulse hover:animate-none"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
