"use server";

export async function searchBooks(param) {
  const res = await fetch(`http://localhost:3000/api/books?title=${param}`);
  const books = await res.json()
  return books;
}
