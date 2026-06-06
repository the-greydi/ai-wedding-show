"use client";
import { demos } from "@/data/mockData";

export default function DemoGallery() {
  return (
    <section id="demos" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(155,89,182,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(155,89,182,0.1)",
              border: "1px solid rgba(155,89,182,0.3)",
              color: "#c084fc",
            }}
          >
            גלריית דוגמאות
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            תראו{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #9b59b6, #00f5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              לפני שמחליטים
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            כל דוגמה נוצרה עם שמות אמיתיים של זוגות אמיתיים — זה מה שאנחנו עושים עבורכם
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <ComingSoonCard key={demo.id} demo={demo} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 mb-4 text-sm">
            הדוגמאות בדרך — הסרטון שלכם יהיה עם שמות הזוג ופרטים אישיים
          </p>
          <a href="#order" className="btn-primary px-10 py-4">
            רוצה כזה לאירוע שלי
          </a>
        </div>
      </div>
    </section>
  );
}

function ComingSoonCard({ demo }: { demo: typeof import("@/data/mockData").demos[0] }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "16/10",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Blurred gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${demo.gradient}`}
        style={{ filter: "blur(2px)", transform: "scale(1.05)", opacity: 0.5 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(5,5,16,0.75)" }}
      />

      {/* Icon — faded */}
      <div
        className="absolute top-4 right-4 text-4xl"
        style={{ opacity: 0.2 }}
      >
        {demo.icon}
      </div>

      {/* Coming soon center badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* Pulsing ring */}
        <div
          className="relative w-16 h-16 flex items-center justify-center rounded-full"
          style={{
            background: `${demo.accentColor}12`,
            border: `1px solid ${demo.accentColor}40`,
          }}
        >
          {/* Ping ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${demo.accentColor}`,
              animation: "pulseRing 2s ease-out infinite",
            }}
          />
          <span className="text-2xl opacity-60">🔒</span>
        </div>

        <div
          className="text-lg font-black tracking-widest uppercase"
          style={{ color: demo.accentColor, textShadow: `0 0 20px ${demo.accentColor}60` }}
        >
          בקרוב
        </div>
        <div className="text-white/35 text-xs text-center px-6">
          התוכן עדיין לא זמין —<br />הדוגמאות יעלו בקרוב
        </div>
      </div>

      {/* Bottom info — category + title */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)" }}
      >
        <div
          className="inline-block text-xs px-2.5 py-1 rounded-full mb-1.5 font-medium"
          style={{
            background: `${demo.accentColor}15`,
            color: `${demo.accentColor}99`,
            border: `1px solid ${demo.accentColor}25`,
          }}
        >
          {demo.categoryHe}
        </div>
        <h3 className="text-white/50 font-bold text-sm leading-snug">{demo.titleHe}</h3>
      </div>
    </div>
  );
}
