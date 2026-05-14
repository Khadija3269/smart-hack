import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { saveUser } from "@/lib/auth";
import authSide from "@/assets/auth-side.png";

function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("participant");
  const [organization, setOrganization] = useState("SQU");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password)
      return setError("Please fill in all required fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("⚠️ Please enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    try {
      await saveUser({ fullName, email, password, role, organization }); // ✅ include organization
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-full bg-[#1f3a68] text-white outline-none";
  const labelClass = "block text-white mb-1.5 text-sm";

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-72px)]">
        <div className="hidden md:flex items-center justify-center bg-white p-10">
          <img
            src={authSide}
            alt="People with laptops"
            loading="lazy"
            width={420}
            height={420}
            className="max-w-[420px] w-full h-auto"
          />
        </div>

        <div className="bg-[#5B8FCF] flex items-center justify-center p-8 md:rounded-l-[40%] relative">
          <Link to="/" className="absolute right-6 top-6 text-white text-2xl">
            ←
          </Link>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
              Registration
            </h1>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  className={inputClass}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Confirm Password</label>
                <input
                  type="password"
                  className={inputClass}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputClass}
                >
                  <option value="participant">Participant</option>
                  <option value="judge">Judge</option>
                  <option value="organizer">Organizer</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* ✅ FIXED DROPDOWN */}
              <div>
                <label className={labelClass}>Organization</label>
                <select
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className={inputClass}
                >
                  <option value="SQU">Sultan Qaboos University</option>
                  <option value="GUtech">GUtech</option>
                  <option value="UTAS">UTAS</option>
                  <option value="MiddleEastCollege">Middle East College</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-100 text-sm text-center mt-3">
                ⚠️ {error}
              </p>
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#cfe0f3] text-[#1f3a68] font-bold rounded-full px-12 py-2.5 hover:opacity-90 text-lg"
              >
                Register
              </button>
            </div>

            <div className="text-white text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="underline font-semibold">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;