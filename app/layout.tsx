import type { ReactNode } from "react";
import Link from "next/link";
import { AppProvider } from "@/context/AppContext";
import FloatingPlayer from "@/components/FloatingPlayer";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
        <AppProvider>
          <div className="ambient-shell" aria-hidden="true" />
          <div className="relative z-10">
            <header className="mx-auto w-full max-w-7xl px-4 pt-4 md:px-6 lg:px-8">
              <div className="glass-surface rounded-[28px] px-5 py-4 shadow-2xl shadow-slate-950/40">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.35em] text-sky-200/75">Al Jamea Portal</p>
                    <Link href="/" className="mt-1 block text-2xl font-black tracking-[0.18em] text-white hover:text-sky-100">Al Jamea Portal</Link>
                    <p className="mt-1 text-sm text-slate-300">Luxury teacher and student access with an elegant, unified dashboard.</p>
                  </div>
                  <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 p-1.5 shadow-inner shadow-slate-950/30">
                    <Link href="/" className="nav-pill rounded-full bg-sky-400/15 text-sky-100">Home</Link>
                    <Link href="/teacher" className="nav-pill rounded-full text-slate-200 hover:bg-sky-400/10 hover:text-white">Teacher</Link>
                    <Link href="/student" className="nav-pill rounded-full text-slate-200 hover:bg-amber-400/10 hover:text-amber-100">Student</Link>
                  </nav>
                </div>
              </div>
            </header>

            <main className="mx-auto w-full max-w-7xl px-4 pb-32 pt-6 md:px-6 lg:px-8">{children}</main>
            <footer className="footer-glow mt-10 rounded-4 border border-white/10 bg-slate-950/75 p-5 text-center text-slate-300 shadow-xl shadow-slate-950/20">
              <div className="container">
                <p className="mb-2 text-muted">Built for teachers and students with premium portal access.</p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                  <Link href="/" className="text-decoration-none text-white">Home</Link>
                  <Link href="/teacher" className="text-decoration-none text-sky-300">Teacher</Link>
                  <Link href="/student" className="text-decoration-none text-warning">Student</Link>
                </div>
              </div>
            </footer>
          </div>
          <FloatingPlayer />
        </AppProvider>
      </body>
    </html>
  );
}
