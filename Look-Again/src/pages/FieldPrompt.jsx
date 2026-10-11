
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Leaf,
  Sparkles,
 
} from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const modeLabels = {
  alive: "The living world",
  overlooked: "A second look",
  changing: "The passage of time",
  connection: "Hidden connections",
  human: "Human ingenuity",
  surprise: "Follow your curiosity",
};

const modeGuidance = {
  alive:
    "Help the user notice subtle details of a living thing, such as its texture, movement, growth, or signs of life.",
  overlooked:
    "Guide the user to examine a familiar, overlooked object or place from a fresh perspective.",
  changing:
    "Help the user discover subtle evidence of change, time, growth, weathering, or movement.",
  connection:
    "Invite the user to notice two seemingly unrelated things and look for a possible relationship.",
  human:
    "Guide the user to examine something made or changed by humans and consider the problem it might solve.",
  surprise:
    "Invite the user to follow an unexpected detail that naturally catches their attention.",
};

function FieldPrompt({ mode, onBack, onBegin }) {
  const selectedMode = modeLabels[mode] ? mode : "surprise";
  const label = modeLabels[selectedMode];

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function generateQuestion() {
      setLoading(true);
      setError("");
      setQuestion("");

      try {
        const response = await fetch(
          "http://localhost:5000/api/generate-prompt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            signal: controller.signal,
            body: JSON.stringify({
              mode: selectedMode,
              modeLabel: label,
              guidance: modeGuidance[selectedMode],
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Could not generate your question."
          );
        }

        if (
          typeof data.question !== "string" ||
          !data.question.trim()
        ) {
          throw new Error("Gemma returned an empty question.");
        }

        setQuestion(data.question.trim());
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.message || "Could not generate your question."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    generateQuestion();

    return () => controller.abort();
  }, [selectedMode, label]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-hidden bg-[#17271b] font-sans text-[#f0f0df]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/60 via-[#142218]/75 to-[#101b12]"
      />

      <div className="relative z-10">
       
<Navbar onJournal={() => window.dispatchEvent(new Event("open-journal"))} />


        <section className="relative mx-auto flex min-h-[82vh] max-w-350 flex-col justify-center px-6 py-14 md:px-16 lg:px-24">
          {/* Quiet navigation instead of a prominent button */}
          <motion.button
            type="button"
            onClick={onBack}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.25 }}
            className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-[#bdcbb0]/80 transition-colors hover:text-[#f0f0df] md:left-16 lg:left-24"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            <span>Choose another path</span>
          </motion.button>

          <div className="relative z-10 mx-auto w-full max-w-5xl pt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b7cc99]/25 bg-[#b7cc99]/10 text-[#c9d9b5]">
                <Leaf size={17} strokeWidth={1.4} />
              </span>

              <span className="text-[10px] uppercase tracking-[0.28em] text-[#c1d0ad] md:text-xs">
                {label}
              </span>
            </motion.div>

            {loading ? (
              <div
                className="mx-auto flex min-h-52 items-center justify-center"
                role="status"
                aria-label="Finding your question"
              >
                <div className="relative flex h-36 w-44 items-center justify-center">
                  <div className="absolute h-20 w-20 rounded-full bg-[#b7cc99]/10 blur-2xl" />

                  <motion.div
                    animate={{ y: [0, -9, 0], rotate: [-12, 2, -12] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-5 top-7 text-[#78966d]"
                  >
                    <Leaf size={23} strokeWidth={1.2} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 8, 0], rotate: [15, 28, 15] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute right-6 top-5 text-[#b7cc99]"
                  >
                    <Leaf size={18} strokeWidth={1.2} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [35, 20, 35] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute bottom-5 left-10 text-[#b7cc99]/70"
                  >
                    <Leaf size={16} strokeWidth={1.2} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 7, 0], rotate: [-25, -8, -25] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute bottom-6 right-8 text-[#78966d]"
                  >
                    <Leaf size={25} strokeWidth={1.2} />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative text-[#dce8c9]"
                  >
                    <Leaf size={38} strokeWidth={1.1} />
                  </motion.div>
                </div>
              </div>
            ) : error ? (
              <div className="mx-auto max-w-2xl" role="alert">
                <p className="text-base leading-7 text-[#e9b9a4]">
                  {error}
                </p>

                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="secondary"
                    size="md"
                    showIcon={false}
                    className="border-[#dce5c9]/25 text-[#f0f0df] hover:bg-[#dce5c9]/10"
                  >
                    Try again
                  </Button>
                </div>
              </div>
            ) : (
              <motion.h1
                key={`${selectedMode}-${question}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mx-auto max-w-4xl text-[clamp(36px,5.5vw,72px)] font-medium leading-[0.9] tracking-tighter"
              >
                {question}
              </motion.h1>
            )}

            <div className="mt-10 flex justify-center">
              <Button
                onClick={onBegin}
                disabled={loading || Boolean(error) || !question}
                size="lg"
                icon={ArrowRight}
                className="disabled:cursor-not-allowed disabled:opacity-50"
              >
                Put phone away
              </Button>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-between border-t border-[#dce5c9]/15 pt-5 text-[9px] uppercase tracking-[0.2em] text-[#a5b69a] md:mt-24">
            <span className="flex items-center gap-2">
              <Sparkles size={12} />
              Take your time
            </span>

            <span className="hidden sm:block">
              The world can wait for your attention.
            </span>

           
          </div>
        </section>
      </div>
    </motion.main>
  );
}

export default FieldPrompt;
