"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const instrumentOptions = ["Flute", "Clarinet", "Alto Saxophone", "Tenor Saxophone", "Trumpet", "Trombone", "Percussion"];

export default function TeacherDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Load real student data from Supabase when the page opens
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("name", { ascending: true });

      if (data) {
        setStudents(data);
      } else if (error) {
        console.error("Error fetching students:", error.message);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  // 2. Database update handler for Instruments
  const updateInstrument = async (id: string, newInstrument: string) => {
    // Optimistic UI change: Update local state immediately so it feels fast
    setStudents(prev => prev.map(s => s.id === id ? { ...s, instrument: newInstrument } : s));

    // Save change to Supabase
    const { error } = await supabase
      .from("students")
      .update({ instrument: newInstrument })
      .eq("id", id);
      
    if (error) console.error("Error updating instrument in database:", error.message);
  };

  // 3. Database update handler for Status
  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI change: Update local state immediately
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));

    // Save change to Supabase
    const { error } = await supabase
      .from("students")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) console.error("Error updating status in database:", error.message);
  };

  if (loading) return <div className="text-white p-12">Loading roster client...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">Director's Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your band roster, schedule practices, and distribute music sheets.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ROSTER MANAGEMENT TABLE */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">👥 Band Roster Management</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              {students.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No students found in the database. Add some in your Supabase dashboard!</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                      <th className="p-4">Student</th>
                      <th className="p-4">Assigned Instrument</th>
                      <th className="p-4">Membership Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img 
                            src={student.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80"} 
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700" 
                          />
                          <div>
                            <p className="font-semibold text-slate-200">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
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
              )}
            </div>
          </div>

          {/* ACTIONS PANEL (STAYS UNCHANGED FOR NOW) */}
          <div className="space-y-6">
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
                  <textarea rows={2} placeholder="Focus elements..." className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 resize-none" />
                </div>
                <button type="button" onClick={() => alert("Notice Updated!")} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded text-sm transition">
                  Push to Student Boards
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
