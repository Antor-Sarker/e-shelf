"use server";
export default async function userData(id) {
  if (!id) return null;
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/auth/user?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
