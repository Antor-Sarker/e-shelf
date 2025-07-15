"use client";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const pathName = usePathname();

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
              {isOpen ? (
                <XMarkIcon
                  className="text-black size-6"
                  onClick={() => setIsOpen(!isOpen)}
                />
              ) : (
                <Bars3Icon
                  className="text-black size-6"
                  onClick={() => setIsOpen(!isOpen)}
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
                name=""
                id=""
                placeholder="Search book..."
                className="w-5/6 border-1 border-gray-300 rounded-sm focus:outline-green-600 focus:outline py-0.5 px-6"
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
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
            isOpen ? "visible" : "hidden"
          } sm:visible md:hidden lg:hidden xl:hidden 2xl:hidden bg-white`}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute top-1 left-1 text-gray-400 size-5" />
            <input
              type="text"
              name=""
              id=""
              placeholder="Search book..."
              className="w-6/6 border-1 border-gray-300 focus:border-green-400 rounded-sm focus:outline-green-600 focus:outline py-0.5 px-8 text-gray-800"
            />
          </div>

          <div className="mt-4 text-gray-700" onClick={() => setIsOpen(false)}>
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
        {/* <div className="absolute left-3/12 top-10/12 w-3/12 min-h-32 max-h-72 overflow-y-auto bg-amber-100 rounded"></div> */}
      </nav>
    </>
  );
}
