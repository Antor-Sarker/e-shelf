import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const book = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(book), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch book" }), {
      status: 500,
    });
  }
}
