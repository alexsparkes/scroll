import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import SavedArticles from "./pages/SavedArticles";
import { ArticleProvider, useArticle } from "./context/ArticleContext";
import BottomNav from "./components/BottomNavbar";
import ErrorBoundary from "./components/ErrorBoundary";
import { TopicProvider } from "./context/TopicContext";
import Discover from "./pages/Discover";

function HomeFeedContainer() {
  const {
    articles,
    handleScroll,
    expandedIndices,
    toggleExpand,
    extractThreshold,
    savedArticles,
    handleSaveArticle,
  } = useArticle();

  return (
    <HomeFeed
      articles={articles}
      handleScroll={handleScroll}
      expandedIndices={expandedIndices}
      toggleExpand={toggleExpand}
      extractThreshold={extractThreshold}
      savedArticles={savedArticles}
      handleSaveArticle={handleSaveArticle}
    />
  );
}

function SavedArticlesContainer() {
  const {
    savedArticles,
    extractThreshold,
    handleSaveArticle,
    handleToggleReadArticle,
  } = useArticle();

  return (
    <SavedArticles
      savedArticles={savedArticles}
      extractThreshold={extractThreshold}
      handleSaveArticle={handleSaveArticle}
      handleToggleReadArticle={handleToggleReadArticle}
    />
  );
}

function App() {
  return (
    <ArticleProvider>
      <TopicProvider>
        <BrowserRouter>
          <div className="relative min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <div className="h-screen w-screen text-xl p-4 text-center text-white">
                          Loading...
                        </div>
                      }
                    >
                      <HomeFeedContainer />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/discover"
                element={
                  <ErrorBoundary>
                    <Discover />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/saved"
                element={
                  <ErrorBoundary>
                    <SavedArticlesContainer />
                  </ErrorBoundary>
                }
              />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </TopicProvider>
    </ArticleProvider>
  );
}

export default App;
