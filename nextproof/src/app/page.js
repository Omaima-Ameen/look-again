// "use client";

// import { useState } from "react";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   Check,
//   FileText,
//   Sparkles,
//   Target,
//   TrendingUp,
//   Upload,
//   WandSparkles,
// } from "lucide-react";

// export default function Home() {
//   const [resume, setResume] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const [jobFile, setJobFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);

//   async function handleAnalyze() {
//     setIsLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       const formData = new FormData();

//       formData.append("resume", resume);
//       formData.append("jobDescription", jobDescription);

//       if (jobFile) {
//         formData.append("jobFile", jobFile);
//       }

//       const response = await fetch("/api/analyze", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong.");
//       }

//       setResult(data);
//     } catch (err) {
//       setError(err.message || "Unable to connect. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <main className="min-h-screen overflow-hidden bg-[#f8f7ff] text-[#19172e]">
//       {/* Navigation */}
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
//         <a href="/" className="flex items-center gap-2.5">
//           <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-600 text-lg font-bold text-white shadow-md shadow-violet-200">
//             N
//           </span>
//           <span className="text-xl font-bold tracking-tight">
//             nextproof<span className="text-violet-500">.</span>
//           </span>
//         </a>

//         <div className="hidden items-center gap-8 text-sm text-gray-600 sm:flex">
//           <a href="#how-it-works" className="hover:text-violet-600">
//             How it works
//           </a>
//           <a href="#get-started" className="hover:text-violet-600">
//             Get started
//           </a>
//         </div>

//         <a
//           href="#get-started"
//           className="rounded-full bg-[#19172e] flex gap-1 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
//         >
//           Get started <ArrowUpRight size={17} />
//         </a>
//       </nav>

//       {/* Hero */}
//       <section className="relative px-6 pb-16 pt-14 sm:pt-20">
//         <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-72 w-175 max-w-full -translate-x-1/2 rounded-full bg-linear-to-r from-violet-200/50 via-pink-100/60 to-blue-200/50 blur-[90px]" />

//         <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//           <div className="aurora aurora-one" />
//           <div className="aurora aurora-two" />
//           <div className="aurora aurora-three" />
//         </div>
//         <div className="relative mx-auto max-w-4xl text-center">
//           <h1 className="text-4xl font-normal leading-[0.99] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
//             Your <span className="font-semibold">next</span> role,
//             <br />
//             <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
//               without the guesswork.
//             </span>
//           </h1>

//           <p className="mx-auto mt-8 mb-6 max-w-2xl text-sm leading-4 text-gray-600 sm:text-lg sm:leading-8">
//             Understand how your experience fits the role you want. Find the
//             skills you can demonstrate, what&apos;s missing, and what to focus
//             on next.
//           </p>

//           <div className="mt-8 flex flex-wrap justify-center gap-x-9 gap-y-3 text-sm text-gray-600">
//             <span>
//               <Sparkles
//                 size={19}
//                 strokeWidth={2}
//                 className="mr-2 text-violet-600"
//               />
//               Evidence, not guesswork
//             </span>
//             <span>
//               <TrendingUp
//                 size={19}
//                 strokeWidth={2}
//                 className="mr-2 text-violet-600"
//               />
//               Actionable next steps
//             </span>
//             <span>
//               <Upload
//                 size={19}
//                 strokeWidth={2}
//                 className="mr-2 text-violet-600"
//               />
//               No account needed
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* Clean upload section */}
//       <section
//         id="get-started"
//         className="mx-auto max-w-5xl scroll-mt-8 px-6 pb-20 pt-4"
//       >
//         <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
//           {/* Left introduction */}
//           <div className="pt-2 lg:pt-8">
//             <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">
//               Your next step starts here
//             </p>

//             <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
//               Let&apos;s make your
//               <br className="hidden lg:block" /> next move clearer.
//             </h2>

//             <p className="mt-4 max-w-sm leading-7 text-gray-600">
//               Bring the role you&apos;re aiming for and the experience
//               you&apos;ve built so far. We&apos;ll help you see the connection.
//             </p>

//             <div className="mt-8 space-y-5">
//               <div className="flex items-start gap-3">
//                 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm text-violet-700">
//                   01
//                 </span>
//                 <div>
//                   <p className="font-medium">See what you can prove</p>
//                   <p className="mt-1 text-sm leading-6 text-gray-500">
//                     Connect role requirements to your actual experience.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm text-blue-700">
//                   02
//                 </span>
//                 <div>
//                   <p className="font-medium">Know what to do next</p>
//                   <p className="mt-1 text-sm leading-6 text-gray-500">
//                     Focus on useful next steps, not every technology on the
//                     internet.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form — one simple surface, no floating cards */}
//           <div className="rounded-3xl bg-white p-6 shadow-[0_15px_60px_-30px_rgba(87,65,155,0.25)] sm:p-8">
//             <h3 className="text-xl font-semibold">Start with two things.</h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Add your resume and the job description.
//             </p>

//             <div className="mt-7">
//               <label
//                 htmlFor="resume"
//                 className="mb-3 block text-sm font-semibold"
//               >
//                 Your resume
//               </label>

//               <label
//                 htmlFor="resume"
//                 className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-300 bg-[#faf9ff] px-5 py-6 text-center transition hover:border-violet-500 hover:bg-violet-50"
//               >
//                 <Upload size={23} strokeWidth={1.7} />
//                 <span className="mt-3 max-w-full break-all text-sm font-medium">
//                   {resume ? resume.name : "Choose your resume"}
//                 </span>
//                 <span className="mt-1 text-xs text-gray-500">PDF or DOCX</span>
//                 <input
//                   id="resume"
//                   type="file"
//                   accept=".pdf,.docx"
//                   className="sr-only"
//                   onChange={(event) =>
//                     setResume(event.target.files?.[0] || null)
//                   }
//                 />
//               </label>
//             </div>

//             <div className="mt-6">
//               <label
//                 htmlFor="jobDescription"
//                 className="mb-3 block text-sm font-semibold"
//               >
//                 Job description
//               </label>

//               <textarea
//                 id="jobDescription"
//                 rows={6}
//                 value={jobDescription}
//                 onChange={(event) => setJobDescription(event.target.value)}
//                 placeholder="Paste the job description here..."
//                 className="w-full resize-y rounded-2xl border border-gray-200 bg-white p-4 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
//               />

//               <div className="mt-3 flex items-center justify-between gap-3">
//                 <label
//                   htmlFor="jobFile"
//                   className="cursor-pointer text-sm font-medium text-violet-700 hover:text-violet-900"
//                 >
//                   {jobFile ? jobFile.name : `Or upload a job description`}
//                 </label>
//                 <input
//                   id="jobFile"
//                   type="file"
//                   accept=".txt,.pdf,.docx"
//                   className="sr-only"
//                   onChange={(event) =>
//                     setJobFile(event.target.files?.[0] || null)
//                   }
//                 />
//                 <span className="shrink-0 text-xs text-gray-400">
//                   {jobDescription.length} chars
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               disabled={
//                 isLoading || !resume || (!jobDescription.trim() && !jobFile)
//               }
//               onClick={handleAnalyze}
//               className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-4 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
//             >
//               {isLoading ? (
//                 <>
//                   <span className="animate-spin">◌</span>
//                   Sending your files...
//                 </>
//               ) : (
//                 <>
//                   Analyze my fit <ArrowRight size={18} />
//                 </>
//               )}
//             </button>
// {error && (
//   <p role="alert" className="mt-4 text-sm text-red-600">
//     {error}
//   </p>
// )}

// {result && (
//   <div
//     role="status"
//     className="mt-4 rounded-xl bg-violet-50 p-4 text-sm"
//   >
//     <p className="font-semibold text-violet-800">
//       {result.message}
//     </p>
//     <p className="mt-2 text-gray-600">
//       Resume received: {result.resume.name}
//     </p>
//     <p className="mt-1 text-gray-600">
//       Input validation successful. Next: text extraction.
//     </p>
//   </div>
// )}
//             <p className="mt-4 text-center text-xs leading-5 text-gray-500">
//               Missing evidence doesn&apos;t automatically mean missing skills.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Simple benefits */}
//       <section
//         id="how-it-works"
//         className="border-t border-violet-100 bg-white/50 px-6 py-14 sm:py-16"
//       >
//         <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
//           <div>
//             <Check size={17} />
//             <h3 className="mt-3 font-semibold">Your strengths</h3>
//             <p className="mt-2 text-sm leading-6 text-gray-600">
//               Discover which requirements your experience already supports.
//             </p>
//           </div>

//           <div>
//             <Target size={17} />
//             <h3 className="mt-3 font-semibold">Your gaps</h3>
//             <p className="mt-2 text-sm leading-6 text-gray-600">
//               Understand what&apos;s unproven and what may need more work.
//             </p>
//           </div>

//           <div>
//             <TrendingUp size={17} />
//             <h3 className="mt-3 font-semibold">Your next move</h3>
//             <p className="mt-2 text-sm leading-6 text-gray-600">
//               Get a practical direction instead of an arbitrary readiness score.
//             </p>
//           </div>
//         </div>
//       </section>

//       <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-gray-500 sm:flex-row sm:justify-between lg:px-12">
//         <span>nextproof. · Clarity over comparison.</span>
//         <span>Progress over perfection.</span>
//       </footer>
//     </main>
//   );
// }

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AnalyzeForm from "@/components/analyzer/AnalyzeForm";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7ff] text-[#19172e]">
      <Navbar />
      <HeroSection />
      <AnalyzeForm />
      <HowItWorks />
      <Footer />
    </main>
  );
}
