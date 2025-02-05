import { useState, useEffect, useCallback } from "react";

export type Article = {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

export default function useArticleFeed(
  initialCount = 5,
  bufferCount = 3,
  extractThreshold = 150
) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [buffer, setBuffer] = useState<Article[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchRandomArticle = useCallback(async (): Promise<Article> => {
    const response = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/random/summary"
    );
    const data = await response.json();
    return data;
  }, []);

  const prefetchArticles = useCallback(
    async (count: number): Promise<Article[]> => {
      const promises = [];
      for (let i = 0; i < count; i++) {
        promises.push(fetchRandomArticle());
      }
      return await Promise.all(promises);
    },
    [fetchRandomArticle]
  );

  // Load initial articles and buffer
  useEffect(() => {
    const init = async () => {
      const initialArticles = await prefetchArticles(initialCount);
      setArticles(initialArticles);
      const nextArticles = await prefetchArticles(bufferCount);
      setBuffer(nextArticles);
    };
    init();
  }, [prefetchArticles, initialCount, bufferCount]);

  // When scroll reaches bottom, append buffered articles and prefetch new ones
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (
      Math.ceil(target.scrollTop) + target.clientHeight >=
      target.scrollHeight
    ) {
      setArticles((prev) => [...prev, ...buffer]);
      const newBuffer = await prefetchArticles(bufferCount);
      setBuffer(newBuffer);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return {
    articles,
    handleScroll,
    expandedIndices,
    toggleExpand,
    extractThreshold,
  };
}
