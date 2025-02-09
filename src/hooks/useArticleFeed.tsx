import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { fetchWithLanguageFallback } from "../utils/languageFallback";

export type Article = {
  title: string;
  extract: string;
  content?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
};

const PREFETCH_THRESHOLD = 5; // Start prefetching when 5 items remain
const BATCH_SIZE = 10;
const FETCH_TIMEOUT = 3000; // 3 seconds
const MAX_RETRIES = 3;

export default function useArticleFeed() {
  const { i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [expandedIndices, setExpandedIndices] = useState<{
    [key: number]: boolean;
  }>({});
  const [isFetching, setIsFetching] = useState(false);
  const prefetchedArticles = useRef<Article[]>([]);
  const extractThreshold = 150;

  const fetchWithTimeout = useCallback(async (url: string, timeout: number) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, []);

  const fetchArticle = useCallback(
    async (retries = MAX_RETRIES): Promise<Article | null> => {
      const fetchForLang = async (language: string) => {
        const summaryResponse = await fetchWithTimeout(
          `https://${language}.wikipedia.org/api/rest_v1/page/random/summary`,
          FETCH_TIMEOUT
        );
        if (!summaryResponse.ok) throw new Error("Failed to fetch summary");
        const summaryData = await summaryResponse.json();

        const titleForUrl = encodeURIComponent(summaryData.title);
        const contentResponse = await fetchWithTimeout(
          `https://${language}.wikipedia.org/api/rest_v1/page/html/${titleForUrl}`,
          FETCH_TIMEOUT
        );
        if (!contentResponse.ok) throw new Error("Failed to fetch content");
        const contentText = await contentResponse.text();

        return {
          title: summaryData.title,
          extract: summaryData.extract,
          content: contentText,
          thumbnail: summaryData.thumbnail,
        };
      };

      try {
        const lang = i18n.language.split("-")[0];
        const { result, usedFallback } = await fetchWithLanguageFallback(
          fetchForLang,
          lang,
          (result) => result.extract.length > 0 && result.title.length > 0
        );

        if (usedFallback) {
          console.log(`Using English fallback for article`);
        }

        return result;
      } catch (error) {
        if (retries > 0) {
          return fetchArticle(retries - 1);
        }
        console.error("Error fetching article:", error);
        return null;
      }
    },
    [fetchWithTimeout, i18n.language]
  );

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

  const fetchInitialArticle = useCallback(async () => {
    setIsFetching(true);
    try {
      // Fetch first article and start prefetching in parallel
      const [firstArticle] = await Promise.all([
        fetchArticle(),
        prefetchArticles(),
      ]);

      if (firstArticle) {
        setArticles([firstArticle]);
      }
    } finally {
      setIsFetching(false);
    }
  }, [fetchArticle, prefetchArticles]);

  const appendArticles = useCallback(() => {
    if (prefetchedArticles.current.length === 0) {
      prefetchArticles();
      return;
    }

    setArticles((prev) => [...prev, ...prefetchedArticles.current]);
    prefetchedArticles.current = [];
  }, [prefetchArticles]);

  // Initialize on mount with optimized first load
  useEffect(() => {
    if (articles.length === 0 && !isFetching) {
      fetchInitialArticle();
    }
  }, [articles.length, fetchInitialArticle, isFetching]); // Include dependencies

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

  const reset = useCallback(() => {
    setArticles([]);
    setExpandedIndices({});
    prefetchedArticles.current = [];
  }, []);

  return {
    articles,
    handleScroll,
    expandedIndices,
    toggleExpand,
    extractThreshold,
    isLoading: isFetching && articles.length === 0,
    reset, // Add reset to the returned object
  };
}
