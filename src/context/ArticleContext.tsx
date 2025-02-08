import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useArticleFeed, { Article } from "../hooks/useArticleFeed";

type ArticleContextType = {
  articles: Article[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  expandedIndices: { [key: number]: boolean };
  toggleExpand: (index: number) => void;
  extractThreshold: number;
  savedArticles: (Article & { read?: boolean })[];
  handleSaveArticle: (article: Article) => void;
  handleToggleReadArticle: (article: Article) => void;
  isLoading: boolean;
  reset: () => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    articles,
    handleScroll,
    expandedIndices,
    toggleExpand,
    extractThreshold,
    isLoading,
    reset,
  } = useArticleFeed();
  const [savedArticles, setSavedArticles] = useState<
    (Article & { read?: boolean })[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  const handleSaveArticle = useCallback((article: Article) => {
    setSavedArticles((prev) => {
      const isSaved = prev.some((a) => a.title === article.title);
      const updatedSaved = isSaved
        ? prev.filter((a) => a.title !== article.title)
        : [...prev, article];
      localStorage.setItem("savedArticles", JSON.stringify(updatedSaved));
      return updatedSaved;
    });
  }, []);

  const handleToggleReadArticle = useCallback((article: Article) => {
    setSavedArticles((prev) => {
      const updated = prev.map((a) =>
        a.title === article.title ? { ...a, read: !a.read } : a
      );
      localStorage.setItem("savedArticles", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({
      articles,
      handleScroll,
      expandedIndices,
      toggleExpand,
      extractThreshold,
      savedArticles,
      handleSaveArticle,
      handleToggleReadArticle,
      isLoading,
      reset,
    }),
    [
      articles,
      handleScroll,
      expandedIndices,
      toggleExpand,
      extractThreshold,
      savedArticles,
      handleSaveArticle,
      handleToggleReadArticle,
      isLoading,
      reset,
    ]
  );

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};
