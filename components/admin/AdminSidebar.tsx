"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "דשבורד", icon: "📊" },
  { href: "/admin/leads", label: "לידים", icon: "📋" },
  { href: "/admin/videos", label: "וידאו", icon: "🎬" },
  { href: "/admin/content", label: "תוכן", icon: "✏️" },
  { href: "/admin/analytics", label: "אנליטיקה", icon: "📈" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col"
      style={{
        background: "rgba(5,5,20,0.95)",
        borderLeft: "1px solid rgba(0,245,255,0.1)",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="p-6 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(155,89,182,0.2))",
            border: "1px solid rgba(0,245,255,0.3)",
          }}
        >
          ✨
        </div>
        <div>
          <div
            className="font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #9b59b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Wedding Show
          </div>
          <div className="text-white/30 text-xs">ניהול</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: active ? "rgba(0,245,255,0.08)" : "transparent",
                borderRight: active ? "2px solid #00f5ff" : "2px solid transparent",
                color: active ? "#00f5ff" : "rgba(255,255,255,0.55)",
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white/70 transition-colors text-sm"
        >
          <span>🌐</span>
          <span>חזרה לאתר</span>
        </Link>
      </div>
    </aside>
  );
}
