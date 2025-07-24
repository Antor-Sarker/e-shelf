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
          left: coverRef.current.scrollWidth,
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
    <div className="">
      <h2 className="text-center text-blue-900">
        Recently Viewed: {books?.length ? books?.length : "0"}
      </h2>

      <div className="mx-3 mb-16 flex justify-center">
        {!books ? (
          <ArchiveBoxXMarkIcon className="text-red-500 w-6 h-6 mt-2" />
        ) : (
          <div className="flex justify-center w-12/12 sm:w-6/12 md:w-6/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12 h-auto">
            <button
              onClick={() => handelScroll("prev")}
              className="px-6 cursor-pointer hover:text-red-500"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div
              ref={coverRef}
              className="flex overflow-x-auto scroll-smooth gap-x-3 p-3 scrollbar-hide"
            >
              {books?.map((book) => {
                return (
                  <Image
                    key={book.bookId}
                    src={book?.bookCover}
                    width={280}
                    height={300}
                    alt="book-cover"
                    className="rounded-xl px-2 cursor-pointer"
                    onClick={() => router.push(`/${book?.bookId}`)}
                  />
                );
              })}
            </div>
            <button
              onClick={() => handelScroll("next")}
              className="px-6 cursor-pointer hover:text-red-500"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
