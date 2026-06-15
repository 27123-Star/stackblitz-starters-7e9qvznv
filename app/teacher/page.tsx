"use client";

import { useEffect, useState } from "react";

export default function TeacherPage() {
  const [name, setName] = useState("Teacher");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(new URLSearchParams(window.location.search).get("name") || "Teacher");
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-black/20">
          <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Teacher Portal
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            Welcome, {name}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 leading-7">
            You have been routed to the teacher portal. This page is your entry point to teacher-only tools, announcements, and classroom management functions.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold text-white">Classroom Controls</h2>
            <p className="mt-3 text-slate-400">
              Create announcements, upload assignments, and review student progress from here.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-semibold text-white">Student Roster</h2>
            <p className="mt-3 text-slate-400">
              Once authenticated, the teacher portal will let you manage enrolled students and shared resources.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
