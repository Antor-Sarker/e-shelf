import Filter from "../components/filter/filter";

export default async function Publications() {
  const res = await fetch(`http://localhost:3000/api/books/publication`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("API error:", err);
    return;
  }
  const data = await res.json();

  return (
    <div className="">
      <h1 className="text-xl p-3 text-green-700"># All Publications</h1>
      <Filter data={data} page={"publication"} />
    </div>
  );
}
