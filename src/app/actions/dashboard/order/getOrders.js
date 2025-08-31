"use server";

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getOrders() {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    if (token) {
      const userId = await verify(token?.value, process.env.JWT_SECRET)?.userId;
      if (userId) {
        const res = await fetch(
          `${process.env.BASE_URL}/api/dashboard/order?userId=${userId}`
        );

        const data = await res.json();
        return data;
      }
    } else return null;
  } catch (error) {
    console.log(error);
  }
}
