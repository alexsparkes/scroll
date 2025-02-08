import {
  LuEarth,
  LuBrain,
  LuFlaskConical,
  LuPaintbrush,
  LuHistory,
  LuAtom,
  LuNewspaper,
  LuStar,
} from "react-icons/lu";
import { useMainPageContent } from "../hooks/useMainPageContent";

export default function Discover() {
  const { featuredArticle, inTheNews, loading, error } = useMainPageContent();

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

  return (
    <div className="min-h-screen bg-black text-white pb-[85px] max-w-2xl mx-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Discover</h1>

        {/* Featured Article Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <LuStar className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold">Today's Featured Article</h2>
          </div>
          {loading ? (
            <div className="animate-pulse bg-neutral-800 h-40 rounded-lg" />
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="bg-neutral-900 rounded-lg p-4">
              {featuredArticle.thumbnail && (
                <img
                  src={featuredArticle.thumbnail}
                  alt={featuredArticle.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold mb-2">{featuredArticle.title}</h3>
              <p className="text-neutral-400">{featuredArticle.extract}</p>
            </div>
          )}
        </section>

        {/* In The News Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <LuNewspaper className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">In The News</h2>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-neutral-800 h-20 rounded-lg"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {inTheNews.map((item, index) => (
                <div key={index} className="bg-neutral-900 rounded-lg p-4">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-neutral-400">{item.extract}</p>
                </div>
              ))}
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
