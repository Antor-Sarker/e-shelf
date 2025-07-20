import Image from "next/image";
import Link from "next/link";

export default function Filter({ data, page }) {
  const col =
    page === "category"
      ? "grid-cols-2"
      : page === "author"
      ? "grid-cols-2"
      : "grid-cols-3";
  const sm =
    page === "category"
      ? "sm:grid-cols-2"
      : page === "author"
      ? "sm:grid-cols-2"
      : "sm:grid-cols-3";
  const md =
    page === "category"
      ? "md:grid-cols-3"
      : page === "author"
      ? "md:grid-cols-4"
      : "md:grid-cols-5";
  const lg =
    page === "category"
      ? "lg:grid-cols-4"
      : page === "author"
      ? "lg:grid-cols-5"
      : "lg:grid-cols-6";
  const xl =
    page === "category"
      ? "xl:grid-cols-5"
      : page === "author"
      ? "xl:grid-cols-6"
      : "xl:grid-cols-8";
  const xxl =
    page === "category"
      ? "2xl:grid-cols-6"
      : page === "author"
      ? "2xl:grid-cols-9"
      : "2xl:grid-cols-13";

  return (
    <div>
      <div
        className={`grid ${col} ${sm} ${md} ${lg} ${xl} ${xxl} auto-rows-fr`}
      >
        {data?.map((item) => {
          return (
            <div
              key={item?._id}
              className="bg-[#edf7f1] shawow shadow-black shadow-md rounded cursor-pointer h-11/12 mx-3"
            >
              <Link href={`http://localhost:3000/${page}/${item?.name}`}>
                <div className={`overflow-hidden w-full h-9/12`}>
                  <Image
                    src={item?.photo}
                    width={400}
                    height={300}
                    alt="cover"
                    className="w-full h-full transition-transform duration-200 hover:scale-105 object-cover"
                  />
                </div>
                <div className="pl-2 pt-1 pb-4 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base text-green-900 font-semibold">
                  <p>{item?.name}</p>
                  <p>books: {item?.stock}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
