import Filter from "../components/filter/filter";

export default async function Category() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/books/category`, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("API error:", err);
      return <div>error!</div>;
    }

    const data = await res.json();

    return (
      <div className="px-6">
        <h1 className="text-xl p-3 text-green-700"># All Categories</h1>
        <Filter data={data} page={"category"} />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Error!</div>;
  }
}
