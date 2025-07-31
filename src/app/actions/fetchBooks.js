"use server";
export async function fetchBooks(page) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/books?page=${page}&limit=16`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
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
