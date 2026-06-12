
import { AppProvider } from "@/context/AppContext";
import FloatingPlayer from "@/components/FloatingPlayer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
            <body className="bg-slate-950 text-slate-100 min-h-screen">
                    <AppProvider>
                              <div className="p-6 max-w-6xl mx-auto pb-32">
                                          {children}
                                                    </div>
                                                              <FloatingPlayer />
                                                                      </AppProvider>
                                                                            </body>
                                                                                </html>
                                                                                  );
                                                                                  }
                                                                                  