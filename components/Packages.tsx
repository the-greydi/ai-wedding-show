"use client";
import { useState } from "react";
import { packages as initialPackages } from "@/data/mockData";

type Package = typeof initialPackages[0];

export default function Packages() {
  const [pkgs, setPkgs] = useState<Package[]>(initialPackages);
  const [editingCell, setEditingCell] = useState<string | null>(null); // "pkgId:field"
  const [saved, setSaved] = useState(false);

  const update = (id: number, field: keyof Package, value: string | string[]) => {
    setPkgs((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = () => {
    console.log("Saved packages:", pkgs);
    setSaved(true);
    setEditingCell(null);
    setTimeout(() => setSaved(false), 3000);
  };

  const editKey = (id: number, field: string) => `${id}:${field}`;
  const isEditing = (id: number, field: string) => editingCell === editKey(id, field);

  return (
    <section id="packages" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,245,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(0,245,255,0.08)",
              border: "1px solid rgba(0,245,255,0.2)",
              color: "#00f5ff",
            }}
          >
            חבילות ומחירים
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            השקעה{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00f5ff, #ffd700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              שמחזירה את עצמה
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            האירוע הזה קורה פעם אחת. תעשו אותו כמו שצריך.
          </p>
        </div>

        {/* Edit mode hint */}
        <div
          className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(0,245,255,0.04)",
            border: "1px dashed rgba(0,245,255,0.2)",
          }}
        >
          <span className="text-white/40 text-xs flex items-center gap-2">
            <span className="text-cyan-400">✏️</span>
            לחצו על כל טקסט או מחיר כדי לערוך אותו ישירות
          </span>
          {saved ? (
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,255,136,0.15)", color: "#00ff88" }}
            >
              ✓ נשמר!
            </span>
          ) : (
            <button
              onClick={handleSave}
              className="text-xs font-bold px-4 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(0,245,255,0.15)",
                color: "#00f5ff",
                border: "1px solid rgba(0,245,255,0.35)",
              }}
            >
              שמור שינויים
            </button>
          )}
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pkgs.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isEditing={isEditing}
              editingCell={editingCell}
              setEditingCell={setEditingCell}
              update={update}
              editKey={editKey}
            />
          ))}
        </div>

        <p className="text-center text-white/30 text-sm mt-8">
          * כל המחירים כוללים מע&quot;מ. עריכות נוספות ותוספות ניתן לרכוש בנפרד.
        </p>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  isEditing,
  editingCell,
  setEditingCell,
  update,
  editKey,
}: {
  pkg: Package;
  isEditing: (id: number, field: string) => boolean;
  editingCell: string | null;
  setEditingCell: (k: string | null) => void;
  update: (id: number, field: keyof Package, value: string | string[]) => void;
  editKey: (id: number, field: string) => string;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
      style={{
        background: pkg.popular
          ? "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(155,89,182,0.08))"
          : "rgba(10,10,30,0.6)",
        border: pkg.popular
          ? "1px solid rgba(0,245,255,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        boxShadow: pkg.popular
          ? "0 0 60px rgba(0,245,255,0.1), 0 20px 60px rgba(0,0,0,0.4)"
          : "0 10px 40px rgba(0,0,0,0.3)",
      }}
    >
      {pkg.badge && (
        <div
          className="text-center py-2 text-xs font-black tracking-wider"
          style={{
            background: pkg.popular
              ? "linear-gradient(135deg, #00f5ff, #9b59b6)"
              : "rgba(255,215,0,0.2)",
            color: pkg.popular ? "#000" : "#ffd700",
          }}
        >
          {pkg.badge}
        </div>
      )}

      <div className="p-7">
        {/* Name */}
        <div className="mb-5">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-1"
            style={{ color: pkg.popular ? "#00f5ff" : "rgba(255,255,255,0.4)" }}
          >
            {pkg.nameEn}
          </div>
          <h3 className="text-2xl font-black text-white">{pkg.name}</h3>

          {/* Editable tagline */}
          <EditableText
            value={pkg.tagline}
            active={isEditing(pkg.id, "tagline")}
            onActivate={() => setEditingCell(editKey(pkg.id, "tagline"))}
            onBlur={(v) => { update(pkg.id, "tagline", v); setEditingCell(null); }}
            color={pkg.popular ? "#00f5ff" : "rgba(255,255,255,0.5)"}
            className="text-sm mt-1"
          />
        </div>

        {/* Editable price */}
        <div className="mb-6">
          <EditableText
            value={pkg.price}
            active={isEditing(pkg.id, "price")}
            onActivate={() => setEditingCell(editKey(pkg.id, "price"))}
            onBlur={(v) => { update(pkg.id, "price", v); setEditingCell(null); }}
            color={pkg.popular ? "#00f5ff" : "#fff"}
            className="text-5xl font-black"
            inputClassName="text-4xl font-black w-36"
          />
          {/* Editable period */}
          <EditableText
            value={pkg.period}
            active={isEditing(pkg.id, "period")}
            onActivate={() => setEditingCell(editKey(pkg.id, "period"))}
            onBlur={(v) => { update(pkg.id, "period", v); setEditingCell(null); }}
            color="rgba(255,255,255,0.4)"
            className="text-sm mt-1"
          />
        </div>

        {/* Editable description */}
        <EditableText
          value={pkg.description}
          active={isEditing(pkg.id, "description")}
          onActivate={() => setEditingCell(editKey(pkg.id, "description"))}
          onBlur={(v) => { update(pkg.id, "description", v); setEditingCell(null); }}
          color="rgba(255,255,255,0.55)"
          className="text-sm mb-6 leading-relaxed"
          multiline
        />

        {/* Features list — each editable */}
        <ul className="space-y-3 mb-8">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 text-sm font-bold shrink-0"
                style={{ color: pkg.popular ? "#00f5ff" : "#ffd700" }}
              >
                ✓
              </span>
              <EditableText
                value={f}
                active={isEditing(pkg.id, `feat-${i}`)}
                onActivate={() => setEditingCell(editKey(pkg.id, `feat-${i}`))}
                onBlur={(v) => {
                  const newFeats = [...pkg.features];
                  newFeats[i] = v;
                  update(pkg.id, "features", newFeats);
                  setEditingCell(null);
                }}
                color="rgba(255,255,255,0.7)"
                className="text-sm leading-snug"
              />
            </li>
          ))}
          {pkg.notIncluded.map((f, i) => (
            <li key={i} className="flex items-start gap-3 opacity-40">
              <span className="mt-0.5 text-sm font-bold shrink-0 text-white/40">✗</span>
              <span className="text-white/40 text-sm line-through">{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="#order"
          className={
            pkg.popular
              ? "btn-primary w-full block text-center py-3.5"
              : "btn-secondary w-full block text-center py-3.5"
          }
        >
          {pkg.popular ? "בחר חבילה זו" : "התחל כאן"}
        </a>
      </div>
    </div>
  );
}

function EditableText({
  value,
  active,
  onActivate,
  onBlur,
  color,
  className = "",
  inputClassName = "",
  multiline = false,
}: {
  value: string;
  active: boolean;
  onActivate: () => void;
  onBlur: (v: string) => void;
  color: string;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
}) {
  if (active) {
    const sharedStyle: React.CSSProperties = {
      background: "rgba(0,245,255,0.06)",
      border: "1px solid rgba(0,245,255,0.4)",
      borderRadius: "8px",
      color,
      padding: "4px 8px",
      outline: "none",
      width: "100%",
      fontFamily: "inherit",
    };

    return multiline ? (
      <textarea
        autoFocus
        defaultValue={value}
        rows={3}
        style={{ ...sharedStyle, resize: "vertical" }}
        className={`text-sm leading-relaxed ${inputClassName}`}
        onBlur={(e) => onBlur(e.target.value)}
      />
    ) : (
      <input
        autoFocus
        defaultValue={value}
        style={sharedStyle}
        className={`${className} ${inputClassName}`}
        onBlur={(e) => onBlur(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
      />
    );
  }

  return (
    <div
      onClick={onActivate}
      title="לחץ לעריכה"
      className={`group relative cursor-text rounded-lg px-1 -mx-1 transition-all duration-150 hover:bg-white/5 ${className}`}
      style={{ color }}
    >
      {value}
      {/* Edit hint on hover */}
      <span
        className="absolute -top-4 left-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ color: "#00f5ff", fontSize: "10px" }}
      >
        ✏️ ערוך
      </span>
    </div>
  );
}
