import Image from "next/image";

export default function Result({ info, handelDetails }) {
  const { _id, title, cover, author } = info;
  return (
    <div
      className="flex border border-gray-300 rounded p-1 mb-2 cursor-pointer"
      onClick={() => handelDetails(`/${_id}`)}
    >
      <div className="mr-2 w-1/6">
        <Image
          src={cover}
          alt="cover"
          width={250}
          height={300}
          className="h-auto"
        />
      </div>
      <div className="my-3">
        <p className="text-blue-950">{title}</p>
        <p className="text-amber-950">{author}</p>
      </div>
    </div>
  );
}
