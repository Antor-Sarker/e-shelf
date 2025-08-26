"use server";

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function detailsBook(id, type, isFavorite = false) {
  try {
    let url = "";
    let userId = null;
    const cookieStore = await cookies();
    const token = await cookieStore?.get("token");

    if (token) {
      const result = await verify(token?.value, process.env.JWT_SECRET);
      url =
        await `${process.env.BASE_URL}/api/books/${id}?userId=${result.userId}`;
      userId = await result?.userId;
    } else url = await `${process.env.BASE_URL}/api/books/${id}`;

    if (type === "get") {
      const res = await fetch(url, {
        cache: "no-cache",
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("API error:", err);
        return;
      }
      const books = await res.json();
      return books;
    } else {
      const updatedBook = await fetch(
        `${process.env.BASE_URL}/api/books/favorite/${id}?userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite: isFavorite }),
        }
      );

      if (!updatedBook.ok) {
        const err = await updatedBook.text();
        console.error("API error:", err);
        return;
      }
      const data = await updatedBook.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
