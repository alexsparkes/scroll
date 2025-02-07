import { version } from "../../package.json";

export default function More() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">More</h1>

      <section className="mb-6">
        <h2 className="text-xl mb-3 text-white">App Info</h2>
        <div className="bg-neutral-900 rounded-lg p-4">
          <p className="text-neutral-400">Version: {version}</p>
          <p className="text-neutral-400">Built with React + TypeScript</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl mb-3 text-white">Support</h2>
        <div className="space-y-4">
          <a
            href="https://github.com/alexsparkes/wiki-flick"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-all duration-300 ease-in-out block bg-neutral-950 hover:bg-neutral-900 p-4 rounded-lg text-white"
          >
            GitHub Repository
          </a>
        </div>
      </section>
    </div>
  );
}
