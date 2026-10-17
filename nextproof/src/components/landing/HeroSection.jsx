
import { Sparkles, TrendingUp, Upload } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative px-6 pb-16 pt-14 sm:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-72 w-175 max-w-full -translate-x-1/2 rounded-full bg-linear-to-r from-violet-200/50 via-pink-100/60 to-blue-200/50 blur-[90px]" />

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-normal leading-[0.99] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          Your <span className="font-semibold">next</span> role,
          <br />
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            without the guesswork.
          </span>
        </h1>

        <p className="mx-auto mt-8 mb-6 max-w-2xl text-sm leading-4 text-gray-600 sm:text-lg sm:leading-8">
          Understand how your experience fits the role you want. Find the
          skills you can demonstrate, what&apos;s missing, and what to focus
          on next.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-x-9 gap-y-3 text-sm text-gray-600">
          <span>
            <Sparkles
              size={19}
              strokeWidth={2}
              className="mr-2 inline text-violet-600"
            />
            Evidence, not guesswork
          </span>

          <span>
            <TrendingUp
              size={19}
              strokeWidth={2}
              className="mr-2 inline text-violet-600"
            />
            Actionable next steps
          </span>

          <span>
            <Upload
              size={19}
              strokeWidth={2}
              className="mr-2 inline text-violet-600"
            />
            No account needed
          </span>
        </div>
      </div>
    </section>
  );
}
