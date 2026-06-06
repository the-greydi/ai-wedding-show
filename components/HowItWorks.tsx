const steps = [
  {
    num: "01",
    title: "בוחרים סגנון",
    desc: "בוחרים מבין סגנונות הסרטון — חייזר טכנו, פתיחה קולנועית, שיר חינה מרוקאי, ועוד. כל סגנון מותאם לאווירה שרוצים ליצור.",
    icon: "🎨",
    color: "#00f5ff",
  },
  {
    num: "02",
    title: "כותבים שמות ופרטים",
    desc: "ממלאים טופס קצר עם שמות הזוג, תאריך האירוע, העדפות מוזיקליות והנחיות מיוחדות. ככל שתתנו יותר פרטים, כך הסרטון יהיה מדויק יותר.",
    icon: "✍️",
    color: "#9b59b6",
  },
  {
    num: "03",
    title: "אנחנו יוצרים",
    desc: "הצוות שלנו מייצר עבורכם תוכן AI מותאם אישית — עם עריכה ידנית מקצועית, מוזיקה מותאמת ואיכות פרודקשן פרימיום.",
    icon: "⚡",
    color: "#ffd700",
  },
  {
    num: "04",
    title: "מקבלים קובץ מוכן",
    desc: "מקבלים קובץ 4K מוכן להשמעה מיידית במסכי האולם, בנוסף לגרסאות מותאמות לוואטסאפ ואינסטגרם.",
    icon: "🚀",
    color: "#00f5ff",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(0,245,255,0.03) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255,215,0,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.25)",
              color: "#ffd700",
            }}
          >
            איך זה עובד
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            פשוט כמו{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              1, 2, 3, 4
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            תהליך קצר, תוצאה מרהיבה — בלי כאבי ראש, בלי בזבוז זמן
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-12 right-24 left-24 h-px"
            style={{
              background:
                "linear-gradient(90deg, #00f5ff40, #9b59b640, #ffd70040, #00f5ff40)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                {/* Number circle */}
                <div className="relative flex justify-center mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center relative"
                    style={{
                      background: `${step.color}12`,
                      border: `2px solid ${step.color}40`,
                      boxShadow: `0 0 30px ${step.color}20`,
                    }}
                  >
                    <span className="text-4xl">{step.icon}</span>
                    {/* Step number */}
                    <div
                      className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                      style={{
                        background: step.color,
                        color: "#000",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <div
          className="mt-20 p-8 rounded-2xl text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(155,89,182,0.05))",
            border: "1px solid rgba(0,245,255,0.15)",
          }}
        >
          <div className="text-4xl mb-4">⏱️</div>
          <h3 className="text-white font-bold text-xl mb-2">
            מהיום להיום — תוך 48 שעות
          </h3>
          <p className="text-white/50 text-base">
            לא צריך להמתין שבועות. רוב ההזמנות מוכנות תוך יומיים, ולחתונות דחופות —
            אנחנו כאן בשבילכם.
          </p>
        </div>
      </div>
    </section>
  );
}
