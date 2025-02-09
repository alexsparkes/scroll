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
        `group flex justify-start flex-row items-center transition-colors gap-5 ${
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
  return (
    <nav className="z-10 fixed top-0 left-0 h-full bg-black justify-center items-center hidden lg:flex">
      <div>
        <h1 className="text-white px-8 text-5xl font-serif py-3">Scroll</h1>
        <div className="h-full max-w-md mx-auto flex flex-col items-start px-8 py-3 gap-8">
          <NavItem to="/" label="Home" icon={<FaHome size={28} />} />
          <NavItem
            to="/discover"
            label="Discover"
            icon={<FaCompass size={28} />}
          />
          <NavItem to="/search" label="Search" icon={<FaSearch size={28} />} />
          <NavItem to="/saved" label="Saved" icon={<FaBookmark size={28} />} />
          <NavItem to="/more" label="More" icon={<FaEllipsisH size={28} />} />
        </div>
      </div>
    </nav>
  );
}
