"use client";
import { useState } from "react";
import { faqs } from "@/data/mockData";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(155,89,182,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(155,89,182,0.1)",
              border: "1px solid rgba(155,89,182,0.3)",
              color: "#c084fc",
            }}
          >
            שאלות נפוצות
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            יש לכם{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #00f5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              שאלות?
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            אנחנו כאן עם תשובות
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: openIdx === i
                  ? "rgba(0,245,255,0.05)"
                  : "rgba(10,10,30,0.5)",
                border: openIdx === i
                  ? "1px solid rgba(0,245,255,0.25)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-right"
              >
                <span
                  className="text-base font-bold"
                  style={{ color: openIdx === i ? "#00f5ff" : "#fff" }}
                >
                  {faq.q}
                </span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all duration-300"
                  style={{
                    background: openIdx === i
                      ? "rgba(0,245,255,0.2)"
                      : "rgba(255,255,255,0.05)",
                    transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <span
                    className="text-lg font-light leading-none"
                    style={{ color: openIdx === i ? "#00f5ff" : "rgba(255,255,255,0.5)" }}
                  >
                    +
                  </span>
                </span>
              </button>

              {openIdx === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-white/5 mb-4" />
                  <p className="text-white/65 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom contact */}
        <div
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: "rgba(0,245,255,0.03)",
            border: "1px solid rgba(0,245,255,0.1)",
          }}
        >
          <p className="text-white/60 text-sm mb-3">
            לא מצאתם תשובה? דברו איתנו ישירות
          </p>
          <a
            href="https://wa.me/972500000000"
            className="inline-flex items-center gap-2 text-green-400 font-semibold text-sm hover:text-green-300 transition-colors"
          >
            <span className="text-lg">💬</span>
            שלחו לנו וואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
