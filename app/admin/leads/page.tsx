"use client";
import { useState } from "react";
import { mockLeads } from "@/data/mockData";

const statusOptions = [
  { value: "new", label: "ליד חדש", bg: "rgba(0,245,255,0.1)", color: "#00f5ff" },
  { value: "in_progress", label: "בתהליך", bg: "rgba(255,215,0,0.1)", color: "#ffd700" },
  { value: "delivered", label: "הועבר", bg: "rgba(0,255,136,0.1)", color: "#00ff88" },
  { value: "closed", label: "סגור", bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" },
];

const allFilters = ["הכל", "new", "in_progress", "delivered", "closed"];
const filterLabels: Record<string, string> = {
  "הכל": "הכל",
  "new": "ליד חדש",
  "in_progress": "בתהליך",
  "delivered": "הועבר",
  "closed": "סגור",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [filter, setFilter] = useState("הכל");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<typeof mockLeads[0] | null>(null);

  const filtered = leads.filter((l) => {
    const matchFilter = filter === "הכל" || l.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.groom.includes(q) ||
      l.bride.includes(q) ||
      l.email.includes(q) ||
      l.phone.includes(q);
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: number, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : null);
  };

  const getStatusStyle = (status: string) => {
    return statusOptions.find((s) => s.value === status) ?? statusOptions[0];
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white mb-1">ניהול לידים</h1>
        <p className="text-white/40 text-sm">כל הבקשות שהתקבלו מהאתר</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם, אימייל, טלפון..."
          className="flex-1 px-4 py-3 rounded-xl text-white text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
        <div className="flex gap-2 flex-wrap">
          {allFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
              style={{
                background: filter === f ? "rgba(0,245,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filter === f ? "#00f5ff" : "rgba(255,255,255,0.5)",
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
        <button
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
          style={{
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.2)",
            color: "#00ff88",
          }}
          onClick={() => {
            const csv = [
              ["חתן", "כלה", "טלפון", "אימייל", "תאריך", "סוג", "חבילה", "סטטוס"],
              ...filtered.map((l) => [l.groom, l.bride, l.phone, l.email, l.eventDate, l.eventType, l.package, l.status]),
            ]
              .map((r) => r.join(","))
              .join("\n");
            const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "leads.csv";
            a.click();
          }}
        >
          ייצא CSV
        </button>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div
          className="flex-1 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["זוג", "טלפון", "תאריך אירוע", "סוג", "חבילה", "סטטוס", "פעולות"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-right text-xs text-white/30 uppercase tracking-wider font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const sc = getStatusStyle(lead.status);
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(isSelected ? null : lead)}
                      className="cursor-pointer transition-all duration-150"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        background: isSelected ? "rgba(0,245,255,0.04)" : "transparent",
                      }}
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-sm">{lead.groom} & {lead.bride}</div>
                        <div className="text-white/35 text-xs">{lead.email}</div>
                      </td>
                      <td className="px-5 py-4 text-white/55 text-xs">{lead.phone}</td>
                      <td className="px-5 py-4 text-white/55 text-xs">{lead.eventDate}</td>
                      <td className="px-5 py-4 text-white/55 text-xs">{lead.eventType}</td>
                      <td className="px-5 py-4 text-white/55 text-xs">{lead.package}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: sc.bg, color: sc.color }}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs px-2 py-1.5 rounded-lg outline-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                          }}
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value} style={{ background: "#0a0a1a" }}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-white/30">
                      לא נמצאו לידים
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selectedLead && (
          <div
            className="w-72 shrink-0 rounded-2xl p-6"
            style={{
              background: "rgba(10,10,30,0.9)",
              border: "1px solid rgba(0,245,255,0.15)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">פרטי ליד</h3>
              <button onClick={() => setSelectedLead(null)} className="text-white/40 hover:text-white text-lg">✕</button>
            </div>

            <div className="space-y-4">
              <DetailRow label="חתן" value={selectedLead.groom} />
              <DetailRow label="כלה" value={selectedLead.bride} />
              <DetailRow label="טלפון" value={selectedLead.phone} />
              <DetailRow label="אימייל" value={selectedLead.email} />
              <DetailRow label="תאריך" value={selectedLead.eventDate} />
              <DetailRow label="סוג" value={selectedLead.eventType} />
              <DetailRow label="סגנון" value={selectedLead.style} />
              <DetailRow label="חבילה" value={selectedLead.package} />
              <div>
                <div className="text-white/40 text-xs mb-1">הערות</div>
                <div className="text-white/70 text-sm bg-white/4 rounded-lg p-3 text-xs leading-relaxed" style={{ background: "rgba(255,255,255,0.04)" }}>
                  {selectedLead.notes || "—"}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href={`tel:${selectedLead.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.3)" }}
              >
                📞 התקשר
              </a>
              <a
                href={`https://wa.me/972${selectedLead.phone.replace(/-/g, "").replace(/^0/, "")}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: "rgba(0,255,100,0.08)", color: "#00ff88", border: "1px solid rgba(0,255,100,0.25)" }}
              >
                💬 וואטסאפ
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-white/35 text-xs mb-0.5">{label}</div>
      <div className="text-white text-sm font-medium">{value}</div>
    </div>
  );
}
