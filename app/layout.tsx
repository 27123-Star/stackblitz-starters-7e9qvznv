import type { ReactNode } from "react";
import Link from "next/link";
import { AppProvider } from "@/context/AppContext";
import FloatingPlayer from "@/components/FloatingPlayer";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.20),transparent_22%),radial-gradient(circle_at_top_right,_rgba(255,215,0,0.14),transparent_18%)]" />
        <div className="relative z-10">
          <header className="container-fluid py-4">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div>
                <Link href="/" className="navbar-brand fs-4 fw-bold text-white tracking-[0.2em]">Al Jamea Portal</Link>
                <p className="mb-0 text-slate-400">Teacher & student access with elegant navigation.</p>
              </div>
              <nav className="d-flex flex-wrap gap-2">
                <Link href="/" className="btn btn-outline-light btn-sm">Home</Link>
                <Link href="/teacher" className="btn btn-outline-info btn-sm">Teacher</Link>
                <Link href="/student" className="btn btn-outline-warning btn-sm text-white">Student</Link>
              </nav>
            </div>
          </header>

          <main className="p-6 max-w-6xl mx-auto pb-32">{children}</main>
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
      </body>
    </html>
  );
}
