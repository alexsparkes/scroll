import { FaSearch } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useMainPageContent } from "../hooks/useMainPageContent";

export default function Search() {
  const { inTheNews, loading, error } = useMainPageContent();

  return (
    <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <h1 className="text-5xl font-bold mb-6 text-white font-serif pt-10">
        Search
      </h1>
      <form className="relative mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="placeholder-white w-full px-4 py-2 pl-10 pr-4 bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          title="Search"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <FaSearch className="w-5 h-5 text-white" />
        </button>
      </form>

      <section className="bg-neutral-800 p-4 rounded-lg">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Trending Articles
        </h2>
        {loading ? (
          <p className="text-white">Loading trending articles...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {inTheNews
              .filter((item) => item.title.trim() !== "")
              .map((item, index) => (
                <li key={index}>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                      item.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex flex-row items-center gap-2"
                  >
                    {item.title}
                    <GoArrowUpRight />
                  </a>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
