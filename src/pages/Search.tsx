import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useMainPageContent } from "../hooks/useMainPageContent";

export default function Search() {
  const { inTheNews, loading, error } = useMainPageContent();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Auto complete search effect with debounce
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      if (query.trim() === "") {
        setSearchResults([]);
        setSearchError("");
        setSearchLoading(false);
        return;
      }
      setSearchLoading(true);
      setSearchError("");
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          setSearchResults(data.query.search);
        })
        .catch((err: any) => {
          setSearchError(err.message || "Error occurred");
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }, 500);
    return () => {
      clearTimeout(debounceHandler);
    };
  }, [query]);

  return (
    <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent relative">
      <h1 className="text-5xl font-bold mb-6 text-white font-serif pt-10">
        Search
      </h1>
      <div className="relative">
        <form className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder-white w-full px-4 py-2 pl-10 pr-4 bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-white" />
          </div>
        </form>
        {query && (
          <div className="absolute z-10 w-full bg-neutral-900 rounded-lg mt-1 shadow-lg">
            {searchLoading && (
              <p className="text-white px-4 py-2">Searching...</p>
            )}
            {searchError && (
              <p className="text-red-400 px-4 py-2">{searchError}</p>
            )}
            {!searchLoading && !searchError && searchResults.length > 0 && (
              <ul className="max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
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
    </div>
  );
}
