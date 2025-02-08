import { useState } from "react";
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
  const {
    inTheNews,
    loading: trendingLoading,
    error: trendingError,
  } = useMainPageContent();

  const isArticleSaved = (title: string) => {
    return savedArticles.some((saved) => saved.title === title);
  };

  return (
    <div className="min-h-screen pb-20 max-w-2xl mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <div className="p-4 sticky top-0 backdrop-blur-lg z-10">
        <h1 className="text-5xl font-serif font-bold text-white flex flex-col pt-10 pb-5">
          Search
        </h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Wikipedia..."
            className="w-full p-4 pr-12 rounded-xl bg-neutral-800/50 border border-white/10 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#341F97]"
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
            size={20}
          />
        </div>
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
