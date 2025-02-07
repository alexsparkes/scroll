import {
  FaHome,
  FaBookmark,
  FaCompass,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="h-[75px] fixed bottom-0 left-0 w-full bg-black">
      <div className="h-full max-w-md mx-auto flex justify-around py-3 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="group-active:scale-90 group-active:opacity-70">
            <FaHome size={22} />
          </div>
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `group flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="group-active:scale-90 group-active:opacity-70">
            <FaCompass size={22} />
          </div>
          <span className="text-xs mt-1">Discover</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `group flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="group-active:scale-90 group-active:opacity-70">
            <FaSearch size={22} />
          </div>
          <span className="text-xs mt-1">Search</span>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `group flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="group-active:scale-90 group-active:opacity-70">
            <FaBookmark size={22} />
          </div>
          <span className="text-xs mt-1">Saved</span>
        </NavLink>
        <NavLink
          to="/more"
          className={({ isActive }) =>
            `group flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <div className="group-active:scale-90 group-active:opacity-70">
            <FaEllipsisH size={22} />
          </div>
          <span className="text-xs mt-1">More</span>
        </NavLink>
      </div>
    </nav>
  );
}
