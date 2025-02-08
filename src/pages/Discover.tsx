import { useState } from "react";
import {
  LuEarth,
  LuBrain,
  LuFlaskConical,
  LuPaintbrush,
  LuHistory,
  LuAtom,
} from "react-icons/lu";
import { FaWikipediaW } from "react-icons/fa";
import { useMainPageContent } from "../hooks/useMainPageContent";

export default function Discover() {
  const { featuredArticle, loading, error } = useMainPageContent();
  const [isExpanded, setIsExpanded] = useState(false);
  const extractThreshold = 150;

  const topics = [
    {
      icon: <LuEarth className="w-10 h-10" />,
      title: "Geography",
      gradient: "from-emerald-800/90 via-green-900/80 to-teal-900",
    },
    {
      icon: <LuBrain className="w-10 h-10" />,
      title: "Psychology",
      gradient: "from-purple-800/90 via-purple-900/80 to-indigo-900",
    },
    {
      icon: <LuFlaskConical className="w-10 h-10" />,
      title: "Science",
      gradient: "from-blue-800/90 via-blue-900/80 to-cyan-900",
    },
    {
      icon: <LuPaintbrush className="w-10 h-10" />,
      title: "Art",
      gradient: "from-rose-800/90 via-pink-900/80 to-red-900",
    },
    {
      icon: <LuHistory className="w-10 h-10" />,
      title: "History",
      gradient: "from-amber-800/90 via-orange-900/80 to-red-900",
    },
    {
      icon: <LuAtom className="w-10 h-10" />,
      title: "Physics",
      gradient: "from-sky-800/90 via-blue-900/80 to-indigo-900",
    },
  ];

  // Calculate displayed extract
  const displayedExtract =
    featuredArticle &&
    featuredArticle.extract.length > extractThreshold &&
    !isExpanded
      ? featuredArticle.extract.slice(0, extractThreshold) + "..."
      : featuredArticle?.extract;

  return (
    <div className="min-h-screen bg-black text-white pb-[85px] max-w-2xl mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <div className="p-4">
        <h1 className="text-5xl font-serif font-bold text-white flex flex-col pt-10 pb-7">
          Discover
        </h1>

        {/* Featured Article Section */}
        <section className="mb-8">
          {loading ? (
            <div className="animate-pulse bg-neutral-800 h-40 rounded-lg" />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div
              className="relative bg-neutral-800/50 backdrop-blur-lg rounded-xl border border-white/10 shadow-md 
                      hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              <div className="absolute top-3 right-3">
                <div className="rounded-lg px-5 py-2 bg-neutral-900/70 backdrop-blur-lg text-white text-xs font-bold flex flex-row gap-2 items-center">
                  <FaWikipediaW />
                  Featured Article
                </div>
              </div>
              {featuredArticle?.thumbnail && (
                <img
                  src={featuredArticle.thumbnail}
                  alt={featuredArticle.title}
                  className="w-full h-48 object-cover rounded-t-xl mb-4"
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
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
              </div>
            </div>
          )}
        </section>

        {/* Topics Grid */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Browse Topics</h2>
          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${topic.gradient} p-6 rounded-xl flex flex-col items-start justify-center gap-3 
                hover:shadow-lg hover:shadow-emerald-900/20 hover:scale-105 transition-all duration-300 
                cursor-pointer border border-white/5`}
              >
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                  {topic.icon}
                </div>
                <span className="text-2xl font-semibold tracking-wide">
                  {topic.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
