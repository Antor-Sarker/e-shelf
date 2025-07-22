"use server";
export async function fetchBooks(page) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/books?page=${page}&limit=16`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const err = await res.text();
      console.error("api error:", err);
      return;
    }

    const books = await res.json();
    return books;
  } catch (error) {
    console.log(error);
  }
}
