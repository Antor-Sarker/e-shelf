import Filter from "../components/filter/filter";

export default async function Category() {
  const res = await fetch(`http://localhost:3000/api/books/category`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("API error:", err);
    return;
  }

  const data = await res.json();

  return (
    <div className="px-6">
      <h1 className="text-xl p-3 text-green-700"># All Categories</h1>
      <Filter data={data} page={"category"} />
    </div>
  );
}
