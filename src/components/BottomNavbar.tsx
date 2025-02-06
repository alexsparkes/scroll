import { FaHome, FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="h-[100px] fixed bottom-0 left-0 w-full bg-black">
      <div className="h-full max-w-md mx-auto flex justify-around py-3 flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <FaHome size={22} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center transition-colors ${
              isActive ? "text-white" : "text-neutral-400"
            }`
          }
        >
          <FaBookmark size={22} />
          <span className="text-xs mt-1">Saved</span>
        </NavLink>
      </div>
    </nav>
  );
}
