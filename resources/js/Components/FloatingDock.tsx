import React from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";

export default function FloatingDock() {
  const { url } = usePage();

  const navItems = [
    {
      label: "Dashboard",
      shortLabel: "Beranda",
      href: "/",
      active: url === "/",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "SPK Filter & Pembanding",
      shortLabel: "SPK Engine",
      href: "/spk",
      active: url.startsWith("/spk"),
      badge: "Inti Quiz",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
    },
    {
      label: "Master Supplier",
      shortLabel: "Supplier",
      href: "/suppliers",
      active: url.startsWith("/suppliers"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: "Paket Pengadaan",
      shortLabel: "Pengadaan",
      href: "/pengadaan",
      active: url.startsWith("/pengadaan"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: "Riwayat & PO",
      shortLabel: "Keputusan",
      href: "/keputusan",
      active: url.startsWith("/keputusan"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-max pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl shadow-zinc-900/15 dark:shadow-black/50 transition-all">
        {navItems.map((item) => {
          const isActive = item.active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
              <span className="inline md:hidden">{item.shortLabel}</span>
              {item.badge && !isActive && (
                <span className="hidden lg:inline text-[9px] px-1 py-0.2 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
