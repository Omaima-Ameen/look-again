import { Check, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

function AttentionCard({ mode, selected, onSelect }) {
  const Icon = mode.icon;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(mode.id)}
      aria-pressed={selected}
      className={`group relative w-full overflow-hidden rounded-[24px] border p-5 text-left transition-all duration-300 sm:p-6 ${
        selected
          ? "border-[#b7cc99]/60 bg-[#82966a]/20 shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
          : "border-[#dce5c9]/15 bg-[#dce5c9]/[0.045] hover:border-[#b7cc99]/40 hover:bg-[#dce5c9]/[0.09]"
      }`}
    >
      {/* Subtle selected glow */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#b7cc99]/10 blur-3xl transition-opacity duration-500 ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-70"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
            selected
              ? "border-[#b7cc99]/30 bg-[#b7cc99]/20 text-[#dce8c9]"
              : "border-[#dce5c9]/10 bg-[#dce5c9]/[0.06] text-[#b7cc99] group-hover:border-[#b7cc99]/25 group-hover:bg-[#b7cc99]/10"
          }`}
        >
          <Icon size={21} strokeWidth={1.4} />
        </div>

        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 ${
            selected
              ? "scale-100 border-[#dce8c9] bg-[#dce8c9] text-[#1b3020]"
              : "border-[#dce5c9]/25 text-transparent group-hover:border-[#b7cc99]/60"
          }`}
        >
          <Check size={13} strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative mt-8 flex items-end justify-between gap-3">
        <h3
          className={`max-w-[230px] text-xl font-medium leading-snug tracking-[-0.045em] transition-colors duration-300 sm:text-[22px] ${
            selected
              ? "text-[#f0f0df]"
              : "text-[#e2e8d8] group-hover:text-white"
          }`}
        >
          {mode.title}
        </h3>

        <ArrowUpRight
          size={17}
          className={`mb-1 shrink-0 transition-all duration-300 ${
            selected
              ? "translate-x-0.5 -translate-y-0.5 text-[#b7cc99]"
              : "text-[#9eaf91]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#b7cc99]"
          }`}
        />
      </div>

      <p
        className={`relative mt-3 max-w-sm text-[13px] leading-6 transition-colors duration-300 ${
          selected ? "text-[#d8e1cc]" : "text-[#aebda5]"
        }`}
      >
        {mode.description}
      </p>

      <div
        className={`absolute bottom-0 left-5 right-5 h-px transition-all duration-500 sm:left-6 sm:right-6 ${
          selected
            ? "bg-gradient-to-r from-transparent via-[#b7cc99]/70 to-transparent"
            : "bg-transparent"
        }`}
      />
    </motion.button>
  );
}

export default AttentionCard;