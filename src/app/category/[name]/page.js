import Book from "@/app/components/books/book";

export default async function Books({ params }) {
  const { name } = await params;

  const res = await fetch(`http://localhost:3000/api/books/category/${name}`);
  const books = await res.json();
  return (
    <div className="mt-6 mx-8">
      <p className="text-xl p-3 text-red-600">
        # {decodeURIComponent(name)}:{" "}
        <span className="text-green-600"> {books.length} books</span>
      </p>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {books?.map((book) => (
          <Book key={book._id} info={book} />
        ))}
      </div>
    </div>
  );
}
