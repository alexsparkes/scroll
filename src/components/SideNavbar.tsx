import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaBookmark,
  FaCompass,
  FaSearch,
  FaEllipsisH,
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
        `rounded-lg py-3 pl-3 w-full group flex justify-start flex-row items-center gap-5 hover:bg-neutral-600/40 hover:backdrop-blur-lg transition-all duration-200 ease-in-out ${
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
        <div className="h-full max-w-md mx-auto flex flex-col items-start px-6 py-3 gap-3">
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
        </div>
      </div>
    </nav>
  );
}
