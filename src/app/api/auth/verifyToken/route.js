import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = await req?.cookies?.get("token");
    const result = verify(token?.value, process.env.JWT_SECRET);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" },{status:401});
  }
}
