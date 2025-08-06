"use client";
import { loginUser } from "@/app/actions/auth/loginUser";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [response, setResponse] = useState(null);

  async function handelLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await loginUser(formData);

    event.target.email.value = "";
    event.target.password.value = "";

    setResponse(res);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handelLogin}>
          <h2 className="text-red-700 text-center text-xl">
            {response?.error}
          </h2>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-600 font-medium text-sm"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-600 font-medium text-sm"
            >
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white w-full py-2 rounded-lg cursor-pointer"
          >
            Login
          </button>
          <div className="text-center py-3">
            Don&apos;t have an account?{" "}
            <span className="text-blue-700 hover:text-red-900 cursor-pointer">
              <Link href="/auth/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
