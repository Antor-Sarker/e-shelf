"use client";
import { useEffect } from "react";
import checkUser from "../actions/auth/checkUser";
import { useUser } from "../context/user/userContext";

export default function Dashboard() {
  const { userId, setUserId } = useUser();

  useEffect(() => {
    (async function () {
      try {
        const data = await checkUser();
        setUserId(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setUserId]);

  return (
    <div className="text-red-500 text-center p-12 text-xl">
      welcome to dashboard
    </div>
  );
}
