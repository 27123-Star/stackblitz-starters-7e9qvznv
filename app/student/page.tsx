"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Target a specific student email (later this will come from Auth)
  const targetStudentEmail = "alex@band.com";

  useEffect(() => {
    // 1. Fetch initial student data from Supabase
    const fetchStudentData = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("email", targetStudentEmail)
        .single();

      if (data) setStudent(data);
      setLoading(false);
    };

    fetchStudentData();

    // 2. Listen to real-time changes on the database
    const channel = supabase
      .channel("student-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "students", filter: `email=eq.${targetStudentEmail}` },
        (payload) => {
          console.log("Realtime update received!", payload.new);
          setStudent(payload.new); // Instantly update frontend UI state
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <div className="text-white p-12">Loading portal...</div>;
  if (!student) return <div className="text-white p-12">Student profile not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* IDENTITY HEADER WITH LIVE STATUS UPDATES */}
        <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <img 
            src={student.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80"} 
            alt={student.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30"
          />
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{student.name}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-max mx-auto sm:mx-0 ${
                student.status === "Member" 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {student.status}
              </span>
            </div>
            <p className="text-slate-400 text-lg font-medium flex items-center justify-center sm:justify-start gap-2">
              🎵 {student.instrument}
            </p>
          </div>
        </header>
        
        {/* Rest of music list remains below... */}
      </div>
    </div>
  );
}
