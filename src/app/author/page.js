import Filter from "../components/filter/filter";

export default async function Author() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/books/author`, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const err = await res?.text();
      console.error("API error:", err);
      return <div>Error!</div>;
    }
    const data = await res.json();

    return (
      <div className="px-6">
        <h1 className="text-xl p-3 text-green-700"># All Authors</h1>
        <Filter data={data} page={"author"} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>error!</div>;
  }
}
