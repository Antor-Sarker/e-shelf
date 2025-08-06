import { NextResponse } from "next/server";
import { verifyPassword } from "../../../../../lib/auth";
import clientPromise from "../../../../../lib/mongodb";

export async function POST(request) {
  const { email, password } = await request.json();

  const client = await clientPromise;
  const database = await client.db(process.env.USERS_DB);
  const dbUser = await database.collection("users").findOne({ email });

  if (dbUser) {
    const isverifiedPassword = await verifyPassword(password, dbUser.password);
    if (isverifiedPassword && dbUser?.email === email) {
      return new Response(JSON.stringify({ userId: dbUser._id }), {
        status: 200,
      });
    } else
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 }
      );
  } else {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }
}
