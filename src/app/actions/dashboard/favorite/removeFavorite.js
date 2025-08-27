"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function removeFavorite(bookId) {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore?.get("token");
    let userId = null;

    if (token) {
      userId = await verify(token?.value, process.env.JWT_SECRET)?.userId;
    } else return [];

    const res = await fetch(
      `${process.env.BASE_URL}/api/dashboard/favorite?userId=${userId}&bookId=${bookId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch favorites: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
