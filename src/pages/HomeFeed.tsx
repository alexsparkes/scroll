import React, { useCallback } from "react";
import { FaSpinner } from "react-icons/fa";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  isLoading?: boolean;
}

function HomeFeed({
  articles,
  handleScroll,
  expandedIndices,
  toggleExpand,
  extractThreshold,
  savedArticles,
  handleSaveArticle,
  isLoading,
}: HomeFeedProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: articles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => window.innerHeight, []),
    overscan: 2,
  });

  if (isLoading || articles.length === 0) {
    return (
      <div className="h-screen w-screen bg-black pb-[175px]">
        <div className="h-screen relative animate-pulse">
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute left-0 bottom-[75px] pb-[100px] w-full flex flex-row bg-gradient-to-t from-black via-black/90 to-transparent">
            <div className="flex-grow p-4 flex flex-col justify-end">
              <div className="h-6 w-2/3 bg-gray-700 rounded mb-4" />
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
                <div className="h-4 bg-gray-700 rounded w-4/6" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-end space-y-4 p-4">
              <div className="flex flex-col gap-2 items-center">
                <div className="h-12 w-12 bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="h-12 w-12 bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <div className="h-12 w-12 bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory pb-[10vh]"
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const article = articles[virtualItem.index];
          const isExpanded =
            expandedIndices[virtualItem.index] ||
            article.extract.length <= extractThreshold;
          const isArticleSaved = savedArticles.some(
            (a) => a.title === article.title
          );

          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ArticleCard
                article={article}
                index={virtualItem.index}
                extractThreshold={extractThreshold}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
                isArticleSaved={isArticleSaved}
                handleSaveArticle={handleSaveArticle}
              />
            </div>
          );
        })}
      </div>
      <div className="h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-white" size={24} />
      </div>
    </div>
  );
}

export default React.memo(HomeFeed);
