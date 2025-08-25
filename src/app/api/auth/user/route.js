import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export async function GET(request) {
  const searchParams = await request.nextUrl.searchParams;
  const userId = await searchParams.get("id");

  try {
    const client = await clientPromise;
    const db = await client.db(process.env.USERS_DB);
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userData = {
      id: user?._id,
      email: user?.email,
      fullName: user?.fullName,
      role: user?.role,
      orderCount: user?.ordersId?.length,
      favouriteCount: user?.wishListBooksId.length,
    };

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "failed to fetch user" }), {
      status: 500,
    });
  }
}
