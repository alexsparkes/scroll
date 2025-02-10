import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWikipediaW } from "react-icons/fa";
import { useMainPageContent } from "../hooks/useMainPageContent";

export default function Discover() {
  const { t } = useTranslation();
  const { featuredArticle, loading } = useMainPageContent();
  const [isExpanded, setIsExpanded] = useState(false);
  const extractThreshold = 150;

  // Calculate displayed extract
  const displayedExtract =
    featuredArticle &&
    featuredArticle.extract.length > extractThreshold &&
    !isExpanded
      ? featuredArticle.extract.slice(0, extractThreshold) + "..."
      : featuredArticle?.extract;

  return (
    <div className="lg:ml-[250px] min-h-screen bg-black text-white pb-[85px] mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <div className="p-4">
        <h1 className="text-5xl font-serif font-semibold text-white flex flex-col pt-10 pb-7">
          {t("discover.title")}
        </h1>

        {/* Featured Article Section */}
        <section className="mb-8 lg:w-[575px]">
          {loading ? (
            <div className="text-center">{t("discover.loading")}</div>
          ) : (
            <div className="lg:w-[575px] relative bg-neutral-800/50 backdrop-blur-lg rounded-xl border border-white/10 shadow-md hover:shadow-lg transition transform hover:scale-105 lg:hover:scale-100 lg:hover:bg-neutral-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
              <div className="absolute top-3 right-3">
                <div className="rounded-lg px-5 py-2 bg-neutral-900/70 backdrop-blur-lg text-white text-xs font-bold flex flex-row gap-2 items-center">
                  <FaWikipediaW />
                  {t("discover.featuredBadge")}
                </div>
              </div>
              {featuredArticle?.thumbnail && (
                <img
                  src={featuredArticle.thumbnail}
                  alt={featuredArticle.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-3xl mb-2 font-serif">
                  {featuredArticle.title}
                </h3>
                <p className="text-neutral-300">{displayedExtract}</p>
                {featuredArticle &&
                  featuredArticle.extract.length > extractThreshold && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      className="text-blue-400 underline mt-2"
                    >
                      {isExpanded
                        ? t("discover.seeLess")
                        : t("discover.seeMore")}
                    </button>
                  )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
