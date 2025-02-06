import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Article } from "../hooks/useArticleFeed";
import ArticleCard from "../components/ArticleCard";

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
  if (articles.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <FaSpinner className="animate-spin text-white" size={48} />
      </div>
    );
  }

  return (
    <div
      className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory pb-[10vh]"
      onScroll={handleScroll}
    >
      {articles.map((article: Article, index: number) => {
        const isExpanded =
          expandedIndices[index] || article.extract.length <= extractThreshold;
        const isArticleSaved = savedArticles.some(
          (a) => a.title === article.title
        );
        return (
          <ArticleCard
            key={index}
            article={article}
            index={index}
            extractThreshold={extractThreshold}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
            isArticleSaved={isArticleSaved}
            handleSaveArticle={handleSaveArticle}
          />
        );
      })}
    </div>
  );
}

export default HomeFeed;
