
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AnalysisResults from "@/components/results/AnalysisResult";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedResult = sessionStorage.getItem("nextproof-analysis");

    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch {
        sessionStorage.removeItem("nextproof-analysis");
        router.replace("/analyze");
      }
    } else {
      router.replace("/analyze");
    }

    setChecked(true);
  }, [router]);

  if (!checked || !result) {
    return (
      <main className="min-h-screen bg-[#f8f7ff] p-8 text-center text-gray-600">
        Loading your analysis...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7ff] pt-8">
      <a
        href="/analyze"
        className="mx-auto mb-6 block w-fit text-sm font-medium text-violet-700 hover:text-violet-900"
      >
        ← Analyze another resume
      </a>

      <AnalysisResults result={result} />
    </main>
  );
}
