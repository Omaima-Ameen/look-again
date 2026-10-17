
import { Upload } from "lucide-react";

export default function ResumeUpload({ resume, onResumeChange }) {
  return (
    <div className="mt-7">
      <label
        htmlFor="resume"
        className="mb-3 block text-sm font-semibold"
      >
        Your resume
      </label>

      <label
        htmlFor="resume"
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-300 bg-[#faf9ff] px-5 py-6 text-center transition hover:border-violet-500 hover:bg-violet-50"
      >
        <Upload size={23} strokeWidth={1.7} />

        <span className="mt-3 max-w-full break-all text-sm font-medium">
          {resume ? resume.name : "Choose your resume"}
        </span>

        <span className="mt-1 text-xs text-gray-500">
          PDF or DOCX
        </span>

        <input
          id="resume"
          type="file"
          accept=".pdf,.docx"
          className="sr-only"
          onChange={(event) =>
            onResumeChange(event.target.files?.[0] || null)
          }
        />
      </label>
    </div>
  );
}
