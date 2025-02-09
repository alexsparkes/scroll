import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaBookmark,
  FaCompass,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const { t } = useTranslation();
  const navigation = [
    {
      name: t("nav.home"),
      path: "/",
      icon: <FaHome size={20} />,
    },
    {
      name: t("nav.discover"),
      path: "/discover",
      icon: <FaCompass size={20} />,
    },
    {
      name: t("nav.search"),
      path: "/search",
      icon: <FaSearch size={20} />,
    },
    {
      name: t("nav.saved"),
      path: "/saved",
      icon: <FaBookmark size={20} />,
    },
    {
      name: t("nav.more"),
      path: "/more",
      icon: <FaEllipsisH size={20} />,
    },
  ];

  return (
    <nav className="h-[75px] fixed bottom-0 left-0 w-full bg-black lg:hidden">
      <div className="h-full max-w-md mx-auto flex justify-between items-center px-8 py-3">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex flex-col items-center transition-colors ${
                isActive ? "text-white" : "text-neutral-400"
              }`
            }
          >
            <div className="group-active:scale-90 group-active:opacity-70">
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
