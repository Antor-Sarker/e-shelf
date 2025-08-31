"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function placeOrder(orderData) {
  const cookieStore = await cookies();
  const token = await cookieStore.get("token");

  if (token) {
    const userId = await verify(token?.value, process.env.JWT_SECRET)?.userId;
    if (userId) {
      const res = await fetch(`${process.env.BASE_URL}/api/dashboard/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      return result?.isInserted;
    }
  } else return false;
}