export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, rgba(155,89,182,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative text-center">
        {/* Emoji accent */}
        <div className="text-6xl mb-8 float">🎊</div>

        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span className="text-white">זה הרגע להפוך</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00f5ff, #9b59b6, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            את האירוע שלכם למופע
          </span>
        </h2>

        <p className="text-white/55 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          אורחים שלא ישכחו את הכניסה שלכם. משפחה שתבכה מרגש.
          וואו-מומנט שיצולם ויועלה לרשתות החברתיות. זה מה שאנחנו יוצרים.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#order"
            className="btn-primary text-xl px-12 py-5 w-full sm:w-auto"
          >
            אני רוצה סרטון מותאם
          </a>
          <a
            href="#demos"
            className="btn-secondary text-base px-8 py-4 w-full sm:w-auto"
          >
            ראה דוגמאות נוספות
          </a>
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/40 text-sm">
          <span>✓ ללא התחייבות</span>
          <span>✓ מחיר הוגן</span>
          <span>✓ שירות אישי</span>
          <span>✓ מוכן בזמן</span>
        </div>
      </div>
    </section>
  );
}
