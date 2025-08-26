"use client";
import {
  CircleStackIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userData from "../actions/auth/userData";
import { useUser } from "../context/user/userContext";

export default function Dashboard() {
  const { userId, setUserId } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const data = await userData(userId);
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div className="text-gray-500">
      <div className="">
        <div className="flex justify-center space-y-2">
          <UserCircleIcon className="size-7" />
          <div className="text-xl">{userDetails?.fullName}</div>
        </div>
        <div className="flex justify-center">email: {userDetails?.email}</div>
      </div>

      <div className="flex justify-center mt-3">
        <div
          className="bg-sky-200 m-2 p-3 rounded flex space-x-2 hover:bg-sky-300 cursor-pointer transition-transform hover:scale-105 duration-150"
          onClick={() => router.push("/dashboard/orders")}
        >
          <CircleStackIcon className="size-6 px-0.5" />
          Order {userDetails?.orderCount}
        </div>
        <div
          className="bg-green-200 m-2 p-3 rounded flex space-x-2 hover:bg-green-300 cursor-pointer transition-transform hover:scale-105 duration-150"
          onClick={() => router.push("/dashboard/favorites")}
        >
          {" "}
          <HeartIcon className="size-6 px-0.5" />
          wish List {userDetails?.favouriteCount}
        </div>
      </div>
    </div>
  );
}
