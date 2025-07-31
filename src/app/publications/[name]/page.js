import Book from "@/app/components/books/book";
import Link from "next/link";

export default async function Books({ params }) {
  const { name } = await params;

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/books/publication/${name}`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    );
    const books = await res.json();

    return (
      <div className="mt-6 mx-8">
        <p className="text-xl p-3 text-red-600">
          # {decodeURIComponent(name)}:{" "}
          <span className="text-green-600"> {books.length} books</span>
        </p>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {books?.map((book) => (
            <Link key={book._id} href={`/${book?._id}`}>
              <Book info={book} />
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>Error!</div>
  }
}
