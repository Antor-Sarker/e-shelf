import clientPromise from "../../../../lib/mongodb";

export async function GET(request) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const query = await searchParams.get("title");
    const search = (await query)
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db.collection("products").find(search).toArray();

    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch books" }), {
      status: 500,
    });
  }
}
