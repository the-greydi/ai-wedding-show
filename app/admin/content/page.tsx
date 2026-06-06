"use client";
import { useState } from "react";

const initialContent = {
  heroHeadline: "כניסה לחתונה שאף אחד לא ישכח",
  heroSub: "סרטוני AI, שירי חינה ומופעי פתיחה מותאמים אישית עם שמות החתן והכלה — למסכים באולם, לחינה, להזמנות ולרגעי הוואו של האירוע.",
  heroCTA1: "הזמנת סרטון מותאם",
  heroCTA2: "צפייה בדוגמאות",
  finalHeadline: "זה הרגע להפוך את האירוע שלכם למופע",
  finalCTA: "אני רוצה סרטון מותאם",
  basicPrice: "₪299",
  premiumPrice: "₪549",
  ultimatePrice: "₪899",
  whatsapp: "972500000000",
};

const faqInitial = [
  { q: "האם אפשר לשלב את שמות החתן והכלה?", a: "בהחלט! זה בדיוק מה שאנחנו עושים..." },
  { q: "האם זה מתאים למסכי אולם?", a: "כן! אנחנו מייצרים קבצים באיכות 4K..." },
];

export default function ContentPage() {
  const [content, setContent] = useState(initialContent);
  const [faqs, setFaqs] = useState(faqInitial);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "packages" | "faq" | "settings">("hero");

  const handleSave = () => {
    console.log("Saving content:", content, faqs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">עריכת תוכן</h1>
          <p className="text-white/40 text-sm">ניהול טקסטים, מחירים ותכנים דינמיים</p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all"
          style={{
            background: saved ? "rgba(0,255,136,0.15)" : "linear-gradient(135deg, #00f5ff, #0099cc)",
            color: saved ? "#00ff88" : "#000",
            border: saved ? "1px solid rgba(0,255,136,0.4)" : "none",
          }}
        >
          {saved ? "✓ נשמר!" : "שמור שינויים"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([["hero", "עמוד בית"], ["packages", "חבילות"], ["faq", "שאלות נפוצות"], ["settings", "הגדרות"]] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === tab ? "rgba(0,245,255,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${activeTab === tab ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: activeTab === tab ? "#00f5ff" : "rgba(255,255,255,0.5)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: "rgba(10,10,30,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {activeTab === "hero" && (
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg mb-5">עמוד בית — Hero</h3>
            <ContentField
              label="כותרת ראשית"
              value={content.heroHeadline}
              onChange={(v) => setContent({ ...content, heroHeadline: v })}
              large
            />
            <ContentField
              label="תת-כותרת"
              value={content.heroSub}
              onChange={(v) => setContent({ ...content, heroSub: v })}
              textarea
            />
            <div className="grid grid-cols-2 gap-4">
              <ContentField
                label="כפתור ראשי"
                value={content.heroCTA1}
                onChange={(v) => setContent({ ...content, heroCTA1: v })}
              />
              <ContentField
                label="כפתור משני"
                value={content.heroCTA2}
                onChange={(v) => setContent({ ...content, heroCTA2: v })}
              />
            </div>
            <div className="border-t border-white/5 pt-5">
              <h4 className="text-white/60 text-sm font-medium mb-4">קריאה לפעולה סופית</h4>
              <ContentField
                label="כותרת סופית"
                value={content.finalHeadline}
                onChange={(v) => setContent({ ...content, finalHeadline: v })}
                large
              />
              <div className="mt-4">
                <ContentField
                  label="כפתור סופי"
                  value={content.finalCTA}
                  onChange={(v) => setContent({ ...content, finalCTA: v })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "packages" && (
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg mb-5">עריכת מחירים</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "מחיר בייסיק", key: "basicPrice" as const },
                { label: "מחיר פרימיום", key: "premiumPrice" as const },
                { label: "מחיר אלטימייט", key: "ultimatePrice" as const },
              ].map(({ label, key }) => (
                <div key={key} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <ContentField
                    label={label}
                    value={content[key]}
                    onChange={(v) => setContent({ ...content, [key]: v })}
                  />
                </div>
              ))}
            </div>
            <div
              className="p-4 rounded-xl text-sm text-white/40"
              style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.1)" }}
            >
              💡 שינויים במחירים יופיעו מיידית בעמוד הציבורי לאחר שמירה ורענון
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg">שאלות נפוצות</h3>
              <button
                onClick={() => setFaqs([...faqs, { q: "שאלה חדשה", a: "תשובה כאן..." }])}
                className="text-xs px-4 py-2 rounded-lg"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.25)" }}
              >
                + הוסף שאלה
              </button>
            </div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-xl space-y-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">שאלה {i + 1}</span>
                  <button
                    onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                    className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                  >
                    מחק
                  </button>
                </div>
                <textarea
                  value={faq.q}
                  onChange={(e) => setFaqs(faqs.map((f, j) => j === i ? { ...f, q: e.target.value } : f))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  placeholder="השאלה..."
                />
                <textarea
                  value={faq.a}
                  onChange={(e) => setFaqs(faqs.map((f, j) => j === i ? { ...f, a: e.target.value } : f))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  placeholder="התשובה..."
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg mb-5">הגדרות כלליות</h3>
            <ContentField
              label="מספר וואטסאפ (עם קוד מדינה)"
              value={content.whatsapp}
              onChange={(v) => setContent({ ...content, whatsapp: v })}
            />
            <div
              className="p-4 rounded-xl text-sm text-white/40"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              הגדרות נוספות יתווספו בגרסאות עתידיות: אינטגרציה עם CRM, אוטומציות, ועוד.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentField({
  label, value, onChange, textarea, large,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  large?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-white/40 mb-2 font-medium">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-white outline-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: large ? "20px" : "14px",
            fontWeight: large ? "700" : "400",
          }}
        />
      )}
    </div>
  );
}
