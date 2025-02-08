import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className="p-4 max-w-md mx-auto bg-gradient-to-b from-[#341F97]/25 to-transparent">
      <h1 className="text-5xl font-bold mb-6 text-white font-serif pt-10">
        Search
      </h1>
      <form className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="placeholder-white w-full px-4 py-2 pl-10 pr-4 bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          title="Search"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <FaSearch className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
}
