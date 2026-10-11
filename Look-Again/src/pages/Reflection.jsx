
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Leaf, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Button from "../components/Button";


function Reflection({ onBack, onContinue }) {
  const [reflection, setReflection] = useState("");

  const canContinue = reflection.trim().length >= 3;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#17271b] text-[#f0f0df]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/60 via-[#142218]/75 to-[#101b12]" />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            aria-label="Return to your field session"
          />

          
        </header>

        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#b7cc99]">
              <Leaf size={14} strokeWidth={1.4} />
              You were paying attention
            </p>

            <h1 className="text-[clamp(3.6rem,10vw,9rem)] font-medium uppercase leading-[0.8] tracking-[-0.085em]">
              WHAT DID
              <br />
              YOU <span className="text-[#b7cc99]">NOTICE?</span>
            </h1>

            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-10 border-y border-[#dce5c9]/20 py-5 sm:mt-14 sm:py-7"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <label
                htmlFor="field-reflection"
                className="text-[10px] uppercase tracking-[0.22em] text-[#b7cc99]"
              >
                Your observation
              </label>

              <span className="text-xs tabular-nums text-[#9eaf91]">
                {reflection.length} characters
              </span>
            </div>

            <textarea
              id="field-reflection"
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
              placeholder="I noticed..."
              rows={4}
              maxLength={2000}
              autoFocus
              className="w-full resize-y bg-transparent text-xl leading-relaxed tracking-[-0.035em] text-[#f0f0df] outline-none placeholder:text-[#9eaf91]/50 sm:text-2xl lg:text-3xl"
            />

            <div className="mt-5 flex items-center gap-2 text-[10px] text-[#9eaf91]">
              <Sparkles size={13} className="text-[#b7cc99]" />
              There are no right or wrong observations.
            </div>
          </motion.div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
           

            <Button
              onClick={() => onContinue(reflection.trim())}
              disabled={!canContinue}
              size="lg"
              icon={ArrowUpRight}
              className={
                canContinue
                  ? "self-start sm:self-auto"
                  : "self-start cursor-not-allowed border border-[#dce5c9]/15 bg-[#dce5c9]/5 text-[#879681] opacity-60 sm:self-auto"
              }
            >
              Create my field note
            </Button>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-[#dce5c9]/15 pt-4">
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#9eaf91]">
            A small thing, remembered.
          </span>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[#b7cc99]">
            Look closer
          </span>
        </footer>
      </div>
    </motion.main>
  );
}

export default Reflection;
