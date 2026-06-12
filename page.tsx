"use client";

import React, { useState } from "react";

// 1. Mock Data representing what the database/teacher portal would provide
const mockStudent = {
  name: "Alex Rivera",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  instrument: "Alto Saxophone",
  status: "Member", // can be "New Recruit" or "Member"
};

const mockPracticeNotice = {
  date: "Tuesday, June 16",
  time: "3:30 PM - 5:00 PM",
  location: "Band Room B",
  notes: "Please bring your pencils and stand extensions. We are focusing entirely on the competition arrangement introduction.",
};

const mockMusicFiles = [
  { id: "1", title: "The Washington Post March", category: "Full Ensemble", type: "PDF", size: "1.2 MB" },
  { id: "2", title: "Autumn Leaves - Sax Solo Section", category: "Warm-ups", type: "Audio", size: "4.8 MB" },
  { id: "3", title: "Scale Exercises (Concert Eb & Bb)", category: "Technique", type: "PDF", size: "450 KB" },
  { id: "4", title: "Galaxy Fanfare - Reference Track", category: "Full Ensemble", type: "Audio", size: "3.1 MB" },
];

export default function StudentDashboard() {
  const [songs] = useState(mockMusicFiles);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* SECTION 1: IDENTITY HEADER */}
        <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <img 
            src={mockStudent.avatarUrl} 
            alt={mockStudent.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30"
          />
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{mockStudent.name}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-max mx-auto sm:mx-0 ${
                mockStudent.status === "Member" 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {mockStudent.status}
              </span>
            </div>
            <p className="text-slate-400 text-lg font-medium flex items-center justify-center sm:justify-start gap-2">
              🎵 {mockStudent.instrument}
            </p>
          </div>
        </header>

        {/* SECTION 2: NEXT PRACTICE NOTIFICATION */}
        <section className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📢</span>
            <h2 className="text-xl font-bold text-indigo-300">Next Band Practice Notice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/50 p-4 rounded-xl border border-indigo-500/10">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">When</p>
              <p className="text-base font-medium mt-1">{mockPracticeNotice.date}</p>
              <p className="text-sm text-indigo-400">{mockPracticeNotice.time}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Where</p>
              <p className="text-base font-medium mt-1">{mockPracticeNotice.location}</p>
            </div>
            <div className="md:col-span-1">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Teacher Notes</p>
              <p className="text-sm text-slate-300 mt-1 italic">"{mockPracticeNotice.notes}"</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: TUNES AND MUSIC MATERIAL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              🎼 Assigned Music & Repertoire
            </h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700">
              {songs.length} Files Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {songs.map((file) => (
              <div 
                key={file.id} 
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition duration-200 flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                    {file.category}
                  </span>
                  <h3 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition pt-1">
                    {file.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {file.type} • {file.size}
                  </p>
                </div>
                
                <button className="bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 flex items-center gap-1.5 shadow-inner">
                  <span>{file.type === "PDF" ? "👁️ View" : "▶️ Play"}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

