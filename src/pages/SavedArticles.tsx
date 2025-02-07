import React, { useState } from "react";
import { FaBookmark, FaCheckCircle } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";

interface SavedArticlesProps {
  savedArticles: (Article & { read?: boolean })[];
  extractThreshold: number;
  handleSaveArticle: (article: Article) => void;
  handleToggleReadArticle: (article: Article) => void;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

function SavedArticles({
  savedArticles,
  extractThreshold,
  handleSaveArticle,
  handleToggleReadArticle,
  handleScroll,
}: SavedArticlesProps) {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredArticles = savedArticles.filter((article) => {
    if (filter === "all") return true;
    if (filter === "read") return article.read;
    if (filter === "unread") return !article.read;
    return true;
  });

  return (
    <div
      className="h-screen overflow-y-scroll pb-20 lg:max-w-2xl lg:mx-auto"
      onScroll={handleScroll}
    >
      <div className="flex justify-between items-start p-4 flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Saved Articles</h1>
        <div className="flex space-x-2">
          {(["all", "unread", "read"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-6 py-2 rounded-full font-semibold tracking-wide ${
                filter === option
                  ? "bg-neutral-100 text-black"
                  : "cursor-pointer transition-all duration-200 rounded-full text-base bg-[#333] hover:bg-[#222222] text-white"
              }`}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {filteredArticles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {filteredArticles.map(
            (article: Article & { read?: boolean }, index: number) => (
              <div
                key={index}
                onClick={() =>
                  window.open(
                    `https://en.wikipedia.org/wiki/${encodeURIComponent(
                      article.title
                    )}`,
                    "_blank"
                  )
                }
                className="relative border rounded-lg overflow-hidden border-neutral-600 cursor-pointer"
                style={{
                  backgroundImage: article.thumbnail
                    ? `url(${article.thumbnail.source})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "10rem",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Read toggle button */}
                <button
                  type="button"
                  title="Mark as read/unread"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleReadArticle(article);
                  }}
                  className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded-full"
                >
                  <FaCheckCircle
                    size={20}
                    className={article.read ? "text-green-500" : "text-white"}
                  />
                </button>

                {/* Unsave button */}
                <button
                  type="button"
                  title="Unsave article"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveArticle(article);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full"
                >
                  <FaBookmark size={20} className="text-yellow-500" />
                </button>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 p-2">
                  <h2 className="text-lg font-bold text-white">
                    {article.title}
                  </h2>
                  <p className="text-sm text-white">
                    {article.extract.length > extractThreshold
                      ? article.extract.slice(0, extractThreshold) + "..."
                      : article.extract}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center pb-20">
          <h1 className="text-2xl text-white">No saved articles</h1>
        </div>
      )}
    </div>
  );
}

export default SavedArticles;
