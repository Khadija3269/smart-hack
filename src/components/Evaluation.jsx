import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  evaluateSubmission,
  evaluationFor,
  getHackathon,
  getSubmissions,
} from "@/lib/store";

function EvaluationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const submissionId = searchParams.get("submissionId");

  const [sub, setSub] = useState(null);
  const [innovation, setInnovation] = useState("");
  const [design, setDesign] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    const allSubs = getSubmissions() || [];

    const s = submissionId
      ? allSubs.find((x) => x.id === submissionId)
      : null;

    if (!s) {
      setSub(null);
      return;
    }

    setSub(s);

    const ev = evaluationFor(s.id);

    if (ev) {
      setInnovation(ev.innovation);
      setDesign(ev.design);
      setFunctionality(ev.functionality);
      setFeedback(ev.feedback);
      setReadonly(true);
    } else {
      setInnovation("");
      setDesign("");
      setFunctionality("");
      setFeedback("");
      setReadonly(false);
    }
  }, [submissionId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sub) return;

    if (!innovation || !design || !functionality || !feedback.trim()) {
      setError("⚠️ All fields are required.");
      return;
    }

    setError("");

    // ✅ FIXED: allow text OR numbers
    evaluateSubmission({
      submissionId: sub.id,
      innovation,
      design,
      functionality,
      feedback: feedback.trim(),
    });

    navigate("/evaluation-submitted");
  };

  const hack = sub ? getHackathon(sub.hackathonId) : null;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="dashboard" />

      <header className="bg-[#5B8FCF] px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">
          Project Evaluation
        </h1>

        <Link to="/judge-dashboard" className="text-white text-2xl">
          ←
        </Link>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        {!sub ? (
          <p className="text-center text-gray-500">
            No submission selected.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-white p-8 shadow-sm"
          >
            <div className="border-b pb-3 mb-6 text-center">
              <h2 className="text-lg">
                <strong>Project:</strong> {hack?.title || "—"}
              </h2>
              {readonly && (
                <div className="mt-3 inline-flex items-center gap-2 bg-green-100 border-2 border-green-500 text-green-700 font-bold px-4 py-2 rounded-full">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-600 text-white text-base">✓</span>
                  Evaluated
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-[1fr_1.3fr] gap-8">
              {/* LEFT SIDE */}
              <div className="bg-[#5B8FCF]/25 rounded-lg p-5 text-sm space-y-2">
                <p><strong>Project:</strong> {sub.projectTitle}</p>
                <p><strong>Team:</strong> {sub.teamMembers || "—"}</p>
                <p><strong>Description:</strong> {sub.description}</p>
                <p><strong>Category:</strong> {sub.category}</p>
                {sub.fileName && (
                  <p><strong>File:</strong> {sub.fileName}</p>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div>
                <h3 className="font-bold mb-4">
                  Scoring {readonly && "(already evaluated)"}
                </h3>

                <label>Innovation:</label>
                <input
                  type="text"
                  value={innovation}
                  onChange={(e) => setInnovation(e.target.value)}
                  disabled={readonly}
                  className="w-full border p-2 mb-3"
                />

                <label>Design:</label>
                <input
                  type="text"
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  disabled={readonly}
                  className="w-full border p-2 mb-3"
                />

                <label>Functionality:</label>
                <input
                  type="text"
                  value={functionality}
                  onChange={(e) => setFunctionality(e.target.value)}
                  disabled={readonly}
                  className="w-full border p-2 mb-3"
                />

                <label>Feedback:</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={readonly}
                  className="w-full border mt-2 p-2"
                  rows={4}
                />

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {!readonly && (
                  <button
                    type="submit"
                    className="mt-4 bg-[#5B8FCF] text-white px-6 py-2 rounded"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default EvaluationPage;