
import { useState } from "react";
import {
  Leaf,
  Eye,
  RefreshCw,
  Link2,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "../components/Navbar";
import AttentionCard from "../components/AttentionCard";
import Button from "../components/Button";

const modes = [
  {
    id: "alive",
    icon: Leaf,
    title: "Something alive",
    description: "Look for the little signs of life around you.",
    number: "01",
  },
  {
    id: "overlooked",
    icon: Eye,
    title: "The overlooked",
    description: "See something familiar with unfamiliar eyes.",
    number: "02",
  },
  {
    id: "changing",
    icon: RefreshCw,
    title: "A world in change",
    description: "Find a tiny sign that time is passing.",
    number: "03",
  },
  {
    id: "connection",
    icon: Link2,
    title: "Hidden connections",
    description: "Discover how two things affect one another.",
    number: "04",
  },
  {
    id: "human",
    icon: Building2,
    title: "Human ingenuity",
    description: "Notice the thought behind something built.",
    number: "05",
  },
  {
    id: "surprise",
    icon: Sparkles,
    title: "Surprise me",
    description: "Follow your curiosity somewhere unexpected.",
    number: "06",
  },
];

function AttentionModes({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#17271b] font-sans text-[#f0f0df]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/60 via-[#142218]/80 to-[#101b12]" />

      <div className="relative z-10">
        <Navbar onJournal={() => {}} />

        <section className="mx-auto max-w-350 px-5 pb-12 pt-8 md:px-12 md:pt-12 lg:px-20">
          <Button
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            className="mb-12 md:mb-16"
          >
            Back
          </Button>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl text-[clamp(54px,7vw,88px)] font-medium leading-[0.92] tracking-[-0.075em]"
              >
                How will
                <br />
                you look
                <br />
                <span className="font-normal italic text-[#b7cc99] font-['Playfair_Display',serif]">
                  today?
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 hidden max-w-xs items-center gap-4 border-t border-[#dce5c9]/15 pt-6 lg:flex"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dce5c9]/20 bg-[#dce5c9]/5">
                  <Leaf size={18} className="text-[#b7cc99]" />
                </div>
                <p className="text-xs leading-5 text-[#b3c1a7]">
                  No right answers. No rush.
                  <br />
                  Just a world worth noticing.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#b7c6aa]">
                  Choose your attention
                </span>
               
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {modes.map((mode, index) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.4,
                    }}
                  >
                    <AttentionCard
                      mode={mode}
                      selected={selected === mode.id}
                      onSelect={setSelected}
                    />
                  </motion.div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {selected && (
                  <motion.p
                    key={selected}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-4 flex items-center gap-2 text-xs text-[#c1d0ad]"
                  >
                    <Check size={14} />
                    A little curiosity can change an ordinary day.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-7 flex flex-col gap-4 border-t border-[#dce5c9]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                

                <Button
                  onClick={() => onContinue(selected)}
                  disabled={!selected}
                  size="lg"
                  icon={ArrowRight}
                  className={
                    !selected
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }
                >
                  Find my question
                </Button>
              </div>
            </div>
          </div>

          <footer className="mt-14 flex items-center justify-between border-t border-[#dce5c9]/10 pt-5 text-[9px] uppercase tracking-[0.2em] text-[#9ead91] md:mt-20">
            <span>Look closer</span>
            <span className="flex items-center gap-2">
              <Leaf size={12} />
              Stay curious
            </span>
          </footer>
        </section>
      </div>
    </motion.main>
  );
}

export default AttentionModes;
