import clientPromise from "../../../../../lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db.collection("products").find({}).toArray();
    const authors = await db.collection("authors").find({}).toArray();

    //add stock for every author
    const results = await authors.map((author) => {
      return {
        ...author,
        stock: books.filter((book) => book.author === author.name).length,
      };
    });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch authors" }), {
      status: 500,
    });
  }
}