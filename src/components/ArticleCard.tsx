import React from "react";
import { FaShare, FaExternalLinkAlt, FaBookmark } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";

export interface ArticleCardProps {
  article: Article;
  index: number;
  extractThreshold: number;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
  isArticleSaved: boolean;
  handleSaveArticle: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = React.memo(
  ({
    article,
    index,
    extractThreshold,
    isExpanded,
    toggleExpand,
    isArticleSaved,
    handleSaveArticle,
  }) => {
    const isShort = article.extract.length <= extractThreshold;
    const displayedExtract = isExpanded
      ? article.extract
      : article.extract.slice(0, extractThreshold) + "...";

    const handleShare = () => {
      const shareData = {
        title: article.title,
        text: "Check out this article!",
        url:
          "https://en.wikipedia.org/wiki/" + encodeURIComponent(article.title),
      };

      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => console.log("Successful share"))
          .catch((error) => console.error("Error sharing", error));
      } else {
        console.log(
          "Native share not supported. Fallback to default sharing behavior."
        );
      }
    };

    const handleRead = () => {
      // Open in same window instead of new tab
      window.location.href =
        "https://en.wikipedia.org/wiki/" + encodeURIComponent(article.title);
    };

    return (
      <div
        key={index}
        className="h-screen snap-center relative lg:max-w-2xl lg:mx-auto"
      >
        {article.thumbnail && (
          <img
            className="h-screen w-screen object-cover"
            src={article.thumbnail.source}
            alt={article.title}
          />
        )}
        <div className="absolute left-0 bottom-[75px] pb-[100px] w-full flex flex-row bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="flex-grow p-4 text-white flex flex-col justify-end items-start">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text mb-4">{displayedExtract}</p>
            {!isShort && (
              <button
                type="button"
                title="Toggle article expansion"
                className="text-blue-400 underline"
                onClick={() => toggleExpand(index)}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-end space-y-4 p-4">
            <button
              type="button"
              title="Save or unsave this article"
              className="p-3 rounded-full flex flex-col items-center gap-2 group"
              onClick={() => handleSaveArticle(article)}
            >
              <FaBookmark
                size={24}
                className={`transition-transform duration-150 ease-in-out group-active:scale-125 ${
                  isArticleSaved ? "text-yellow-500" : "text-white"
                }`}
              />
              <span className="text-xs text-white">Save</span>
            </button>
            <button
              type="button"
              title="Share this article"
              className="text-white p-3 rounded-full flex flex-col items-center gap-2 group"
              onClick={handleShare}
            >
              <FaShare
                className="transition-transform duration-150 ease-in-out group-active:scale-125"
                size={24}
              />
              <span className="text-xs text-white">Share</span>
            </button>
            <button
              type="button"
              title="Read this article on Wikipedia"
              className="text-white p-3 rounded-full flex flex-col items-center gap-2 group"
              onClick={handleRead}
            >
              <FaExternalLinkAlt
                className="transition-transform duration-150 ease-in-out group-active:scale-125"
                size={24}
              />
              <span className="text-xs text-white">Read</span>
            </button>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isExpanded === nextProps.isExpanded &&
      prevProps.isArticleSaved === nextProps.isArticleSaved
    );
  }
);

export default ArticleCard;
