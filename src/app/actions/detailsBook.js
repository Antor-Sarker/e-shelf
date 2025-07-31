"use server";

export async function detailsBook(id) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/books/${id}`, {
      cache: "force-cache",
      next: { revalidate: 300 },
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
