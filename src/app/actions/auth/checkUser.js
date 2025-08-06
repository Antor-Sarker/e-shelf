"use server";

import { cookies } from "next/headers";

export default async function checkUser() {
  try {
    const cookiesStorage = await cookies()
    const token = await cookiesStorage?.get("token")?.value;
    const res = await fetch(`${process.env.BASE_URL}/api/auth/verifyToken`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const data = await res.json();
    return data?.userId;
  } catch (error) {
    return null;
  }
}
