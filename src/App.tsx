import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import SavedArticles from "./pages/SavedArticles";
import { ArticleProvider, useArticle } from "./context/ArticleContext";
import BottomNav from "./components/BottomNavbar";

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
  const { savedArticles, extractThreshold, handleSaveArticle } = useArticle();

  return (
    <SavedArticles
      savedArticles={savedArticles}
      extractThreshold={extractThreshold}
      handleSaveArticle={handleSaveArticle}
    />
  );
}

function App() {
  return (
    <ArticleProvider>
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div className="h-screen w-screen text-xl p-4 text-center text-white">
                      Loading...
                    </div>
                  }
                >
                  <HomeFeedContainer />
                </Suspense>
              }
            />
            <Route path="/saved" element={<SavedArticlesContainer />} />
          </Routes>

          <BottomNav />
        </div>
      </BrowserRouter>
    </ArticleProvider>
  );
}

export default App;
