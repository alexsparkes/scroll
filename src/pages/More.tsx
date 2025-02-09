import { version } from "../../package.json";
import { FaGithub, FaBriefcase } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function More() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-4 lg:ml-[200px] mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent flex flex-col gap-5">
      <header>
        <h1 className="text-5xl font-serif font-semibold text-white flex flex-col pt-10">
          Scroll
        </h1>
        <p className="text-neutral-400">
          v{version} • {t("more.created")} Alex Sparkes
        </p>
      </header>

      <section className="lg:w-[575px]">
        <div className="bg-neutral-900 rounded-lg p-6">
          <p className="text-neutral-400">{t("more.description")}</p>
        </div>
      </section>

      <section className="mb-6">
        <h1 className="text-xl text-white font-sans">{t("more.links")}</h1>
        <div className="space-y-4">
          <a
            href="https://github.com/alexsparkes/scroll"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:w-[575px] flex flex-row items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out bg-neutral-950 hover:bg-neutral-900 p-4 rounded-lg text-white"
          >
            <FaGithub className="text-neutral-300" />
            {t("more.repository")}
          </a>
          <a
            href="https://alexspark.es"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:w-[575px] flex flex-row items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out bg-neutral-950 hover:bg-neutral-900 p-4 rounded-lg text-white"
          >
            <FaBriefcase className="text-neutral-300" />
            {t("more.portfolio")}
          </a>
        </div>
      </section>

      <section>
        <LanguageSwitcher />
      </section>

      <section className="mb-6">
        <p className="text-neutral-400 text-sm">
          {t("more.wikipediaNotice", {
            defaultValue:
              "This product uses data from Wikipedia and is available under a Creative Commons Attribution-ShareAlike License. © Wikimedia Foundation. Additional terms may apply.",
          })}
        </p>
      </section>
    </div>
  );
}
