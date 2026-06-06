"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        o: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.o += s.speed;
        if (s.o > 1) s.o = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o * 0.8})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #0a0520 0%, #050510 70%)" }}
    >
      {/* Stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Orb decorations */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(155,89,182,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "1.5s",
          zIndex: 1,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative text-center px-6 max-w-5xl mx-auto"
        style={{ zIndex: 2 }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: "rgba(0,245,255,0.08)",
            border: "1px solid rgba(0,245,255,0.25)",
            color: "#00f5ff",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow inline-block" />
          חדש — תוכן AI פרסונלי לאירועים
        </div>

        {/* Main headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            כניסה לחתונה
          </span>
          <br />
          <span className="gradient-text">שאף אחד לא ישכח</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          סרטוני AI, שירי חינה ומופעי פתיחה מותאמים אישית עם שמות החתן והכלה —
          למסכים באולם, לחינה, להזמנות ולרגעי הוואו של האירוע.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a href="#order" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
            הזמנת סרטון מותאם
          </a>
          <a href="#demos" className="btn-secondary text-base px-10 py-4 w-full sm:w-auto">
            ▶ צפייה בדוגמאות
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span>+200 זוגות מרוצים</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>מוכן תוך 48 שעות</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <span>🎬</span>
            <span>איכות 4K לאולמות</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 float"
        style={{ transform: "translateX(-50%)", zIndex: 2 }}
      >
        <span className="text-white/30 text-xs">גלול למטה</span>
        <div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div
            className="w-1 h-2 rounded-full bg-cyan-400"
            style={{ animation: "float 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Floating elements */}
      <div
        className="absolute top-20 right-10 text-4xl float opacity-20"
        style={{ animationDelay: "0s", zIndex: 2 }}
      >
        💍
      </div>
      <div
        className="absolute top-40 left-16 text-3xl float opacity-15"
        style={{ animationDelay: "2s", zIndex: 2 }}
      >
        ✨
      </div>
      <div
        className="absolute bottom-40 right-20 text-3xl float opacity-15"
        style={{ animationDelay: "1s", zIndex: 2 }}
      >
        🎵
      </div>
      <div
        className="absolute bottom-60 left-10 text-2xl float opacity-10"
        style={{ animationDelay: "3s", zIndex: 2 }}
      >
        👽
      </div>
    </section>
  );
}
