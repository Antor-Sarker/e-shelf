import Book from "./components/books/book";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/books");
  const books = await data.json();

  return (
    <div className="mt-6 mx-8">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
        {books.map((book) => (
          <Book key={book._id} info={book} />
        ))}
      </div>
    </div>
  );
}
