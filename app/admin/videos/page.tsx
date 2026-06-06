"use client";
import { useState } from "react";
import { mockVideos } from "@/data/mockData";

const categories = ["הכל", "Alien Techno", "Henna Songs", "Wedding Intro", "Robot MC", "Invitations"];

export default function VideosPage() {
  const [videos, setVideos] = useState(mockVideos);
  const [filter, setFilter] = useState("הכל");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = filter === "הכל" ? videos : videos.filter((v) => v.category === filter);

  const toggleFeatured = (id: number) => {
    setVideos((prev) => prev.map((v) => v.id === id ? { ...v, featured: !v.featured } : v));
  };

  const deleteVideo = (id: number) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">ניהול וידאו</h1>
          <p className="text-white/40 text-sm">העלה, ערוך ונהל את כל הסרטונים</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="btn-primary px-6 py-3 text-sm"
        >
          + העלאת וידאו חדש
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: filter === cat ? "rgba(0,245,255,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === cat ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: filter === cat ? "#00f5ff" : "rgba(255,255,255,0.5)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
          onClick={() => setShowUpload(false)}
        >
          <div
            className="rounded-2xl p-8 w-full max-w-md"
            style={{
              background: "rgba(10,10,30,0.98)",
              border: "1px solid rgba(0,245,255,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-xl mb-6">העלאת וידאו חדש</h3>
            <div className="space-y-4">
              <input
                placeholder="כותרת בעברית"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
              />
              <select
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <option style={{ background: "#0a0a1a" }}>בחר קטגוריה</option>
                {categories.slice(1).map((c) => (
                  <option key={c} style={{ background: "#0a0a1a" }}>{c}</option>
                ))}
              </select>
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-cyan-500/50"
                style={{ borderColor: "rgba(0,245,255,0.2)" }}
              >
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-white/50 text-sm">גרור קובץ וידאו לכאן</div>
                <div className="text-white/30 text-xs mt-1">MP4, MOV, AVI — עד 500MB</div>
              </div>
              <div className="flex gap-3">
                <button className="btn-primary flex-1 py-3 text-sm">העלה</button>
                <button
                  onClick={() => setShowUpload(false)}
                  className="btn-secondary flex-1 py-3 text-sm"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((video) => (
          <div
            key={video.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,10,30,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Thumbnail */}
            <div
              className={`relative h-40 bg-gradient-to-br ${video.gradient} flex items-center justify-center`}
            >
              <span className="text-5xl opacity-50">{video.icon}</span>
              <div className="absolute top-3 right-3 flex gap-2">
                {video.featured && (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-bold"
                    style={{ background: "rgba(255,215,0,0.2)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.4)" }}
                  >
                    ⭐ מוצג
                  </span>
                )}
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.6)" }}
                >
                  {video.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              {editingId === video.id ? (
                <input
                  defaultValue={video.titleHe}
                  className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none mb-3"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(0,245,255,0.3)" }}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                />
              ) : (
                <h3 className="text-white font-bold text-sm mb-1">{video.titleHe}</h3>
              )}
              <div className="flex items-center gap-3 text-white/40 text-xs mb-4">
                <span>👁 {video.views.toLocaleString()} צפיות</span>
                <span>•</span>
                <span>{video.description}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(video.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: "rgba(0,245,255,0.08)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    color: "#00f5ff",
                  }}
                >
                  ✏️ ערוך
                </button>
                <button
                  onClick={() => toggleFeatured(video.id)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: video.featured ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${video.featured ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.08)"}`,
                    color: video.featured ? "#ffd700" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {video.featured ? "★ מוצג" : "☆ הצג"}
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="px-3 py-2 rounded-lg text-xs transition-all"
                  style={{
                    background: "rgba(255,50,50,0.08)",
                    border: "1px solid rgba(255,50,50,0.2)",
                    color: "#ff5555",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
