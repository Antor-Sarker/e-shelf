import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EmptyFavorite() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md text-center rounded-2xl border border-gray-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-neutral-800">
          <HeartIcon className="h-8 w-8 text-gray-400" />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Save books you love to find them faster later.
        </p>

        {/* find */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-transparent transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto bg-blue-400 text-white hover:bg-blue-700"
          >
            Browse Books
          </Link>
          <Link
            href="/category"
            className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto dark:ring-white/10 dark:hover:bg-neutral-800"
          >
            Discover Category
          </Link>
        </div>

        {/* Tip */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          <span>Tip: Tap the </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
            <HeartIcon className="h-4 w-4" />
            <span>heart</span>
          </span>
          <span> on any book to add it here.</span>
        </div>
      </div>
    </div>
  );
}
