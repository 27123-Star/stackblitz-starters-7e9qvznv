"use client";

import { useSearchParams } from "next/navigation";

export default function StudentPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Student";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-black/20">
          <span className="inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
            Student Portal
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            Welcome, {name}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 leading-7">
            You have been routed to the student portal. This page is your starting point for learning materials, assignments, and personal progress.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold text-white">Assignments</h2>
            <p className="mt-3 text-slate-400">
              View your assigned tasks and practice exercises after login.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold text-white">Practice Dashboard</h2>
            <p className="mt-3 text-slate-400">
              Track your progress, submit practice notes, and access resources here.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
