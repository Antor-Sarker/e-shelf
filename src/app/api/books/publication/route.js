import clientPromise from "../../../../../lib/mongodb.js";
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = await client.db(process.env.BOOKS_DB);
    const books = await db.collection("products").find({}).toArray();
    const publications = await db.collection("publications").find({}).toArray();

    //add stock for every publication
    const results = await publications.map((publication) => {
      return {
        ...publication,
        stock: books.filter((book) => book.publication === publication.name)
          .length,
      };
    });

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "failed to fetch publications" }),
      {
        status: 500,
      }
    );
  }
}
