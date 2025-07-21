import clientPromise from "../../../../lib/mongodb";
export async function GET(request) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const query = await searchParams.get("title");
    const page = await searchParams.get("page");
    const limit = await searchParams.get("limit");

    const search = (await query)
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db.collection("products").find(search).toArray();

    const results = await {
      total: books.length,
      books: books.slice(limit * (page - 1), limit * page),
    };

    return new Response(JSON.stringify(query ? books : results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch books" }), {
      status: 500,
    });
  }
}
