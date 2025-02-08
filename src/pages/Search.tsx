import { useState, useRef, useEffect } from "react";
import { FaSearch, FaBookmark } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { useSearch } from "../hooks/useSearch";
import { Article } from "../hooks/useArticleFeed";
import { useMainPageContent } from "../hooks/useMainPageContent";
import ArticleCard from "../components/ArticleCard";

interface SearchProps {
  savedArticles: (Article & { read?: boolean })[];
  handleSaveArticle: (article: Article) => void;
}

interface SearchResult {
  title: string;
  snippet?: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  pageid: number;
}
const searchResultToArticle = (result: SearchResult): Article => ({
  title: result.title,
  extract: result.snippet || result.description || "", // Use snippet as extract
  thumbnail: result.thumbnail,
});

export default function Search({
  savedArticles,
  handleSaveArticle,
}: SearchProps) {
  const [query, setQuery] = useState("");
  const { searchResults, searchLoading, searchError } = useSearch(query);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    inTheNews,
    loading: trendingLoading,
    error: trendingError,
  } = useMainPageContent();

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Listen for navigation events
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the click was on the search nav item or its children
      if (target.closest('a[href="/search"]')) {
        // Small delay to ensure the focus works after navigation
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };

    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  const isArticleSaved = (title: string) => {
    return savedArticles.some((saved) => saved.title === title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dismiss keyboard by removing focus from input
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <div className="min-h-screen pb-20 max-w-2xl mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <div className="p-4 sticky top-0 backdrop-blur-lg z-10">
        <h1 className="text-5xl font-serif font-bold text-white flex flex-col pt-10 pb-5">
          Search
        </h1>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Wikipedia..."
            enterKeyHint="search"
            className="w-full p-4 pr-12 rounded-xl bg-neutral-800/50 border border-white/10 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#341F97] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:h-5 [&::-webkit-search-cancel-button]:w-5 [&::-webkit-search-cancel-button]:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22%23ffffff%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22%2F%3E%3C%2Fsvg%3E')] [&::-webkit-search-cancel-button]:bg-contain"
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
            size={20}
          />
        </form>
      </div>

      <div className="px-4">
        {searchError && <div className="text-red-500 p-4">{searchError}</div>}

        {query ? (
          searchLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-neutral-800 rounded-xl mb-4" />
                  <div className="h-6 bg-neutral-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid gap-4">
              <div className="text-neutral-400 font-semibold">
                {searchResults.length} result
                {searchResults.length === 1 ? "" : "s"} found
              </div>
              {searchResults.map((result) => (
                <ArticleCard
                  key={result.pageid}
                  title={result.title}
                  snippet={result.description || result.snippet}
                  thumbnail={result.thumbnail}
                  onClick={() =>
                    window.open(
                      `https://en.wikipedia.org/wiki/${encodeURIComponent(
                        result.title
                      )}`,
                      "_blank"
                    )
                  }
                  actions={
                    <button
                      type="button"
                      title={
                        isArticleSaved(result.title)
                          ? "Remove from saved"
                          : "Save article"
                      }
                      aria-label={`${
                        isArticleSaved(result.title) ? "Remove" : "Save"
                      } article "${result.title}"`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveArticle(searchResultToArticle(result));
                      }}
                      className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      <FaBookmark
                        size={20}
                        className={
                          isArticleSaved(result.title)
                            ? "text-yellow-500"
                            : "text-white"
                        }
                      />
                    </button>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-neutral-400">
              No results found
            </div>
          )
        ) : (
          // Show trending articles when no search query
          <section className="mt-4">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Trending Articles
            </h2>
            {trendingLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-neutral-800 rounded w-3/4" />
                ))}
              </div>
            ) : trendingError ? (
              <div className="text-red-500 p-4">{trendingError}</div>
            ) : (
              <div className="space-y-2">
                {inTheNews
                  .filter((article) => article.title !== "")
                  .map((article, index) => (
                    <a
                      key={index}
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                        article.title
                      )}`}
                      className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50 backdrop-blur-sm border border-white/5 text-white hover:bg-neutral-700/50 transition-colors"
                    >
                      <span>{article.title}</span>
                      <GoArrowUpRight className="text-neutral-400" />
                    </a>
                  ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
