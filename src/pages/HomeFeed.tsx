import React, { useCallback, useRef, useEffect, useState } from "react";
import { FaSpinner, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Article } from "../hooks/useArticleFeed";
import FeedCard from "../components/FeedCard";
import { useTranslation } from "react-i18next";

interface HomeFeedProps {
  articles: Article[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  expandedIndices: { [key: number]: boolean };
  toggleExpand: (index: number) => void;
  extractThreshold: number;
  savedArticles: Article[];
  handleSaveArticle: (article: Article) => void;
  isLoading?: boolean;
  reset: () => void;
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
  reset,
}: HomeFeedProps) {
  const { t } = useTranslation();
  const parentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const currentArticleIndex = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    // If swipe distance is less than -100px, consider it a left swipe
    if (swipeDistance < -100) {
      const article = articles[currentArticleIndex.current];
      if (article) {
        // Navigate to Wikipedia article in the same window
        window.location.href =
          "https://en.wikipedia.org/wiki/" + encodeURIComponent(article.title);
      }
    }

    touchStartX.current = null;
  };

  const virtualizer = useVirtualizer({
    count: articles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => window.innerHeight, []),
    overscan: 2,
  });

  // Track current article index based on scroll position
  const handleScrollWithTracking = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const index = Math.floor(element.scrollTop / window.innerHeight);
    currentArticleIndex.current = index;
    setCurrentIndex(index);
    handleScroll(e);
  };

  // Reset articles when component unmounts
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Function to scroll up to the previous article
  const scrollUp = () => {
    if (scrollingRef.current || !parentRef.current) return;
    const newIndex = Math.max(currentArticleIndex.current - 1, 0);
    parentRef.current.scrollTo({
      top: newIndex * window.innerHeight,
      behavior: "smooth",
    });
    currentArticleIndex.current = newIndex;
    setCurrentIndex(newIndex);
    scrollingRef.current = true;
    setTimeout(() => {
      scrollingRef.current = false;
    }, 600); // adjust timeout based on scroll animation duration
  };

  // Function to scroll down to the next article
  const scrollDown = () => {
    if (scrollingRef.current || !parentRef.current) return;
    const newIndex = Math.min(
      currentArticleIndex.current + 1,
      articles.length - 1
    );
    parentRef.current.scrollTo({
      top: newIndex * window.innerHeight,
      behavior: "smooth",
    });
    currentArticleIndex.current = newIndex;
    setCurrentIndex(newIndex);
    scrollingRef.current = true;
    setTimeout(() => {
      scrollingRef.current = false;
    }, 600); // adjust timeout based on scroll animation duration
  };

  if (isLoading || articles.length === 0) {
    return (
      <div className="h-screen lg:w-[575px] bg-black pb-[175px] mx-auto">
        <div className="h-screen relative animate-pulse">
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute left-0 lg:bottom-0 bottom-[75px] pb-[100px] w-full flex flex-row bg-gradient-to-t from-black via-black/90 to-transparent">
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
        <div className="text-center text-white mt-4">{t("feed.loading")}</div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={parentRef}
        className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory pb-[10vh]"
        onScroll={handleScrollWithTracking}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
                <FeedCard
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

      {/* Navigation buttons to scroll up and down */}
      <section className="hidden lg:flex z-50 fixed h-full right-0 top-0 justify-center items-center flex-col">
        <div className="px-8 flex flex-col gap-5">
          <button
            type="button"
            title="Scroll Up"
            aria-label="Scroll Up"
            disabled={currentIndex === 0}
            className={`cursor-pointer active:scale-90 group-active:opacity-70 transition-all duration-150 w-12 h-12 bg-neutral-800/50 border border-white/10 text-white flex items-center justify-center rounded-full hover:bg-neutral-700 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={scrollUp}
          >
            <FaAngleUp />
          </button>
          <button
            type="button"
            title="Scroll Down"
            aria-label="Scroll Down"
            className="cursor-pointer active:scale-90 group-active:opacity-70 transition-all duration-150 w-12 h-12 bg-neutral-800/50 border border-white/10 text-white flex items-center justify-center rounded-full hover:bg-neutral-700"
            onClick={scrollDown}
          >
            <FaAngleDown />
          </button>
        </div>
      </section>
    </>
  );
}

export default React.memo(HomeFeed);
