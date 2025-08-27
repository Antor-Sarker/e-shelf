import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export async function GET(request) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const userId = await searchParams?.get("userId");
    const client = await clientPromise;
    const userDB = await client.db(process.env.USERS_DB);
    const bookDB = await client.db(process.env.BOOKS_DB);

    const { wishListBooksId } = await userDB
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    const objectIds = await wishListBooksId.map((id) => new ObjectId(id));
    const results = await bookDB
      .collection("products")
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const searchParams = await request?.nextUrl?.searchParams;
    const userId = await searchParams?.get("userId");
    const bookId = await searchParams?.get("bookId");

    const client = await clientPromise;
    const userDB = await client.db(process.env.USERS_DB);
    const bookDB = await client.db(process.env.BOOKS_DB);

    const result = await userDB
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { wishListBooksId: bookId } }
      );

    if (result?.modifiedCount > 0) {
      return new Response(JSON.stringify(true), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(false), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(true), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
