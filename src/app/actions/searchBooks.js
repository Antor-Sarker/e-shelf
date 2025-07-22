"use server";

export async function searchBooks(param) {
  try {
    const res = await fetch(`http://localhost:3000/api/books?title=${param}`,{
      cache: "no-store"
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("API error:", err);
      return;
    }
    const books = await res.json();
    return books;
  } catch (error) {
    console.log(error);
  }
}
