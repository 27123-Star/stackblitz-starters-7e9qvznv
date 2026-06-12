"use client";

import React, { useState } from "react";

// Mock initial data for students
const initialStudents = [
  { id: "1", name: "Alex Rivera", instrument: "Alto Saxophone", status: "Member", email: "alex@band.com" },
  { id: "2", name: "Sarah Chen", instrument: "Flute", status: "New Recruit", email: "sarah@band.com" },
  { id: "3", name: "Marcus Johnson", instrument: "Trumpet", status: "Member", email: "marcus@band.com" },
  { id: "4", name: "Emily Taylor", instrument: "Percussion", status: "New Recruit", email: "emily@band.com" },
];

const instrumentOptions = ["Flute", "Clarinet", "Alto Saxophone", "Tenor Saxophone", "Trumpet", "Trombone", "Percussion"];

export default function TeacherDashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [notice, setNotice] = useState({ date: "", time: "", location: "", notes: "" });
  const [newTune, setNewTune] = useState({ title: "", category: "Full Ensemble", type: "PDF" });

  // Handle roster status updates
  const updateStatus = (id: string, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // Handle roster instrument updates
  const updateInstrument = (id: string, newInstrument: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, instrument: newInstrument } : s));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">Director's Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your band roster, schedule practices, and distribute music sheets.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: ROSTER MANAGEMENT TABLE (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">👥 Band Roster Management</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                    <th className="p-4">Student</th>
                    <th className="p-4">Assigned Instrument</th>
                    <th className="p-4">Status Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition">
                      <td className="p-4">
                        <p className="font-semibold text-slate-200">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </td>
                      <td className="p-4">
                        <select 
                          value={student.instrument}
                          onChange={(e) => updateInstrument(student.id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-indigo-500 text-slate-300"
                        >
                          {instrumentOptions.map(inst => (
                            <option key={inst} value={inst}>{inst}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <select 
                          value={student.status}
                          onChange={(e) => updateStatus(student.id, e.target.value)}
                          className={`border rounded px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                            student.status === "Member" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          <option value="Member" className="bg-slate-900 text-emerald-400">Member</option>
                          <option value="New Recruit" className="bg-slate-900 text-amber-400">New Recruit</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: FORMS & ACTIONS PANEL (Takes 1 column) */}
          <div className="space-y-6">
            
            {/* ACTION 1: UPDATE PRACTICE NOTICE */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <h3 className="font-bold text-indigo-400 flex items-center gap-2 text-base">📢 Broadcast Practice Notice</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Date</label>
                  <input type="text" placeholder="e.g., Tuesday, June 16" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200" />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Time Window</label>
                  <input type="text" placeholder="e.g., 3:30 PM - 5:00 PM" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200" />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Location</label>
                  <input type="text" placeholder="e.g., Band Room B" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200" />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Director's Notes</label>
                  <textarea rows={2} placeholder="Focus elements or expectations..." className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 resize-none" />
                </div>
                <button type="button" onClick={() => alert("Notice Updated!")} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded text-sm transition">
                  Push to Student Boards
                </button>
              </div>
            </div>

            {/* ACTION 2: UPLOAD MUSIC MATERIALS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2 text-base">🎼 Upload Music Resource</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Piece Title</label>
                  <input type="text" placeholder="e.g., The Washington Post March" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Category</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300">
                      <option>Full Ensemble</option>
                      <option>Warm-ups</option>
                      <option>Technique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Type</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-300">
                      <option>PDF</option>
                      <option>Audio</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Select File</label>
                  <div className="border border-dashed border-slate-700 hover:border-slate-500 rounded p-4 text-center cursor-pointer transition text-slate-400">
                    📂 Click to drop resource file
                  </div>
                </div>
                <button type="button" onClick={() => alert("Resource Saved!")} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded text-sm transition">
                  Publish Resource
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

