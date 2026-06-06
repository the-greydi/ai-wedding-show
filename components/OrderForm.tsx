"use client";
import { useState } from "react";

const styles = [
  "חייזר טכנו למסכי אולם",
  "שיר חינה מרוקאי",
  "פתיחה קולנועית",
  "הזמנה דיגיטלית",
  "ברכת רובוט",
  "חבילת אולם / מפיק",
];

const eventTypes = ["חתונה", "חינה", "הצעת נישואין", "אחר"];

export default function OrderForm() {
  const [form, setForm] = useState({
    groom: "",
    bride: "",
    date: "",
    eventType: "",
    style: "",
    notes: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", form);
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="order" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(0,245,255,0.08)",
              border: "1px solid rgba(0,245,255,0.2)",
              color: "#00f5ff",
            }}
          >
            טופס הזמנה
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            הצעד הראשון{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00f5ff, #9b59b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              לאירוע מושלם
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            מלאו את הפרטים ואנחנו נחזור אליכם עם הצעת מחיר תוך 24 שעות
          </p>
        </div>

        {submitted ? (
          <div
            className="text-center p-12 rounded-2xl"
            style={{
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.3)",
            }}
          >
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-black text-white mb-3">
              קיבלנו! תודה רבה
            </h3>
            <p className="text-white/60 text-lg">
              הצוות שלנו יחזור אליכם תוך 24 שעות עם הצעת מחיר מותאמת אישית.
              <br />
              בינתיים, תרגישו חופשי לעיין בדוגמאות נוספות.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-secondary mt-8 px-8 py-3"
            >
              הגש טופס נוסף
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 space-y-6"
            style={{
              background: "rgba(10,10,30,0.7)",
              border: "1px solid rgba(0,245,255,0.15)",
              backdropFilter: "blur(30px)",
            }}
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="שם החתן"
                name="groom"
                value={form.groom}
                onChange={handleChange}
                placeholder="שם החתן"
                required
              />
              <FormField
                label="שם הכלה"
                name="bride"
                value={form.bride}
                onChange={handleChange}
                placeholder="שם הכלה"
                required
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="תאריך האירוע"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  סוג האירוע
                </label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <option value="" style={{ background: "#0a0a1a" }}>
                    בחר סוג אירוע
                  </option>
                  {eventTypes.map((t) => (
                    <option key={t} value={t} style={{ background: "#0a0a1a" }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Style select */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                בחירת סגנון
              </label>
              <select
                name="style"
                value={form.style}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <option value="" style={{ background: "#0a0a1a" }}>
                  בחר סגנון
                </option>
                {styles.map((s) => (
                  <option key={s} value={s} style={{ background: "#0a0a1a" }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                הערות מיוחדות
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="ספרו לנו על האירוע — מה חשוב לכם, איזה אווירה, שירים מועדפים..."
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="טלפון"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="05X-XXXXXXX"
                required
              />
              <FormField
                label="אימייל"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-black mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full inline-block" style={{ animation: "spin-slow 0.8s linear infinite" }} />
                  שולח...
                </span>
              ) : (
                "שלחו לי הצעת מחיר"
              )}
            </button>

            <p className="text-center text-white/30 text-xs">
              * אנחנו לא שולחים ספאם. הפרטים שלכם שמורים ולא יועברו לאף גורם שלישי.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200 focus:border-cyan-500/50"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}
