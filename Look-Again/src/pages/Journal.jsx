
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Leaf,
  LoaderCircle,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../components/Button";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function formatDate(value) {
  if (!value) return "A moment noticed";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function Journal({ onBack }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load your field notes.");
      }

      const data = await response.json();
      setNotes(Array.isArray(data.notes) ? data.notes : []);
    } catch {
      setError(
        "Your notes couldn't be reached. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function deleteNote(id) {
    const confirmed = window.confirm(
      "Delete this field note permanently?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Could not delete this note.");
      }

      setNotes((current) => current.filter((note) => note.id !== id));

      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    } catch {
      setError("This note couldn't be deleted. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden bg-[#17271b] text-[#f0f0df]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#142218]/60 via-[#142218]/80 to-[#101b12]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-375 flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
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
            Your archive
          </span>
        </header>

        <section className="flex-1 py-14 sm:py-20">
          <div className="flex flex-col justify-between gap-8 border-b border-[#dce5c9]/15 pb-10 sm:flex-row sm:items-end sm:pb-12">
            <div>
              <p className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#b7cc99]">
                <Leaf size={14} />
                A collection of attention
              </p>

              <h1 className="text-[clamp(4rem,11vw,10rem)] font-medium leading-[0.78] tracking-[-0.09em]">
                Field
                <br />
                <span className="font-normal italic text-[#b7cc99] font-['Playfair_Display',serif]">
                  notes.
                </span>
              </h1>

              
            </div>

            <div className="flex items-center gap-4 self-start rounded-full border border-[#dce5c9]/15 bg-[#dce5c9]/4 px-5 py-3 sm:self-auto">
              <BookOpen size={17} className="text-[#b7cc99]" />
              <span className="text-sm text-[#e2e8d8]">
                {notes.length} {notes.length === 1 ? "memory" : "memories"}
              </span>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d8a38c]/25 bg-[#d8a38c]/6 p-5 text-sm text-[#e9c3b1]"
            >
              <p>{error}</p>
              <Button
                onClick={loadNotes}
                variant="secondary"
                size="sm"
                showIcon={false}
                className="text-[#e9c3b1]"
              >
                Try again
              </Button>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-[#b7c7aa]">
              <LoaderCircle size={19} className="animate-spin" />
              Gathering your moments...
            </div>
          ) : notes.length === 0 ? (
            <div className="flex min-h-[45vh] flex-col items-center justify-center py-16 text-center">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#b7cc99]/25 bg-[#b7cc99]/6">
                <Leaf
                  size={25}
                  strokeWidth={1.2}
                  className="text-[#b7cc99]"
                />
              </div>

              <h2 className="text-3xl font-medium tracking-tighter sm:text-5xl">
                Nothing here.{" "}
                <span className="italic text-[#b7cc99]">Yet.</span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#aebda2]">
                Your first field note begins with one small thing you choose
                to notice.
              </p>

              <div className="mt-8">
                <Button onClick={onBack} size="lg" icon={ArrowUpRight}>
                  Go notice something
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {notes.map((note, index) => (
                <motion.article
                  key={note.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.06, 0.3) }}
                  className="group relative self-start rounded-xl border border-[#dce5c9]/15 bg-[#dce5c9]/4.5 p-4 transition duration-300 hover:border-[#b7cc99]/35 hover:bg-[#dce5c9]/[0.07]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#b7cc99]">
                      {formatDate(note.created_at)}
                    </span>

                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      disabled={deletingId === note.id}
                      aria-label="Delete field note"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[#9eaf91] transition hover:bg-[#d8a38c]/10 hover:text-[#e9b9a4] disabled:opacity-40"
                    >
                      {deletingId === note.id ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedNote(note)}
                    className="mt-5 flex w-full flex-col text-left"
                  >
                    <h2 className="text-xl font-medium leading-tight tracking-tighter text-[#edf0e2] sm:text-2xl">
                      {note.reflection}
                    </h2>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs text-[#b7cc99]">
                      Read field note
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        <footer className="flex items-center justify-between border-t border-[#dce5c9]/15 pt-4">
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#9eaf91]">
            Less screen. More world.
          </span>

          <span className="text-[9px] uppercase tracking-[0.18em] text-[#b7cc99]">
            Keep looking.
          </span>
        </footer>
      </div>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0b140e]/85 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setSelectedNote(null)}
          >
            <motion.article
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="my-auto w-full max-w-2xl rounded-[28px] border border-[#dce5c9]/15 bg-[#17271b] p-6 shadow-2xl sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#b7cc99]">
                  {formatDate(selectedNote.created_at)}
                </span>

                <Button
                  onClick={() => setSelectedNote(null)}
                  variant="secondary"
                  size="sm"
                  icon={X}
                  aria-label="Close field note"
                />
              </div>

              <section className="mt-9">
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                  What you noticed
                </p>

                <h2 className="whitespace-pre-wrap wrap-break text-3xl font-medium leading-snug tracking-[-0.045em] text-[#f0f0df] sm:text-4xl">
                  {selectedNote.reflection}
                </h2>
              </section>

              <section className="mt-9 border-t border-[#dce5c9]/15 pt-7">
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                  What it might mean
                </p>

                <p className="whitespace-pre-wrap text-base leading-8 text-[#c3ceba]">
                  {selectedNote.insight?.trim() ||
                    "No interpretation was saved for this observation."}
                </p>
              </section>

              <section className="mt-8 border-l border-[#b7cc99]/50 pl-5">
                <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#b7cc99]">
                  A question it raises
                </p>

                <p className="whitespace-pre-wrap text-xl italic leading-relaxed text-[#e3e8d3] font-['Playfair_Display',serif] sm:text-2xl">
                  {selectedNote.question?.trim() ||
                    "What else might you discover if you look a little closer?"}
                </p>
              </section>

              <div className="mt-9 border-t border-[#dce5c9]/15 pt-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#9eaf91]">
                  Less screen. More world.
                </p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default Journal;
