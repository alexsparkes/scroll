import React from "react";
import { FaBookmark } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";

interface SavedArticlesProps {
  savedArticles: Article[];
  extractThreshold: number;
  handleSaveArticle: (article: Article) => void;
  handleScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

function SavedArticles({
  savedArticles,
  extractThreshold,
  handleSaveArticle,
  handleScroll,
}: SavedArticlesProps) {
  return (
    <div className="h-screen overflow-y-scroll pb-20" onScroll={handleScroll}>
      <h1 className="text-2xl font-bold p-4 text-white">Saved Articles</h1>
      {savedArticles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {savedArticles.map((article: Article, index: number) => (
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
              className="relative border rounded-lg overflow-hidden border border-neutral-600 border-solid cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>

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
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center pb-20">
          <h1 className="text-2xl">No saved articles</h1>
        </div>
      )}
    </div>
  );
}

export default SavedArticles;
