import { useState, useEffect, useCallback, useRef } from "react";

export type Article = {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

const PREFETCH_THRESHOLD = 5; // Start prefetching when 5 items remain
const BATCH_SIZE = 10;

export default function useArticleFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<{
    [key: number]: boolean;
  }>({});
  const [isFetching, setIsFetching] = useState(false);
  const prefetchedArticles = useRef<Article[]>([]);
  const extractThreshold = 150;

  const fetchArticle = useCallback(async (): Promise<Article | null> => {
    try {
      const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/random/summary"
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      return {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail,
      };
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  }, []);

  const prefetchArticles = useCallback(async () => {
    if (isFetching) return;

    setIsFetching(true);
    try {
      const newArticles = await Promise.all(
        Array(BATCH_SIZE)
          .fill(null)
          .map(() => fetchArticle())
      );

      const validArticles = newArticles.filter(
        (article): article is Article => article !== null
      );
      prefetchedArticles.current = [
        ...prefetchedArticles.current,
        ...validArticles,
      ];

      // Immediately append articles if we have none
      if (articles.length === 0 && validArticles.length > 0) {
        setArticles(validArticles);
      }
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticle, isFetching, articles.length]);

  const appendArticles = useCallback(() => {
    if (prefetchedArticles.current.length === 0) {
      prefetchArticles();
      return;
    }

    setArticles((prev) => [...prev, ...prefetchedArticles.current]);
    prefetchedArticles.current = [];
  }, [prefetchArticles]);

  // Initialize on mount
  useEffect(() => {
    if (articles.length === 0 && !isFetching) {
      prefetchArticles();
    }
  }, []); // Empty dependency array for mount only

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const scrollPosition = target.scrollTop + target.clientHeight;
      const scrollThreshold =
        target.scrollHeight - target.clientHeight * PREFETCH_THRESHOLD;

      if (scrollPosition > scrollThreshold) {
        appendArticles();
      }
    },
    [appendArticles]
  );

  // Keep prefetching articles when the prefetch cache is low
  useEffect(() => {
    if (prefetchedArticles.current.length < BATCH_SIZE && !isFetching) {
      prefetchArticles();
    }
  }, [prefetchArticles, isFetching]);

  const toggleExpand = useCallback((index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  return {
    articles,
    handleScroll,
    expandedIndices,
    toggleExpand,
    extractThreshold,
    isLoading: isFetching && articles.length === 0,
  };
}
