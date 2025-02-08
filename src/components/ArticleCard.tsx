import React from "react";

interface ArticleCardProps {
  title: string;
  snippet: string;
  thumbnail?: {
    source: string;
  };
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  actions?: React.ReactNode;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  snippet,
  thumbnail,
  onClick,
  actions,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-neutral-800/50 backdrop-blur-lg rounded-xl border border-white/10 shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        className || ""
      }`}
    >
      {actions && <div className="absolute inset-0 z-10">{actions}</div>}
      {thumbnail && (
        <img
          src={thumbnail.source}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <div className="p-4">
        <h3 className="font-bold text-3xl mb-2 font-serif text-white">
          {title}
        </h3>
        <p className="text-neutral-300">{snippet}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
