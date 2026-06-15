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
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
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
          <section id="hero" className="glass-surface relative overflow-hidden rounded-[32px] p-8 md:p-10 reveal-card" style={{ "--delay": "0s" } as CSSProperties}>
            <span className="blob absolute -left-8 top-8 h-40 w-40 rounded-full bg-sky-400/20" />
            <span className="blob absolute right-8 top-6 h-48 w-48 rounded-full bg-amber-300/12" />
            <span className="blob absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-white/8" />
            <div className="relative z-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.35em] text-sky-100/80">Welcome to the portal</p>
                <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl">Luxury teacher and student access</h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                  A refined gateway for teachers and students, combining a calm dashboard, premium glass surfaces, and seamless portal routing.
                </p>
              </div>
              <div className="glass-surface rounded-[24px] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">Live overview</p>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Fast flow • one tap to choose your role and enter.</div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Ambient UI • soft blue and gold glows with polished glass.</div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Sticky navigation • quick access to the full portal journey.</div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="portal-card rounded-[24px] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">Fast flow</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Choose, confirm, continue</h2>
                <p className="mt-2 text-slate-300">A clean role selection experience that guides every visitor toward the right destination in seconds.</p>
              </article>
              <article className="portal-card rounded-[24px] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">Ambient UI</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Soft blue-gold glow</h2>
                <p className="mt-2 text-slate-300">Subtle gradients, blur, and layered depth make the interface feel premium and cohesive.</p>
              </article>
            </div>
          </section>

          <section id="portal" className="glass-surface rounded-[32px] p-8 md:p-10 reveal-card" style={{ "--delay": "0.2s" } as CSSProperties}>
            <p className="text-[0.72rem] uppercase tracking-[0.35em] text-slate-300/80">Choose your portal</p>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">Enter as a teacher or student</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Choose your role, enter your credentials, and you’ll be routed into the correct workspace with a polished, premium flow.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role as "teacher" | "student")}
                  className={`portal-card w-full rounded-[24px] p-5 text-start transition ${
                    selectedRole === role ? "active-card" : ""
                  }`}
                >
                  <span className="d-block text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">{config.label}</span>
                  <span className="mt-3 d-block text-2xl font-black text-white">Go to {config.label}</span>
                  <span className="mt-4 d-block max-w-sm text-sm text-slate-300">Use the password from the teacher sheet or student instructions to continue.</span>
                </button>
              ))}
            </div>
          </section>

          {selectedRole ? (
            <section id="login" className="glass-surface rounded-[32px] p-8 md:p-10 reveal-card" style={{ "--delay": "0.4s" } as CSSProperties}>
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
          <div className="glass-surface sticky top-24 rounded-[28px] p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">Quick nav</p>
            <nav className="mt-4 flex flex-col gap-2">
              <a href="#hero" className={`sidebar-link rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 ${activeSection === "hero" ? "active-section" : ""}`}>Hero overview</a>
              <a href="#portal" className={`sidebar-link rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 ${activeSection === "portal" ? "active-section" : ""}`}>Portal selection</a>
              <a href="#login" className={`sidebar-link rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 ${selectedRole ? "" : "opacity-50 pointer-events-none"} ${activeSection === "login" ? "active-section" : ""}`}>Login panel</a>
            </nav>
            <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/75 p-4 shadow-inner shadow-slate-950/40">
              <p className="text-[0.68rem] uppercase tracking-[0.35em] text-slate-300/80">Tip</p>
              <p className="mt-2 text-sm text-slate-300">Choose a portal to reveal the login panel and keep your path clear with persistent sub-navigation.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
