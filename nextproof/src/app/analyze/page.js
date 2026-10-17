
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnalyzeForm from "@/components/analyzer/AnalyzeForm";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-[#f8f7ff] pt-6">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2.5 text-sm font-medium text-violet-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-900"
        >
          <ArrowLeft size={17} strokeWidth={2} />
          Back to Home
        </Link>
      </div>

      <AnalyzeForm />
    </main>
  );
}
