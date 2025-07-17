"use client";
import { searchBooks } from "@/app/actions/searchBooks";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [onFocus, setOnFocus] = useState(false);
  const [input, setInput] = useState('');
  const [debounceInput, setDebounceInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const pathName = usePathname();

  //debouncing for search books
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceInput(input);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [input]);

  //search books
  useEffect(() => {
    if (!debounceInput.trim()) return;
    (async function () {
      const result = await searchBooks(debounceInput);
      setSearchResult(result);
    })();
  }, [debounceInput]);

  return (
    <>
      <nav className="w-full h-16 fixed z-10 bg-white shadow-lg">
        {/* big screen  */}
        <div className="flex justify-between px-4 relative top-4/12">
          <div className="flex">
            <div
              className={
                "visible sm:visible md:hidden lg:hidden xl:hidden 2xl:hidden cursor-pointer"
              }
            >
              {isOpenMenu ? (
                <XMarkIcon
                  className="text-black size-6"
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                />
              ) : (
                <Bars3Icon
                  className="text-black size-6"
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                />
              )}
            </div>

            <Link href="/">
              <div className="text-green-400 text-xl font-extrabold cursor-pointer ml-4 sm:ml-4 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0">
                {" "}
                <span className="text-gray-400">E-</span>Shelf
              </div>
            </Link>
          </div>

          <div className="hidden sm:hidden md:flex lg:flex">
            {/* search  */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute top-1 left-0.5 text-gray-400 size-5" />
              <input
                type="text"
                name="search"
                value={input}
                placeholder="Search book..."
                className="w-5/6 border-1 border-gray-300 rounded-sm focus:outline-green-600 focus:outline py-0.5 px-6"
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* nav link  */}
            <div className="flex text-gray-700">
              <div className="">
                <Link
                  href="/"
                  className={`hover:text-green-600 underline-offset-8 decoration-4 decoration-green-400 ${
                    pathName === "/" && !onFocus
                      ? "text-green-600 underline"
                      : ""
                  }`}
                >
                  Home
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/category"
                  className={`hover:text-green-600 underline-offset-8 decoration-4 decoration-green-400 ${
                    pathName === "/category" ? "text-green-600 underline" : ""
                  }`}
                >
                  Category
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/author"
                  className={`hover:text-green-600 underline-offset-8 decoration-4 decoration-green-400 ${
                    pathName === "/author" ? "text-green-600 underline" : ""
                  }`}
                >
                  Author
                </Link>
              </div>

              <div className="ml-4">
                <Link
                  href="/publications"
                  className={`hover:text-green-600 underline-offset-8 decoration-4 decoration-green-400 ${
                    pathName === "/publications"
                      ? "text-green-600 underline"
                      : ""
                  }`}
                >
                  Publications
                </Link>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="relative flex mx-2 border py-1 px-2 rounded border-gray-300">
              <ShoppingCartIcon className="size-5 text-gray-950" />
              <div className="bg-green-500 text-white rounded-full px-1.5 absolute -top-3.5 -right-0 text-sm">
                0
              </div>
            </div>
            <div className="mx-2 border py-1 px-2 rounded-xl border-gray-300 bg-green-400">
              <UserIcon className="text-white size-5" />
            </div>
          </div>
        </div>

        {/* when small screen */}
        <div
          className={`w-full px-4 absolute top-14 py-10 ${
            isOpenMenu ? "visible" : "hidden"
          } sm:visible md:hidden lg:hidden xl:hidden 2xl:hidden bg-white`}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute top-1 left-1 text-gray-400 size-5" />
            <input
              type="text"
              name="search"
              value={input}
              placeholder="Search book..."
              className="w-6/6 border-1 border-gray-300 focus:border-green-400 rounded-sm focus:outline-green-600 focus:outline py-0.5 px-8 text-gray-800"
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div
            className="mt-4 text-gray-700"
            onClick={() => setIsOpenMenu(false)}
          >
            <div
              className={`${
                pathName === "/" ? "bg-green-400 text-emerald-50" : ""
              } text-bold rounded my-2 px-1`}
            >
              <Link href="/">Home</Link>
            </div>

            <div
              className={`${
                pathName === "/category"
                  ? "bg-green-400 text-emerald-50"
                  : "not-only-of-type:"
              } text-bold rounded my-2 px-1`}
            >
              <Link href="/category" className="">
                Category
              </Link>
            </div>

            <div
              className={`${
                pathName === "/author"
                  ? "bg-green-400 text-emerald-50"
                  : "not-only-of-type:"
              } text-bold  rounded my-2 px-1`}
            >
              <Link href="/author" className="">
                Author
              </Link>
            </div>

            <div
              className={`${
                pathName === "/publications"
                  ? "bg-green-400 text-emerald-50"
                  : "not-only-of-type:"
              } text-bold  rounded my-2 px-1`}
            >
              <Link href="/publications" className="">
                Publications
              </Link>
            </div>
          </div>
        </div>

        {/* search result */}
        {input && (
          <div className="absolute left-0 md:left-1/12 lg:left-1/10 xl:left-2/9 2xl:left-2/9 top-32 sm:top-32 md:top-10/12 lg:top-10/12 xl:top-10/12 w-full sm:w-full md:w-4/12 lg:3/12 xl:w-3/12 min-h-32 max-h-96 sm:max-h-96 md:max-h-96 lg:max-h-80 xl:max-h-96 2xl:max-h-96 overflow-y-auto rounded bg-gray-50 p-3 shadow text-sm">
            <div className="flex justify-between">
              <div
                className={`${
                  searchResult?.length > 0
                    ? "text-green-700"
                    : "text-red-700 font-medium"
                } pb-3`}
              >
                {searchResult?.length > 0 ? searchResult?.length : "No"} books
                found
              </div>
              <XMarkIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setInput("")}
              />
            </div>
            {searchResult?.map((book) => {
              return (
                <div
                  key={book._id}
                  className="flex border border-gray-300 rounded p-1 mb-2 cursor-pointer"
                >
                  <div className="mr-2 w-1/6">
                    <Image
                      src={book.cover}
                      alt="cover"
                      width={250}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-blue-950">{book?.title}</p>
                    <p className="text-amber-950">{book?.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
