import { useState, useEffect } from "react";
import { IoSearch, IoCloseOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { useMainPageContent } from "../hooks/useMainPageContent";
import { useSearch, SearchResult } from "../hooks/useSearch";
import ArticleCard from "../components/ArticleCard";

// Constants and helper for shortening snippet text
const MAX_SNIPPET_LENGTH = 150;
const getShortenedSnippet = (snippet: string) => {
  const text = snippet.replace(/<[^>]+>/g, "");
  return text.length > MAX_SNIPPET_LENGTH
    ? text.slice(0, MAX_SNIPPET_LENGTH) + "..."
    : text;
};

export default function Search() {
  const { inTheNews, loading, error } = useMainPageContent();

  const [query, setQuery] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const { searchResults, searchLoading, searchError } = useSearch(query);

  // Reset submitted state if query is cleared or changed
  useEffect(() => {
    if (query.trim() === "") {
      setSearchSubmitted(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setSearchSubmitted(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent relative">
      <h1 className="text-5xl font-bold mb-6 text-white font-serif pt-10">
        Search
      </h1>
      <div className="relative">
        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder-white w-full px-4 py-2 pl-10 pr-10 bg-neutral-800/50 backdrop-blur-lg border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearch className="w-5 h-5 text-neutral-300" />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              title="Clear search"
            >
              <IoCloseOutline className="w-5 h-5 text-white" />
            </button>
          )}
        </form>
        {/* Dropdown suggestions when not submitted */}
        {!searchSubmitted && query && (
          <div className="absolute z-10 w-full bg-neutral-900 rounded-lg mt-1 shadow-lg">
            {searchLoading && (
              <p className="text-white px-4 py-2">Searching...</p>
            )}
            {searchError && (
              <p className="text-red-400 px-4 py-2">{searchError}</p>
            )}
            {!searchLoading && !searchError && searchResults.length > 0 && (
              <ul className="max-h-60 overflow-y-auto">
                {searchResults.map((result: SearchResult, index: number) => (
                  <li
                    key={index}
                    className="border-b border-neutral-700 last:border-0"
                  >
                    <a
                      href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 hover:bg-neutral-800 text-blue-400"
                    >
                      <span>{result.title}</span>
                      <GoArrowUpRight />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {!searchLoading &&
              !searchError &&
              query &&
              searchResults.length === 0 && (
                <p className="text-white px-4 py-2">No results found</p>
              )}
          </div>
        )}
      </div>

      {/* Cards view when searchSubmitted */}
      {searchSubmitted && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {searchLoading && (
            <p className="text-white col-span-full">Searching...</p>
          )}
          {searchError && (
            <p className="text-red-400 col-span-full">{searchError}</p>
          )}
          {!searchLoading && !searchError && searchResults.length > 0
            ? searchResults.map((result: SearchResult, index: number) => (
                <ArticleCard
                  key={index}
                  title={result.title}
                  snippet={
                    typeof result.snippet === "string"
                      ? getShortenedSnippet(result.snippet)
                      : ""
                  }
                  thumbnail={result.thumbnail}
                  onClick={() =>
                    window.open(
                      `https://en.wikipedia.org/?curid=${result.pageid}`,
                      "_blank"
                    )
                  }
                />
              ))
            : !searchLoading &&
              !searchError && (
                <p className="text-white col-span-full">No results found</p>
              )}
        </div>
      )}

      {/* Trending Articles shown only when searchSubmitted is false */}
      {!searchSubmitted && (
        <section className="bg-neutral-800 p-4 rounded-lg mt-8">
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
      )}
    </div>
  );
}
