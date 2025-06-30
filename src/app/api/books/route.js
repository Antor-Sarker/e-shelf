import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.BOOKS_DB);

    const books = await db.collection("products").find({}).toArray();
   
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
