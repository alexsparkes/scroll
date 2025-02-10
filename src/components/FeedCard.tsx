import React from "react";
import { FaShare, FaBookOpen, FaBookmark } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";
import { useTranslation } from "react-i18next";

export interface ArticleFeedCardProps {
  article: Article;
  index: number;
  extractThreshold: number;
  isExpanded: boolean;
  toggleExpand: (index: number) => void;
  isArticleSaved: boolean;
  handleSaveArticle: (article: Article) => void;
}

const FeedCard: React.FC<ArticleFeedCardProps> = React.memo(
  ({
    article,
    index,
    extractThreshold,
    isExpanded,
    toggleExpand,
    isArticleSaved,
    handleSaveArticle,
  }) => {
    const { t } = useTranslation();
    const isShort = article.extract.length <= extractThreshold;
    const displayedExtract = isExpanded
      ? article.extract
      : article.extract.slice(0, extractThreshold) + "...";

    // Calculate reading time
    const calculateReadingTime = (text: string) => {
      const wordsPerMinute = 200;
      // Strip HTML tags if present
      const strippedText = text.replace(/<[^>]*>/g, "");
      const wordCount = strippedText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      const minutes = wordCount / wordsPerMinute;
      // Round up to nearest minute, but keep minimum of 0.5
      return minutes < 0.5 ? 0.5 : Math.ceil(minutes);
    };

    // Use article.content for reading time if available, fallback to extract
    const readingTime = calculateReadingTime(
      article.content || article.extract
    );

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
        className="h-screen snap-center relative lg:w-[575px] lg:mx-auto"
      >
        {article.thumbnail && (
          <img
            className="h-[90vh] lg:h-[100vh] w-screen object-cover"
            src={article.thumbnail.source}
            alt={article.title}
          />
        )}
        <div className="absolute left-0 bottom-[75px] lg:bottom-0 pb-[100px] w-full flex flex-row bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="flex-grow p-4 text-white flex flex-col justify-end items-start">
            <span className="px-2 py-1 bg-neutral-800/20 text-white border border-white/30 backdrop-blur-lg rounded-full text-xs font-semibold mb-2">
              {readingTime === 0.5
                ? t("feed.readTime30")
                : t("feed.readTime", { time: readingTime })}
            </span>
            <h2 className="text-3xl font-semibold mb-2 font-serif">
              {article.title}
            </h2>
            <p className="text mb-4">{displayedExtract}</p>
            {!isShort && (
              <button
                type="button"
                title="Toggle article expansion"
                className="text-blue-400 underline"
                onClick={() => toggleExpand(index)}
              >
                {isExpanded ? t("feed.seeLess") : t("feed.seeMore")}
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-end space-y-4 p-4">
            <button
              type="button"
              title="Save or unsave this article"
              className="p-3 rounded-lg flex flex-col items-center gap-2 group cursor-pointer hover:bg-neutral-800/40 hover:backdrop-blur-lg transition-all duration-200 ease-in-out"
              onClick={() => handleSaveArticle(article)}
            >
              <FaBookmark
                size={24}
                className={`transition-transform duration-150 ease-in-out group-active:scale-125 ${
                  isArticleSaved ? "text-yellow-500" : "text-white"
                }`}
              />
              <span className="text-xs text-white">{t("feed.save")}</span>
            </button>
            <button
              type="button"
              title="Share this article"
              className="text-white p-3 rounded-lg flex flex-col items-center gap-2 group cursor-pointer hover:bg-neutral-800/40 hover:backdrop-blur-lg transition-all duration-200 ease-in-out"
              onClick={handleShare}
            >
              <FaShare
                className="transition-transform duration-150 ease-in-out group-active:scale-125"
                size={24}
              />
              <span className="text-xs text-white">{t("feed.share")}</span>
            </button>
            <button
              type="button"
              title="Read this article on Wikipedia"
              className="text-white p-3 rounded-lg flex flex-col items-center gap-2 group cursor-pointer hover:bg-neutral-800/40 hover:backdrop-blur-lg transition-all duration-200 ease-in-out"
              onClick={handleRead}
            >
              <FaBookOpen
                className="transition-transform duration-150 ease-in-out group-active:scale-125"
                size={24}
              />
              <span className="text-xs text-white">{t("feed.read")}</span>
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

export default FeedCard;
