import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaBookmark,
  FaCompass,
  FaSearch,
  FaEllipsisH,
  FaGithub,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React from "react";

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

function NavItem({ to, label, icon }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg py-3 pl-3 w-full group flex justify-start flex-row items-center gap-5 hover:bg-neutral-600/40 hover:backdrop-blur-lg transition-all duration-400 ease-in-out ${
          isActive ? "text-white" : "text-neutral-400"
        }`
      }
    >
      <div className="group-active:scale-90 group-active:opacity-70">
        {icon}
      </div>
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="z-10 fixed top-0 left-0 h-full bg-black justify-center items-center hidden lg:flex">
      <div>
        <h1 className="text-white px-8 text-5xl font-serif py-3">Scroll</h1>
        <div className="h-full max-w-md mx-auto flex flex-col items-start px-6 py-3 gap-2">
          <NavItem to="/" label={t("nav.home")} icon={<FaHome size={28} />} />
          <NavItem
            to="/discover"
            label={t("nav.discover")}
            icon={<FaCompass size={28} />}
          />
          <NavItem
            to="/search"
            label={t("nav.search")}
            icon={<FaSearch size={28} />}
          />
          <NavItem
            to="/saved"
            label={t("nav.saved")}
            icon={<FaBookmark size={28} />}
          />
          <NavItem
            to="/more"
            label={t("nav.more")}
            icon={<FaEllipsisH size={28} />}
          />
          <a
            href="https://www.producthunt.com/posts/scroll-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-scroll&#0045;3"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=864320&theme=dark&t=1739202027209"
              alt="Scroll - Scroll Through Knowledge, TikTok Style. | Product Hunt"
              style={{ width: "200px", height: "43.2px" }}
              width="200"
              height="43.2"
            />
          </a>
          <span className="px-2 text-neutral-200 text-xs">
            © 2025{" "}
            <a
              href="https://alexspark.es"
              className="text-neutral-200 hover:text-white hover:underline transition-colors duration-200 active:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex Sparkes
            </a>
          </span>
          <span className="px-2 text-neutral-200 text-xs max-w-[200px]">
            {t("more.wikipediaNotice", {
              defaultValue:
                "This product uses data from Wikipedia and is available under a Creative Commons Attribution-ShareAlike License. © Wikimedia Foundation. Additional terms may apply.",
            })}
          </span>
          <span className="flex flex-row gap-2 px-2 text-neutral-200 text-xs">
            <a
              href="https://github.com/alexsparkes/scroll"
              className="flex flex-row items-center text-neutral-200 hover:text-white hover:underline transition-colors duration-200 active:opacity-80 gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={12} />
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://github.com/alexsparkes/scroll/blob/main/LICENSE"
              className="flex flex-row items-center text-neutral-200 hover:text-white hover:underline transition-colors duration-200 active:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
}
