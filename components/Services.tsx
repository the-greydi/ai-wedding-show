import { services } from "@/data/mockData";

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: "rgba(0,245,255,0.1)", text: "#00f5ff", border: "rgba(0,245,255,0.3)" },
  gold: { bg: "rgba(255,215,0,0.1)", text: "#ffd700", border: "rgba(255,215,0,0.3)" },
  purple: { bg: "rgba(155,89,182,0.1)", text: "#c084fc", border: "rgba(155,89,182,0.3)" },
};

// IDs of the two featured/highlighted services (wedding entrance song + henna song)
const FEATURED_IDS = [1, 2];

export default function Services() {
  const featured = services.filter((s) => FEATURED_IDS.includes(s.id));
  const rest = services.filter((s) => !FEATURED_IDS.includes(s.id));

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.03) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
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
            השירותים שלנו
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            כל מה שצריך{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00f5ff, #9b59b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              לרגע הגדול
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            מפתיחת חתונה מהעתיד ועד שיר חינה מרוקאי — אנחנו יוצרים את הרגע שכולם ידברו עליו
          </p>
        </div>

        {/* ─── FEATURED: שירי כניסה ─── */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4))" }}
            />
            <span
              className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,215,0,0.1)",
                border: "1px solid rgba(255,215,0,0.35)",
                color: "#ffd700",
              }}
            >
              ⭐ המוצרים המובילים שלנו
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.4), transparent)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((service) => {
              const tc = tagColors[service.tagColor] ?? tagColors.gold;
              return (
                <div
                  key={service.id}
                  className="card-hover rounded-2xl p-7 flex flex-col gap-4 cursor-pointer relative overflow-hidden"
                  style={{
                    background:
                      service.id === 2
                        ? "linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,140,0,0.05))"
                        : "linear-gradient(135deg, rgba(0,245,255,0.07), rgba(155,89,182,0.05))",
                    border: `1.5px solid ${tc.border}`,
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      service.id === 2
                        ? "0 0 60px rgba(255,215,0,0.07), 0 20px 50px rgba(0,0,0,0.3)"
                        : "0 0 60px rgba(0,245,255,0.07), 0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Glow orb */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${tc.text}15 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />

                  {/* "מומלץ" ribbon */}
                  <div
                    className="absolute top-5 left-5 text-xs font-black px-3 py-1 rounded-full"
                    style={{
                      background: tc.text,
                      color: "#000",
                    }}
                  >
                    {service.id === 2 ? "🎵 הכי מרגש" : "🔥 הכי מבוקש"}
                  </div>

                  {/* Icon + Tag */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{
                        background: `${tc.text}15`,
                        border: `1px solid ${tc.text}30`,
                      }}
                    >
                      {service.icon}
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-black leading-snug"
                    style={{ color: "#fff" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/65 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Highlights specific to each */}
                  {service.id === 1 && (
                    <div
                      className="flex flex-wrap gap-2"
                    >
                      {["כניסה מהעתיד", "מסכי LED", "שמות הזוג", "מוזיקת טכנו"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(0,245,255,0.08)",
                            border: "1px solid rgba(0,245,255,0.2)",
                            color: "#00f5ff",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {service.id === 2 && (
                    <div className="flex flex-wrap gap-2">
                      {["מנגינה מרוקאית", "מילים מקוריות", "שמות הזוג", "חינה"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(255,215,0,0.08)",
                            border: "1px solid rgba(255,215,0,0.2)",
                            color: "#ffd700",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <div>
                      <div className="text-xs text-white/40 mb-0.5">החל מ</div>
                      <div className="text-3xl font-black" style={{ color: tc.text }}>
                        {service.price}
                      </div>
                    </div>
                    <a
                      href="#order"
                      className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: `linear-gradient(135deg, ${tc.text}, ${tc.text}cc)`,
                        color: "#000",
                        boxShadow: `0 8px 30px ${tc.text}40`,
                      }}
                    >
                      הזמן עכשיו
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── REST OF SERVICES ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((service) => {
            const tc = tagColors[service.tagColor] ?? tagColors.cyan;
            return (
              <div
                key={service.id}
                className="card-hover rounded-2xl p-5 flex flex-col gap-3 cursor-pointer"
                style={{
                  background: "rgba(10,10,30,0.6)",
                  border: `1px solid ${tc.border}`,
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${tc.text}12` }}
                  >
                    {service.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                  >
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {service.title}
                </h3>

                <p className="text-white/50 text-xs leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="text-xl font-black" style={{ color: tc.text }}>
                    {service.price}
                  </div>
                  <a
                    href="#order"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                    style={{
                      background: tc.bg,
                      color: tc.text,
                      border: `1px solid ${tc.border}`,
                    }}
                  >
                    הזמן
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
