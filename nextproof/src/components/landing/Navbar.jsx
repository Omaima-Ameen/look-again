
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
      <a href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-600 text-lg font-bold text-white shadow-md shadow-violet-200">
          N
        </span>

        <span className="text-xl font-bold tracking-tight">
          nextproof<span className="text-violet-500">.</span>
        </span>
      </a>

      <div className="hidden items-center gap-8 text-sm text-gray-600 sm:flex">
        <a href="#how-it-works" className="hover:text-violet-600">
          How it works
        </a>
        <a href="/analyze" className="hover:text-violet-600">
          Get started
        </a>
      </div>

      <a
        href="/analyze"
        className="flex gap-1 rounded-full bg-[#19172e] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
      >
        Get started <ArrowUpRight size={17} />
      </a>
    </nav>
  );
}
