import clientPromise from "../../../../../lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db.collection("products").find({}).toArray();
    const categories = await db.collection("category").find({}).toArray();

    //add stock for every category
    const results = await categories.map((item) => {
      return {
        ...item,
        stock: books.filter((book) => book.category === item.name).length,
      };
    });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch category" }), {
      status: 500,
    });
  }
}