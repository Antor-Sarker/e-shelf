"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "./actions/fetchBooks";
import Book from "./components/books/book";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async function () {
      const res = await fetchBooks(page);
      setData(res);
    })();
  }, [page]);

  function handelPage(type) {
    if (type === "next" && page < Math.ceil(data?.total / 16)) {
      setPage((prev) => prev + 1);
    }
    if (type === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  return (
    <div className="mt-6 mx-4">
      {/* books */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {data?.books?.map((book) => (
          <Book key={book._id} info={book} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center py-8 mb-10 w-full text-red-400">
        {page > 1 && (
          <button
            className="shadow mx-1 px-4 border-2 rounded cursor-pointer hover:bg-red-400 hover:text-white"
            onClick={() => handelPage("prev")}
          >{`<`}</button>
        )}

        {...[...Array(Math.ceil((data?.total ?? 15) / 16))]?.map(
          (item, index) => {
            return (
              <button
                key={crypto.randomUUID()}
                className={`*:shadow mx-1 px-4 rounded shadow text-red-400 cursor-pointer hover:bg-red-400 hover:text-white ${
                  page === index + 1 && "text-white bg-red-400"
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            );
          }
        )}

        {page < Math.ceil((data?.total ?? 15) / 16) && (
          <button
            className="shadow mx-1 px-4  border-2 rounded cursor-pointer hover:bg-red-400 hover:text-white"
            onClick={() => handelPage("next")}
          >{`>`}</button>
        )}
      </div>
    </div>
  );
}
