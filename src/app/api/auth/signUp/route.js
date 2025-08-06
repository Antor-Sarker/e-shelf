import { NextResponse } from "next/server";
import { hashPassword } from "../../../../../lib/auth";
import clientPromise from "../../../../../lib/mongodb";

export async function POST(request) {
  const { fullName, email, password } = await request.json();
  const hashedPassword = await hashPassword(password);

  const userInfo = {
    email,
    fullName,
    password: hashedPassword,
    role: "user",
    ordersId: [],
    wishListBooksId: [],
  };

  const client = await clientPromise;
  const database = await client.db(process.env.USERS_DB);
  const collection = await database.collection("users");

  const existedEmail = await collection.findOne({ email });
  if (existedEmail) {
    console.log(userInfo);
    return NextResponse.json({ error: "already exist" }, { status: 409 });
  } else {
    const result = await collection.insertOne(userInfo);
    return NextResponse.json(result, { status: 201 });
  }
}
