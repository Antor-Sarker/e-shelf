"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logOut() {
  const cookiesStorage = await cookies();
  cookiesStorage?.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  redirect("/auth/login");
}