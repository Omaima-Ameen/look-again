
import { Check, Target, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-violet-100 bg-white/50 px-6 py-14 sm:py-16"
    >
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        <div>
          <Check size={17} />
          <h3 className="mt-3 font-semibold">Your strengths</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Discover which requirements your experience already supports.
          </p>
        </div>

        <div>
          <Target size={17} />
          <h3 className="mt-3 font-semibold">Your gaps</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Understand what&apos;s unproven and what may need more work.
          </p>
        </div>

        <div>
          <TrendingUp size={17} />
          <h3 className="mt-3 font-semibold">Your next move</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Get a practical direction instead of an arbitrary readiness score.
          </p>
        </div>
      </div>
    </section>
  );
}
