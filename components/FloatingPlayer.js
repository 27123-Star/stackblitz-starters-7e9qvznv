"use client";
import { useApp } from "@/context/AppContext";

export default function FloatingPlayer() {
  const { currentTrack, isPlaying, playTrack } = useApp();

    if (!currentTrack) return null;

      return (
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 flex justify-between items-center z-50 shadow-2xl px-8">
                <div>
                        <p className="font-bold text-emerald-400">{currentTrack.title}</p>
                                <p className="text-xs text-slate-400">Playing in Background...</p>
                                      </div>
                                            <button 
                                                    onClick={() => playTrack(currentTrack)} 
                                                            className="p-3 bg-emerald-500 rounded-full text-slate-950 font-bold hover:scale-105 transition"
                                                                  >
                                                                          {isPlaying ? "⏸️ PAUSE" : "▶️ PLAY"}
                                                                                </button>
                                                                                    </div>
                                                                                      );
                                                                                      }
                                                                                      