
import { Check, Target, TrendingUp, Sparkles } from "lucide-react";

function ResultList({ items, emptyMessage, renderItem }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-sm leading-6 text-gray-500">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li
          key={`${index}-${typeof item === "string" ? item : item.skill || item.requirement || "item"}`}
          className="rounded-xl border border-gray-100 bg-white p-4"
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

function ItemTitle({ children }) {
  return <p className="font-medium text-[#19172e]">{children}</p>;
}

function ItemDetail({ children }) {
  if (!children) return null;

  return (
    <p className="mt-2 text-sm leading-6 text-gray-600">{children}</p>
  );
}

export default function AnalysisResults({ result }) {
  const analysis = result?.analysis;

  if (!analysis) return null;

  return (
    <section
      id="analysis-results"
      aria-live="polite"
      className="mx-auto max-w-5xl scroll-mt-8 px-6 pb-20"
    >
      <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_15px_60px_-30px_rgba(87,65,155,0.25)] sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="text-sm font-medium text-violet-700">
              Your NextProof analysis
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Your experience, understood.
            </h2>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[#faf9ff] p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <Sparkles size={17} className="text-violet-600" />
            Overall assessment
          </h3>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            {analysis.summary || "No summary was provided."}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Check size={19} className="text-emerald-600" />
            Your strengths
          </h3>

          <ResultList
            items={analysis.strengths}
            emptyMessage="No strengths were identified in this analysis."
            renderItem={(item) =>
              typeof item === "string" ? (
                <p className="text-sm leading-6 text-gray-700">{item}</p>
              ) : (
                <>
                  <ItemTitle>{item.requirement || item.skill}</ItemTitle>
                  <ItemDetail>{item.evidence || item.reason}</ItemDetail>
                </>
              )
            }
          />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Target size={19} className="text-amber-600" />
            Missing evidence
          </h3>

          <p className="mb-4 text-sm leading-6 text-gray-500">
            These requirements aren&apos;t clearly demonstrated in the resume.
            That doesn&apos;t automatically mean you lack the skills.
          </p>

          <ResultList
            items={analysis.missingEvidence}
            emptyMessage="No major missing evidence was identified."
            renderItem={(item) =>
              typeof item === "string" ? (
                <p className="text-sm leading-6 text-gray-700">{item}</p>
              ) : (
                <>
                  <ItemTitle>{item.requirement || item.skill}</ItemTitle>
                  <ItemDetail>{item.evidence || item.reason}</ItemDetail>
                  <ItemDetail>
                    <span className="font-medium text-violet-700">
                      Next action:
                    </span>{" "}
                    {item.nextAction}
                  </ItemDetail>
                </>
              )
            }
          />
        </div>

        <div className="mt-8">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Target size={19} className="text-rose-600" />
            Potential skill gaps
          </h3>

          <p className="mb-4 text-sm leading-6 text-gray-500">
            These are areas worth checking, not confirmed weaknesses.
            The resume alone may not tell the whole story.
          </p>

          <ResultList
            items={analysis.potentialGaps}
            emptyMessage="No potential skill gaps were identified."
            renderItem={(item) =>
              typeof item === "string" ? (
                <p className="text-sm leading-6 text-gray-700">{item}</p>
              ) : (
                <>
                  <ItemTitle>{item.skill || item.requirement}</ItemTitle>
                  <ItemDetail>{item.reason || item.evidence}</ItemDetail>
                  <ItemDetail>
                    <span className="font-medium text-violet-700">
                      Next action:
                    </span>{" "}
                    {item.nextAction}
                  </ItemDetail>
                </>
              )
            }
          />
        </div>

        <div className="mt-8 rounded-2xl bg-violet-50 p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <TrendingUp size={19} className="text-violet-700" />
            Your next steps
          </h3>

          <ResultList
            items={analysis.nextSteps}
            emptyMessage="Try adding more detail to your resume and reviewing the role requirements."
            renderItem={(item) =>
              typeof item === "string" ? (
                <p className="text-sm leading-6 text-gray-700">{item}</p>
              ) : (
                <>
                  <ItemTitle>{item.action || item.title || "Recommended action"}</ItemTitle>
                  <ItemDetail>{item.description || item.reason}</ItemDetail>
                </>
              )
            }
          />
        </div>

        <p className="mt-5 text-xs leading-5 text-gray-500">
          This is an AI-assisted assessment based on the information provided.
          Verify suggestions against your actual experience before changing your resume.
        </p>
      </div>
    </section>
  );
}
