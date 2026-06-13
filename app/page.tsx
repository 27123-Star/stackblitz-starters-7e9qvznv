"use client";

import { useState, useEffect, FormEvent, CSSProperties } from "react";
import { useRouter } from "next/navigation";

const ROLE_CONFIG = {
  teacher: {
    label: "Teacher",
    placeholder: "Teacher name",
    route: "/teacher",
    accent: "from-emerald-500 to-sky-500",
  },
  student: {
    label: "Student",
    placeholder: "Student name",
    route: "/student",
    accent: "from-sky-500 to-purple-500",
  },
};

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"teacher" | "student" | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const sections = ["hero", "portal", "login"];

    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0);

      let currentSection = sections[0];
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top;
          if (top <= 120) currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleRoleSelect(role: "teacher" | "student") {
    setSelectedRole(role);
    setName("");
    setPassword("");
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRole) return;

    setError("");

    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, role: selectedRole }),
    });

    const result = await response.json();

    if (!result.success) {
      setError(result.error || "Invalid name or password.");
      return;
    }

    const query = new URLSearchParams({ name: name.trim() || ROLE_CONFIG[selectedRole].label });
    router.push(`${ROLE_CONFIG[selectedRole].route}?${query.toString()}`);
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="scroll-progress-outer fixed left-0 right-0 top-20 z-50 mx-auto hidden h-1 overflow-hidden rounded-full bg-white/10 lg:block">
        <div className="scroll-progress-inner h-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
        <div className="space-y-10">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileNavOpen((open) => !open)}
              className="btn btn-outline-light rounded-4 px-4 py-3 fw-semibold w-full text-start"
            >
              {mobileNavOpen ? "Hide navigation" : "Show quick navigation"}
            </button>
            <div className={`${mobileNavOpen ? "block" : "hidden"} mt-4 rounded-4 glass-surface p-4 border border-slate-800`}>
              <a href="#hero" className={`sidebar-link d-block mb-2 btn btn-sm btn-outline-light text-start ${activeSection === "hero" ? "active-section" : ""}`}>Hero overview</a>
              <a href="#portal" className={`sidebar-link d-block mb-2 btn btn-sm btn-outline-light text-start ${activeSection === "portal" ? "active-section" : ""}`}>Portal selection</a>
              <a href="#login" className={`sidebar-link d-block btn btn-sm btn-outline-light text-start ${selectedRole ? "" : "disabled opacity-50"} ${activeSection === "login" ? "active-section" : ""}`}>Login panel</a>
            </div>
          </div>
          <section id="hero" className="glass-surface rounded-[2rem] p-10 overflow-hidden relative reveal-card" style={{ "--delay": "0s" } as CSSProperties}>
            <span className="blob absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-500/20 animate-blob" />
            <span className="blob absolute -right-10 top-20 h-52 w-52 rounded-full bg-yellow-400/15 animate-blob animation-delay-2000" />
            <span className="blob absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 animate-blob animation-delay-4000" />
            <div className="position-relative z-10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Welcome to the portal</p>
              <h1 className="mt-4 text-5xl font-black text-white">Luxury teacher and student access</h1>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Enter the right portal with a seamless flow, premium gradient styling, and elegant Bootstrap navigation.
              </p>
              <div className="row g-3 mt-8">
                <div className="col-md-6">
                  <div className="glass-surface rounded-4 p-4 border border-slate-800">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Fast flow</p>
                    <h2 className="mt-2 text-xl font-bold text-white">Quick choice</h2>
                    <p className="mt-2 text-slate-400">Select teacher or student, authenticate, and arrive instantly in your portal.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="glass-surface rounded-4 p-4 border border-slate-800">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ambient UI</p>
                    <h2 className="mt-2 text-xl font-bold text-white">Blue gold elegance</h2>
                    <p className="mt-2 text-slate-400">Glassy cards, soft glows, and animated light blobs keep the interface fresh.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="portal" className="glass-surface rounded-[2rem] p-10 reveal-card" style={{ "--delay": "0.2s" } as CSSProperties}>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Choose your portal</p>
            <h2 className="mt-4 text-4xl font-black text-white">Enter as a teacher or student</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Choose your role, enter your name and password, and you’ll be routed straight into the right portal.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role as "teacher" | "student")}
                  className={`btn btn-outline-light w-full rounded-4 text-start p-4 shadow-sm transition ${
                    selectedRole === role
                      ? "active btn-light text-slate-950"
                      : "text-slate-100 bg-slate-950/90 border-slate-700 hover:border-sky-400 hover:bg-slate-900"
                  }`}
                >
                  <span className="d-block text-xs uppercase tracking-[0.35em] text-slate-400">{config.label}</span>
                  <span className="mt-3 d-block text-2xl font-black text-white">Go to {config.label}</span>
                  <span className="mt-4 d-block max-w-sm text-sm text-slate-400">Use the password from the teacher sheet or student instructions.</span>
                </button>
              ))}
            </div>
          </section>

          {selectedRole ? (
            <section id="login" className="glass-surface rounded-[2rem] p-10 reveal-card" style={{ "--delay": "0.4s" } as CSSProperties}>
              <h2 className="text-3xl font-bold text-white">{ROLE_CONFIG[selectedRole].label} login</h2>
              <p className="mt-2 text-slate-400">Please enter your name and password to continue to the {ROLE_CONFIG[selectedRole].label.toLowerCase()} portal.</p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]">
                <div className="space-y-4">
                  <label className="form-label text-sm fw-semibold text-slate-200">
                    Name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={ROLE_CONFIG[selectedRole].placeholder}
                      className="form-control mt-2 rounded-4 border-0 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </label>

                  <label className="form-label text-sm fw-semibold text-slate-200">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                      className="form-control mt-2 rounded-4 border-0 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </label>
                </div>

                <div className="d-flex flex-column justify-content-between glass-surface rounded-4 p-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Ready?</p>
                    <p className="mt-3 text-slate-400 text-sm">Click continue to move into your portal.</p>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg mt-4 w-full rounded-pill"
                  >
                    Continue to {ROLE_CONFIG[selectedRole].label}
                  </button>
                </div>
              </form>

              {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
            </section>
          ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sidebar-card glass-surface sticky top-24 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Section links</p>
            <nav className="sidebar-nav mt-4 d-flex flex-column gap-2">
              <a href="#hero" className={`sidebar-link btn btn-sm btn-outline-light text-start ${activeSection === "hero" ? "active-section" : ""}`}>Hero overview</a>
              <a href="#portal" className={`sidebar-link btn btn-sm btn-outline-light text-start ${activeSection === "portal" ? "active-section" : ""}`}>Portal selection</a>
              <a href="#login" className={`sidebar-link btn btn-sm btn-outline-light text-start ${selectedRole ? "" : "opacity-50 pointer-events-none"} ${activeSection === "login" ? "active-section" : ""}`}>Login panel</a>
            </nav>
            <div className="mt-5 rounded-4 border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tip</p>
              <p className="mt-2 text-slate-300 text-sm">Select a portal to unlock the login section and use the side menu for quick navigation.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
