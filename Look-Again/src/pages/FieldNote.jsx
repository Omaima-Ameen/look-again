
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Leaf } from "lucide-react";
import { motion } from "motion/react";
import Button from "../components/Button";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function FieldNote({ mode, reflection = "", note, onBack, onNewNote, onJournal }) {
  const [generatedNote, setGeneratedNote] = useState(note || null);
  const [generating, setGenerating] = useState(!note);
  const [generationError, setGenerationError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (note) {
      setGeneratedNote(note);
      setGenerating(false);
      setGenerationError("");
      return;
    }

    let cancelled = false;

    async function generateNote() {
      if (!reflection.trim()) {
        setGenerating(false);
        setGenerationError(
          "Your observation is missing. Go back and write what you noticed."
        );
        return;
      }

      setGenerating(true);
      setGenerationError("");

      try {
        const response = await fetch(
          `${API_URL}/api/generate-note`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: mode || "surprise",
              reflection: reflection.trim(),
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Could not generate your field note."
          );
        }

        if (
          typeof data.note?.insight !== "string" ||
          typeof data.note?.question !== "string" ||
          !data.note.insight.trim() ||
          !data.note.question.trim()
        ) {
          throw new Error(
            "Gemma returned an incomplete field note. Please try again."
          );
        }

        if (!cancelled) {
          setGeneratedNote({
            ...data.note,
            observation: reflection.trim(),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setGenerationError(
            error.message || "Could not generate your field note."
          );
        }
      } finally {
        if (!cancelled) setGenerating(false);
      }
    }

    generateNote();

    return () => {
      cancelled = true;
    };
  }, [mode, reflection, note]);

  const insight = generatedNote?.insight || "";
  const question = generatedNote?.question || "";

  async function handleSave() {
    if (saving || saved || !generatedNote || !reflection.trim()) return;

    setSaving(true);
    setSaveError("");

    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: mode || "surprise",
          reflection: reflection.trim(),
          title: "A moment, noticed.",
          insight,
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save your field note.");
      }

      setSaved(true);
    } catch (error) {
      setSaveError(error.message || "Could not save your field note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#17271b] text-[#f0f0df]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.10]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/70 via-[#142218]/85 to-[#101b12]"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <header className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            aria-label="Go back"
          />

          <span className="text-sm tracking-tight">
            look again<span className="text-[#b7cc99]">.</span>
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-[#b7cc99] sm:text-[10px]">
            Field note
          </span>
        </header>

        <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-12 sm:py-16">
          {generating ? (
            <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
              <Leaf
                size={26}
                className="mb-5 animate-pulse text-[#b7cc99]"
              />

              <h1 className="text-2xl font-medium tracking-tight text-[#f0f0df] sm:text-3xl">
                Making sense of your observation…
              </h1>

              <p className="mt-3 text-base text-[#dce5c9]/70">
                Gemma is shaping your field note.
              </p>

              <div className="mt-7 h-px w-24 overflow-hidden bg-[#b7cc99]/20">
                <div className="h-full w-1/2 animate-pulse bg-[#b7cc99]" />
              </div>
            </div>
          ) : generationError ? (
            <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
              <p
                role="alert"
                className="max-w-md text-base leading-7 text-[#e9b9a4]"
              >
                {generationError}
              </p>

              <div className="mt-6">
                <Button
                  onClick={onBack}
                  variant="secondary"
                  size="md"
                  showIcon={false}
                  className="border-[#dce5c9]/25 text-[#f0f0df] hover:bg-[#dce5c9]/10"
                >
                  Go back and try again
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="grid gap-12 md:grid-cols-[1fr_0.75fr] md:gap-16"
            >
              <div className="flex flex-col justify-center">
                <p className="mb-6 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                  What you noticed
                </p>

                <p className="whitespace-pre-wrap wrap-break text-3xl leading-snug tracking-[-0.04em] text-[#f0f0df] sm:text-4xl lg:text-5xl">
                  {reflection.trim()}
                </p>

                <div className="mt-10 border-t border-[#dce5c9]/15 pt-7">
                  <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                    What it might mean
                  </p>

                  <p className="max-w-2xl text-base leading-8 text-[#dce5c9]/85 sm:text-lg">
                    {insight}
                  </p>
                </div>
              </div>

              <aside className="flex flex-col justify-center border-t border-[#dce5c9]/15 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                  <Leaf size={14} />
                  A question it raises
                </div>

                <p className="text-2xl italic leading-snug tracking-[-0.03em] text-[#e3e8d3] font-['Playfair_Display',serif] sm:text-3xl">
                  {question}
                </p>
              </aside>
            </motion.div>
          )}

          {saveError && (
            <p role="alert" className="mt-6 text-sm text-[#e9b9a4]">
              {saveError}
            </p>
          )}

          {!generating && !generationError && (
            <div className="mt-14 flex flex-col gap-4 border-t border-[#dce5c9]/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
              {saved ? (
                <>
                  <p className="text-sm text-[#b7cc99]" role="status">
                    <Leaf size={15} className="mr-2 inline-block align-middle" />
                    Saved to your field notes.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={onNewNote}
                      size="md"
                      icon={ArrowUpRight}
                    >
                      Notice something else
                    </Button>

                    <Button
                      onClick={onJournal}
                      variant="secondary"
                      size="md"
                      showIcon={false}
                      className="border-[#dce5c9]/25 text-[#dce5c9] hover:bg-[#dce5c9]/10"
                    >
                      My field notes
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={saving || !generatedNote || !reflection.trim()}
                  loading={saving}
                  size="lg"
                  icon={ArrowUpRight}
                  className="self-start disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Keeping your moment…" : "Keep this moment"}
                </Button>
              )}
            </div>
          )}
        </section>

        <footer className="flex items-center justify-between border-t border-[#dce5c9]/15 pt-4">
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#9eaf91]">
            Less screen. More world.
          </span>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[#b7cc99]">
            Remember what you notice.
          </span>
        </footer>
      </div>
    </motion.main>
  );
}

export default FieldNote;
