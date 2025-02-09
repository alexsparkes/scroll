import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        className={`px-2 py-1 rounded ${
          i18n.language === "en"
            ? "bg-[#341F97] text-white"
            : "bg-neutral-800 text-neutral-400"
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded ${
          i18n.language === "es"
            ? "bg-[#341F97] text-white"
            : "bg-neutral-800 text-neutral-400"
        }`}
        onClick={() => changeLanguage("es")}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
