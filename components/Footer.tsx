export default function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(5,5,16,0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-right">
          <div
            className="font-bold text-lg mb-1"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #9b59b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Wedding Show
          </div>
          <div className="text-white/30 text-sm">
            סרטוני חתונה ושירי חינה מותאמים אישית
          </div>
        </div>

        <div className="flex gap-8 text-white/40 text-sm">
          <a href="#services" className="hover:text-white/70 transition-colors">שירותים</a>
          <a href="#demos" className="hover:text-white/70 transition-colors">דוגמאות</a>
          <a href="#packages" className="hover:text-white/70 transition-colors">חבילות</a>
          <a href="#order" className="hover:text-white/70 transition-colors">הזמנה</a>
        </div>

        <div className="text-white/20 text-sm">
          © 2025 AI Wedding Show. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
