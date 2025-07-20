import clientPromise from "../../../../../../lib/mongodb.js";

export async function GET(request, { params }) {
  try {
    const { name } = await params;
    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db
      .collection("products")
      .find({ publication: { $regex: name, $options: "i" } })
      .toArray();

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