"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "שירותים" },
    { href: "#demos", label: "דוגמאות" },
    { href: "#packages", label: "חבילות" },
    { href: "#how", label: "איך זה עובד" },
    { href: "#faq", label: "שאלות נפוצות" },
  ];

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5, 5, 16, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,255,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: "linear-gradient(135deg, #00f5ff22, #9b59b622)",
              border: "1px solid rgba(0,245,255,0.3)",
            }}
          >
            ✨
          </div>
          <div>
            <div
              className="font-bold text-lg leading-none"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #9b59b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Wedding Show
            </div>
            <div className="text-xs text-white/40 leading-none mt-0.5">
              סרטוני חתונה מותאמים
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin" className="text-white/50 hover:text-white/80 text-sm transition-colors">
            ניהול
          </Link>
          <a
            href="#order"
            className="btn-primary text-sm py-2.5 px-6"
            style={{ fontSize: "14px" }}
          >
            הזמן עכשיו
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#00f5ff",
              transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#00f5ff",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#00f5ff",
              transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-2"
          style={{
            background: "rgba(5, 5, 16, 0.98)",
            borderTop: "1px solid rgba(0,245,255,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 text-base font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-2 text-center"
          >
            הזמן עכשיו
          </a>
        </div>
      )}
    </header>
  );
}
