import {
  LuEarth,
  LuBrain,
  LuFlaskConical,
  LuPaintbrush,
  LuHistory,
  LuAtom,
} from "react-icons/lu";

export default function Discover() {
  const topics = [
    {
      icon: <LuEarth className="w-12 h-12" />,
      title: "Geography",
      gradient: "from-emerald-800/90 via-green-900/80 to-teal-900",
    },
    {
      icon: <LuBrain className="w-12 h-12" />,
      title: "Psychology",
      gradient: "from-purple-800/90 via-purple-900/80 to-indigo-900",
    },
    {
      icon: <LuFlaskConical className="w-12 h-12" />,
      title: "Science",
      gradient: "from-blue-800/90 via-blue-900/80 to-cyan-900",
    },
    {
      icon: <LuPaintbrush className="w-12 h-12" />,
      title: "Art",
      gradient: "from-rose-800/90 via-pink-900/80 to-red-900",
    },
    {
      icon: <LuHistory className="w-12 h-12" />,
      title: "History",
      gradient: "from-amber-800/90 via-orange-900/80 to-red-900",
    },
    {
      icon: <LuAtom className="w-12 h-12" />,
      title: "Physics",
      gradient: "from-sky-800/90 via-blue-900/80 to-indigo-900",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-[85px] max-w-2xl mx-auto">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Discover Topics</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
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
            <span className="text-2xl font-bold">{topic.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
