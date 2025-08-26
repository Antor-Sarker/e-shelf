import { ObjectId } from "mongodb";
import clientPromise from "../../../../../../lib/mongodb";

export async function PATCH(request, { params }) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const { id: bookId } = await params;
    const userId = await searchParams.get("userId");
    const { isFavorite } = await request.json();

    const client = await clientPromise;
    const userDB = await client.db(process.env.USERS_DB);
    const usersData = await userDB.collection("users");
    const booksDB = await client.db(process.env.BOOKS_DB);
    const book = await booksDB
      .collection("products")
      .findOne({ _id: new ObjectId(bookId) });

    if (isFavorite === true) {
      const result = await usersData?.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { wishListBooksId: bookId } }
      );
      if (result.acknowledged) {
        return new Response(
          JSON.stringify({
            ...book,
            isFavorite: true,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      const result = await usersData.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { wishListBooksId: bookId } }
      );

      if (result.acknowledged) {
        return new Response(
          JSON.stringify({
            ...book,
            isFavorite: false,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch book" }), {
      status: 500,
    });
  }
}
