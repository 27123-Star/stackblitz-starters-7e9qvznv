"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
      const [loading, setLoading] = useState(true);
        
          // Audio state
            const [currentTrack, setCurrentTrack] = useState(null);
              const [isPlaying, setIsPlaying] = useState(false);
                const audioRef = useRef(null);

                  useEffect(() => {
                      audioRef.current = new Audio();
                          audioRef.current.onended = () => setIsPlaying(false);

                              // Track authentication shifts
                                  supabase.auth.getSession().then(({ data: { session } }) => {
                                        handleUserSession(session);
                                            });

                                                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                                                      handleUserSession(session);
                                                          });

                                                              return () => {
                                                                    subscription.unsubscribe();
                                                                          if (audioRef.current) audioRef.current.pause();
                                                                              };
                                                                                }, []);

                                                                                  async function handleUserSession(session) {
                                                                                      if (session) {
                                                                                            setUser(session.user);
                                                                                                  const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                                                                                                        setProfile(data);
                                                                                                            } else {
                                                                                                                  setUser(null);
                                                                                                                        setProfile(null);
                                                                                                                            }
                                                                                                                                setLoading(false);
                                                                                                                                  }

                                                                                                                                    const playTrack = (track) => {
                                                                                                                                        if (!audioRef.current) return;
                                                                                                                                            if (currentTrack?.id === track.id) {
                                                                                                                                                  if (isPlaying) {
                                                                                                                                                          audioRef.current.pause();
                                                                                                                                                                  setIsPlaying(false);
                                                                                                                                                                        } else {
                                                                                                                                                                                audioRef.current.play().catch(() => {});
                                                                                                                                                                                        setIsPlaying(true);
                                                                                                                                                                                              }
                                                                                                                                                                                                    return;
                                                                                                                                                                                                        }
                                                                                                                                                                                                            audioRef.current.src = track.audio_url;
                                                                                                                                                                                                                setCurrentTrack(track);
                                                                                                                                                                                                                    setIsPlaying(true);
                                                                                                                                                                                                                        audioRef.current.play().catch(() => {});
                                                                                                                                                                                                                          };

                                                                                                                                                                                                                            const logout = () => supabase.auth.signOut();

                                                                                                                                                                                                                              return (
                                                                                                                                                                                                                                  <AppContext.Provider value={{ user, profile, loading, currentTrack, isPlaying, playTrack, logout }}>
                                                                                                                                                                                                                                        {children}
                                                                                                                                                                                                                                            </AppContext.Provider>
                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                              export const useApp = () => {
  const context = useContext(AppContext);
  // Returns an empty fallback object if context is missing during the build
  return context || {
    profile: null,
    playTrack: () => {},
    currentTrack: null,
    isPlaying: false
  };
};
