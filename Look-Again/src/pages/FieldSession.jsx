
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "../components/Button";

const SESSION_SECONDS = 180;

const WORDS = [
  { text: "GO", className: "text-[23vw] sm:text-[20vw]" },
  { text: "AWAY.", className: "text-[25vw] sm:text-[22vw] text-[#b7cc99]" },
  { text: "AND", className: "text-[22vw] sm:text-[19vw]" },
  { text: "NOTICE", className: "text-[16vw] sm:text-[14vw] text-[#b7cc99]" },
  {
    text: "everything.",
    className:
      "text-[14vw] sm:text-[12vw] font-normal italic lowercase tracking-[-0.085em] [font-family:'Playfair_Display',serif]",
  },
];

function FieldSession({ onBack, onFinish }) {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [isPaused, setIsPaused] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Reveal each word, one at a time.
  useEffect(() => {
    if (introFinished) return;

    if (wordIndex >= WORDS.length) {
      const finishTimeout = window.setTimeout(() => {
        setIntroFinished(true);
      }, 500);

      return () => window.clearTimeout(finishTimeout);
    }

    const wordTimeout = window.setTimeout(() => {
      setWordIndex((index) => index + 1);
    }, 850);

    return () => window.clearTimeout(wordTimeout);
  }, [wordIndex, introFinished]);

  // Start the actual session only after the intro.
  useEffect(() => {
    if (!introFinished || isPaused || secondsLeft === 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [introFinished, isPaused, secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const complete = secondsLeft === 0;

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#17271b] text-[#f0f0df]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.13]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/50 via-transparent to-[#101b12]/70" />

      <div className="relative z-10 flex min-h-screen flex-col px-4 py-4 sm:px-7 sm:py-6">
        <header className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            showIcon
          />

          <span className="text-xs tracking-tight sm:text-sm">
            look again<span className="text-[#b7cc99]">.</span>
          </span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-5">
          <AnimatePresence mode="wait">
            {!introFinished ? (
              <motion.div
                key="intro"
                className="flex min-h-[65vh] flex-col items-center justify-center"
                exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              >
                <div
                  className="relative flex h-64 w-full items-center justify-center sm:h-80"
                  aria-live="polite"
                  aria-label={WORDS
                    .slice(0, wordIndex)
                    .map((word) => word.text)
                    .join(" ")}
                >
                  <AnimatePresence mode="wait">
                    {wordIndex < WORDS.length && (
                      <motion.h1
                        key={WORDS[wordIndex].text}
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`absolute whitespace-nowrap text-center font-semibold uppercase leading-none tracking-[-0.09em] ${WORDS[wordIndex].className}`}
                      >
                        {WORDS[wordIndex].text}
                      </motion.h1>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="mt-5 flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-[#b7cc99]/30" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#b7c7aa]">
                    Leave the noise behind
                  </span>
                  <span className="h-px w-8 bg-[#b7cc99]/30" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="timer"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="flex flex-1 flex-col justify-center"
              >
                <div className="w-full text-center">
                  <h1 className="text-center text-[clamp(2rem,5vw,4rem)] font-normal tracking-[-0.06em]">
                    Take your time<span className="text-[#b7cc99]">.</span>
                  </h1>

                  <div className="my-7 flex items-center gap-3 sm:my-10">
                    <div className="h-px flex-1 bg-[#b7cc99]/30" />
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#b7c7aa] sm:text-[10px]">
                      {complete
                        ? "Moment complete"
                        : isPaused
                          ? "Paused"
                          : "Look closer"}
                    </span>
                    <div className="h-px flex-1 bg-[#b7cc99]/30" />
                  </div>

                  <div
                    className="w-full py-5 text-center font-medium leading-[0.85] tracking-[-0.09em] tabular-nums sm:py-8 lg:py-10"
                    style={{ fontSize: "clamp(6rem, 23vw, 20rem)" }}
                    aria-label={`${minutes} minutes ${seconds} seconds remaining`}
                    aria-live="off"
                  >
                    {minutes}
                    <span className="text-[#b7cc99]">:</span>
                    {seconds}
                  </div>

                  <div className="mt-8 flex w-full flex-col items-center gap-5 sm:mt-12 sm:gap-6">
                    {(isPaused || complete) && (
                      <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#b7cc99]/80">
                        {complete
                          ? "Your moment is complete"
                          : "Ready to capture your moment?"}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                      {!complete && (
                        <Button
                          onClick={() => setIsPaused((value) => !value)}
                          variant="secondary"
                          size="md"
                          icon={isPaused ? Play : Pause}
                          showIcon
                          className="border-[#dce5c9]/20 bg-[#dce5c9]/4 text-[#dce5c9] backdrop-blur-md hover:border-[#b7cc99]/50 hover:bg-[#dce5c9]/10"
                        >
                          {isPaused ? "Resume session" : "Pause"}
                        </Button>
                      )}

                      {(isPaused || complete) && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Button
                            onClick={onFinish}
                            size="lg"
                            icon={ArrowUpRight}
                            showIcon
                          >
                            I've noticed something
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="flex items-center justify-between border-t border-[#dce5c9]/15 pt-3">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#a5b69a]">
            Look slowly.
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#a5b69a]">
            Be here now.
          </span>
        </footer>
      </div>
    </main>
  );
}

export default FieldSession;
