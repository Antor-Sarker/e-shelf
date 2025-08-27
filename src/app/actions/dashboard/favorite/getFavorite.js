"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getFavorite() {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore?.get("token");
    let userId = null;

    if (token) {
      userId = await verify(token?.value, process.env.JWT_SECRET).userId;
    } else return [];

    const res = await fetch(
      `${process.env.BASE_URL}/api/dashboard/favorite?userId=${userId}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch favorites: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
    
  } catch (error) {
    console.log(error);
    return [];
  }
}
