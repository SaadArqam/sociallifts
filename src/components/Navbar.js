"use client";

import React from "react";
import Image from "next/image";

const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="relative w-full my-[10px] px-2 h-14">
        {/* Logo - top left */}
        <a href="#" className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 text-neutral-900 no-underline">
          <Image src="/img/logo.png" alt="Logo" width={80} height={80} />
        </a>

        {/* Center nav (no notch pills) */}
        <nav aria-label="Primary" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center gap-6 bg-white/90 border border-black/10 rounded-full py-2 px-6 shadow-sm backdrop-blur">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-black no-underline text-[12px] tracking-wider font-bold uppercase opacity-85 hover:opacity-100 transition hover:text-red-600"
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Contact button - top right */}
        <a href="/contact" className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 px-4 rounded-lg bg-red-600 text-white no-underline text-xs font-extrabold tracking-wide shadow hover:bg-red-700 transition">
          Contact
        </a>
      </div>
    </header>
  );
}