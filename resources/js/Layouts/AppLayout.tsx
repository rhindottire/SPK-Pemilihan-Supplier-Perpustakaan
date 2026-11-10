import React, { ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import FloatingDock from "../Components/FloatingDock";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function AppLayout({ title, children }: Props) {
  const flash = (usePage().props as any).flash;

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-150 relative selection:bg-indigo-600 selection:text-white">
      {/* Discreet Header Banner */}
      <header className="w-full border-b border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2.5 group font-medium text-zinc-900 dark:text-zinc-100 hover:opacity-85 transition-opacity"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-500/20">
                SP
              </div>
              <div>
                <span className="font-bold tracking-tight text-zinc-900 dark:text-white">
                  SIP-SUPPLIER
                </span>
                <span className="text-zinc-400 dark:text-zinc-600 mx-1.5">•</span>
                <span className="text-zinc-500 dark:text-zinc-400 font-normal hidden sm:inline">
                  SI Perpustakaan (Quiz 2)
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>SPK: FILTER DINAMIS + PEMBANDING</span>
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 hidden md:inline">|</span>
            <span className="text-zinc-400 dark:text-zinc-500 hidden md:inline">FT Univ. Trunojoyo Madura</span>
          </div>
        </div>
      </header>

      {/* Flash Notification Toast */}
      {flash?.success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 w-full">
          <div className="bg-emerald-600 text-white text-xs px-4 py-3 rounded-xl flex items-center justify-between shadow-lg shadow-emerald-600/10 border border-emerald-500 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{flash.success}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-36">
        {children}
      </main>

      {/* Floating Dynamic Island Dock (Bottom Navigation) */}
      <FloatingDock />

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 py-6 mt-auto pb-28 text-center text-xs text-zinc-400 dark:text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">SIP-SUPPLIER Perpustakaan</strong> — Sistem Pendukung Keputusan Pemilihan Rekanan Pengadaan Buku
          </div>
          <div>Mata Kuliah Sistem Informasi • Dosen: Kurniawan Permana</div>
        </div>
      </footer>
    </div>
  );
}
