"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathName = usePathname();

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 p-3">
      <div className="mt-5 text-gray-500 space-y-4 flex sm:flex md:grid lg:grid xl:grid 2xl:grid col-span-2 justify-around">
        <div className={`${pathName === "/dashboard" && "text-green-500"}`}>
          {" "}
          <Link href="/dashboard">Profile</Link>
        </div>
        <div
          className={`${pathName === "/dashboard/orders" && "text-green-500"}`}
        >
          <Link href="/dashboard/orders">Orders</Link>
        </div>
        <div
          className={`${
            pathName === "/dashboard/favorites" && "text-green-500"
          }`}
        >
          <Link href="/dashboard/favorites">Favorites</Link>
        </div>
      </div>

      <div className="mt-5 col-span-10">{children}</div>
    </div>
  );
}
