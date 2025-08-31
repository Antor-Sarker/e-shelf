import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export async function POST(request) {
  try {
    const orderData = await request.json();

    const client = await clientPromise;
    const ordersDB = await client.db(process.env.ORDERS_DB);
    const userDB = await client.db(process.env.USERS_DB);

    const result = await ordersDB.collection("orders").insertOne(orderData);
    const usersData = await userDB.collection("users");

    if (result.insertedId) {
      const updateUser = await usersData?.updateOne(
        { _id: new ObjectId(orderData.userId) },
        { $push: { ordersId: result.insertedId } }
      );
      if (updateUser.modifiedCount === 1) {
        return new Response(JSON.stringify({ isInserted: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ isInserted: false }), {
          status: 209,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(JSON.stringify({ isInserted: false }), {
        status: 209,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "insertion faild" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request) {
  try {
    const searchParams = await request.nextUrl.searchParams;
    const userId = await searchParams?.get("userId");

    const client = await clientPromise;
    const ordersDB = await client.db(process.env.ORDERS_DB);
    const orders = await ordersDB
      .collection("orders")
      .find({
        userId: userId,
      })
      .toArray();
      
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
