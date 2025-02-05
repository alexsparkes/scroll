import React from "react";
import { FaShare, FaExternalLinkAlt, FaBookmark } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";

interface HomeFeedProps {
  articles: Article[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  expandedIndices: { [key: number]: boolean };
  toggleExpand: (index: number) => void;
  extractThreshold: number;
  savedArticles: Article[];
  handleSaveArticle: (article: Article) => void;
}

function HomeFeed({
  articles,
  handleScroll,
  expandedIndices,
  toggleExpand,
  extractThreshold,
  savedArticles,
  handleSaveArticle,
}: HomeFeedProps) {
  return (
    <div
      className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory pb-20"
      onScroll={handleScroll}
    >
      {articles.map((article: Article, index: number) => {
        const isShort = article.extract.length <= extractThreshold;
        const isExpanded = expandedIndices[index] || isShort;
        const displayedExtract = isExpanded
          ? article.extract
          : article.extract.slice(0, extractThreshold) + "...";
        const isArticleSaved = savedArticles.some(
          (a) => a.title === article.title
        );
        return (
          <div key={index} className="h-screen snap-center relative">
            {article.thumbnail && (
              <img
                className="h-screen w-screen object-cover"
                src={article.thumbnail.source}
                alt={article.title}
              />
            )}
            <div className="absolute bottom-10 left-0 w-full flex flex-row bg-gradient-to-t from-black via-black/90 to-transparent pb-[60px]">
              <div className="flex-grow p-4 text-white flex flex-col justify-end items-start">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text mx-auto mb-4">{displayedExtract}</p>
                {!isShort && (
                  <button
                    type="button"
                    title="Toggle article expansion"
                    className="text-blue-400 underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedIndices[index] ? "See Less" : "See More"}
                  </button>
                )}
              </div>
              <div className="flex flex-col items-center justify-end space-y-4 p-4">
                <button
                  type="button"
                  title="Save or unsave this article"
                  className="p-3 rounded-full flex flex-col items-center gap-2"
                  onClick={() => handleSaveArticle(article)}
                >
                  <FaBookmark
                    size={24}
                    className={
                      isArticleSaved ? "text-yellow-500" : "text-white"
                    }
                  />
                  <span className="text-xs text-white">Save</span>
                </button>
                <button
                  type="button"
                  title="Share this article"
                  className="text-white p-3 rounded-full flex flex-col items-center gap-2"
                  onClick={() => {
                    console.log("Article shared");
                  }}
                >
                  <FaShare size={24} />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  title="Read this article on Wikipedia"
                  className="text-white p-3 rounded-full flex flex-col items-center gap-2"
                  onClick={() =>
                    window.open(
                      "https://en.wikipedia.org/wiki/" +
                        encodeURIComponent(article.title),
                      "_blank"
                    )
                  }
                >
                  <FaExternalLinkAlt size={24} />
                  <span>Read</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeFeed;
