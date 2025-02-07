import React, { createContext, useContext, useState, useEffect } from "react";

type TopicContextType = {
  followedTopics: string[];
  toggleTopicFollow: (topicId: string) => void;
};

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: React.ReactNode }) {
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("followedTopics");
    if (saved) {
      setFollowedTopics(JSON.parse(saved));
    }
  }, []);

  const toggleTopicFollow = (topicId: string) => {
    setFollowedTopics((prev) => {
      const updated = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      localStorage.setItem("followedTopics", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TopicContext.Provider value={{ followedTopics, toggleTopicFollow }}>
      {children}
    </TopicContext.Provider>
  );
}

export const useTopics = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopics must be used within a TopicProvider");
  }
  return context;
};
