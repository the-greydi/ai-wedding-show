import { analyticsData, mockLeads, mockVideos } from "@/data/mockData";

const kpiCards = [
  {
    label: "סה\"כ לידים",
    value: String(analyticsData.totalLeads),
    icon: "📋",
    color: "#00f5ff",
    change: analyticsData.monthlyGrowth,
    positive: true,
  },
  {
    label: "הכנסות כוללות",
    value: analyticsData.totalRevenue,
    icon: "💰",
    color: "#ffd700",
    change: "+12%",
    positive: true,
  },
  {
    label: "שיעור המרה",
    value: analyticsData.conversionRate,
    icon: "📈",
    color: "#00ff88",
    change: "+5%",
    positive: true,
  },
  {
    label: "ממתינות לטיפול",
    value: String(analyticsData.pendingOrders),
    icon: "⏳",
    color: "#c084fc",
    change: "-2",
    positive: false,
  },
];

export default function AnalyticsPage() {
  const videosByViews = [...mockVideos].sort((a, b) => b.views - a.views);
  const leadsByPackage = [
    { name: "פרימיום", count: 22, revenue: "₪12,078" },
    { name: "אלטימייט", count: 15, revenue: "₪13,485" },
    { name: "בייסיק", count: 10, revenue: "₪2,990" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">אנליטיקה</h1>
        <p className="text-white/40 text-sm">נתוני ביצועים ומדדי עסק</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {kpiCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(10,10,30,0.8)",
              border: `1px solid ${card.color}20`,
            }}
          >
            <div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-full"
              style={{
                background: `radial-gradient(circle, ${card.color}10 0%, transparent 70%)`,
              }}
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  background: card.positive ? "rgba(0,255,136,0.1)" : "rgba(255,100,100,0.1)",
                  color: card.positive ? "#00ff88" : "#ff6464",
                }}
              >
                {card.change}
              </span>
            </div>
            <div className="text-3xl font-black mb-1" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-white/55 text-sm">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Weekly bar chart */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-white font-bold mb-5">לידים שבועיים</h3>
          <div className="flex items-end gap-3 h-36">
            {analyticsData.weeklyLeads.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-white/40">{val}</div>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(val / 11) * 100}px`,
                    background: `linear-gradient(180deg, #00f5ff, #9b59b640)`,
                    boxShadow: "0 0 8px rgba(0,245,255,0.3)",
                  }}
                />
                <div className="text-xs text-white/30">
                  {["א", "ב", "ג", "ד", "ה", "ו", "ש"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package distribution */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-white font-bold mb-5">התפלגות חבילות</h3>
          <div className="space-y-4">
            {analyticsData.packageBreakdown.map((pkg) => (
              <div key={pkg.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70 font-medium">{pkg.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">{pkg.count} הזמנות</span>
                    <span style={{ color: pkg.color }} className="font-bold">{Math.round((pkg.count / 47) * 100)}%</span>
                  </div>
                </div>
                <div className="h-3 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(pkg.count / 47) * 100}%`,
                      background: `linear-gradient(90deg, ${pkg.color}, ${pkg.color}80)`,
                      boxShadow: `0 0 12px ${pkg.color}50`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by package + top videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white font-bold">הכנסה לפי חבילה</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {["חבילה", "הזמנות", "הכנסה"].map((h) => (
                  <th key={h} className="px-5 py-3 text-right text-xs text-white/30 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadsByPackage.map((pkg, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="px-5 py-4 text-white font-medium">{pkg.name}</td>
                  <td className="px-5 py-4 text-white/60">{pkg.count}</td>
                  <td className="px-5 py-4 font-bold" style={{ color: "#00ff88" }}>{pkg.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white font-bold">דוגמאות — הכי נצפות</h3>
          </div>
          <div className="p-4 space-y-3">
            {videosByViews.map((video, i) => (
              <div key={video.id} className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{
                    background: i === 0 ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.05)",
                    color: i === 0 ? "#ffd700" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${i === 0 ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  #{i + 1}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${video.gradient}`}>
                  <span className="text-lg">{video.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{video.titleHe}</div>
                  <div className="text-white/35 text-xs">{video.category}</div>
                </div>
                <div className="text-white/60 text-sm font-mono">
                  {video.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
