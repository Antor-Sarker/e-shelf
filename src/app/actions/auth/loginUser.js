"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signJWT } from "../../../../lib/auth";

export async function loginUser(formData) {
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const user = await res?.json();

  if (res.ok) {
    const token = await signJWT(user);

    const cookiesStorage = await cookies()
    cookiesStorage?.set("token", token, {
      httpOnly: true,
      secure: "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    });

    redirect("/dashboard");
  } else return { error: "invalid credentials!" };
}
