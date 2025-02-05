import React, { createContext, useContext, useState, useEffect } from "react";
import useArticleFeed, { Article } from "../hooks/useArticleFeed";

type ArticleContextType = {
  articles: Article[];
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  expandedIndices: { [key: number]: boolean };
  toggleExpand: (index: number) => void;
  extractThreshold: number;
  savedArticles: Article[];
  handleSaveArticle: (article: Article) => void;
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
  } = useArticleFeed();
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  const handleSaveArticle = (article: Article) => {
    const isSaved = savedArticles.some((a) => a.title === article.title);
    const updatedSaved = isSaved
      ? savedArticles.filter((a) => a.title !== article.title)
      : [...savedArticles, article];
    setSavedArticles(updatedSaved);
    localStorage.setItem("savedArticles", JSON.stringify(updatedSaved));
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        handleScroll,
        expandedIndices,
        toggleExpand,
        extractThreshold,
        savedArticles,
        handleSaveArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};
