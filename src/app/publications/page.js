import Filter from "../components/filter/filter";

export default async function Publications() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/books/publication`, {
      cache: "force-cache",
      next: { revalidate: 300 },
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
        <Filter data={data} page={"publications"} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Error!</div>
  }
}
