import { version } from "../../package.json";
import { FaGithub, FaBriefcase } from "react-icons/fa";

export default function More() {
  return (
    <div className="min-h-screen p-4 lg:w-[575px] mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent flex flex-col gap-5">
      <header>
        <h1 className="text-5xl font-serif font-bold text-white flex flex-col pt-10">
          Scroll
        </h1>
        <p className="text-neutral-400">v{version} • Created by Alex Sparkes</p>
      </header>

      <section className="">
        <div className="bg-neutral-900 rounded-lg p-6">
          <p className="text-neutral-400">A Tiktok style wikipedia reader.</p>
        </div>
      </section>

      <section className="mb-6">
        <h1 className="text-xl text-white font-sans">Links</h1>
        <div className="space-y-4">
          <a
            href="https://github.com/alexsparkes/wiki-flick"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out bg-neutral-950 hover:bg-neutral-900 p-4 rounded-lg text-white"
          >
            <FaGithub className="text-neutral-300" />
            GitHub Repository
          </a>
          <a
            href="https://github.com/alexsparkes/wiki-flick"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out bg-neutral-950 hover:bg-neutral-900 p-4 rounded-lg text-white"
          >
            <FaBriefcase className="text-neutral-300" />
            Portfolio
          </a>
        </div>
      </section>
    </div>
  );
}
