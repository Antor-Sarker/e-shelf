"use client";
import signUp from "@/app/actions/auth/signUp";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [errorType, setErrorType] = useState("");

  async function handelSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("repeatPassword")) {
      setErrorType("password");
      event.currentTarget.password.value = "";
      event.currentTarget.repeatPassword.value = "";
      return;
    }

    const credentials = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await signUp(credentials);

    setErrorType(res)
    //empty field

  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handelSubmit}>
          <div>
            {errorType === "info" && (
              <h2 className="text-center text-red-500">This user already exists</h2>
            )}
            <label
              htmlFor="fullName"
              className="block mb-1 text-gray-600 font-medium text-sm"
            >
              full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
              required
            />
          </div>
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
            {errorType === "password" && (
              <h2 className="text-center text-red-500">
                password do not match!
              </h2>
            )}
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

          <div>
            <label
              htmlFor="repeatPassword"
              className="block mb-1 text-gray-600 font-medium text-sm"
            >
              repeat password
            </label>
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-400 text-white w-full py-2 rounded-lg cursor-pointer"
          >
            Sign Up
          </button>
          <div className="text-center py-3">
            Already have an account?{" "}
            <span className="text-blue-700 hover:text-red-900 cursor-pointer">
              <Link href="/auth/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
