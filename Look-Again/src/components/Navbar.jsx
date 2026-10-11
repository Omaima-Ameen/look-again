
import { ArrowUpRight } from "lucide-react";
import Button from "./Button";

function Navbar({ onJournal }) {
  return (
    <nav className="flex items-center justify-between px-6 py-6 md:px-12">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group text-left"
      >
        <span className="text-xl font-semibold tracking-tight">
          look again<span className="text-[#78966d]">.</span>
        </span>
      </button>

      
<Button
  onClick={onJournal}
  variant="secondary"
  size="sm"
  icon={ArrowUpRight}
  className="border-[#18352a]/30 hover:border-[#18352a] hover:bg-[#18352a] hover:text-[#f4f1e8]"
>
  My field notes
</Button>

    </nav>
  );
}

export default Navbar;
