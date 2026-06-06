import { analyticsData, mockLeads } from "@/data/mockData";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "rgba(0,245,255,0.1)", text: "#00f5ff", label: "ליד חדש" },
  in_progress: { bg: "rgba(255,215,0,0.1)", text: "#ffd700", label: "בתהליך" },
  delivered: { bg: "rgba(0,255,136,0.1)", text: "#00ff88", label: "הועבר" },
  closed: { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.4)", label: "סגור" },
};

const statCards = [
  { label: "סה\"כ לידים", value: String(analyticsData.totalLeads), icon: "📋", color: "#00f5ff", sub: analyticsData.monthlyGrowth + " החודש" },
  { label: "הכנסות", value: analyticsData.totalRevenue, icon: "💰", color: "#ffd700", sub: "סה\"כ עד היום" },
  { label: "הזמנות פתוחות", value: String(analyticsData.pendingOrders), icon: "⏳", color: "#c084fc", sub: "ממתינות לטיפול" },
  { label: "הושלמו", value: String(analyticsData.completedOrders), icon: "✅", color: "#00ff88", sub: "אירועים מוצלחים" },
];

export default function AdminDashboard() {
  const recentLeads = mockLeads.slice(0, 5);

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">דשבורד</h1>
        <p className="text-white/40 text-sm">ברוכים הבאים לפאנל הניהול</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(10,10,30,0.8)",
              border: `1px solid ${card.color}25`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, ${card.color}08 0%, transparent 70%)`,
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-3xl font-black mb-1" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-white/70 text-sm font-medium">{card.label}</div>
            <div className="text-white/30 text-xs mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div
          className="rounded-2xl p-6 col-span-1"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-white font-bold mb-4">חבילות פופולריות</h3>
          {analyticsData.packageBreakdown.map((pkg) => (
            <div key={pkg.name} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">{pkg.name}</span>
                <span style={{ color: pkg.color }}>{pkg.count}</span>
              </div>
              <div
                className="h-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(pkg.count / 47) * 100}%`,
                    background: pkg.color,
                    boxShadow: `0 0 10px ${pkg.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-white font-bold mb-4">מדדי המרה</h3>
          <div className="space-y-4">
            <Metric label="שיעור המרה" value={analyticsData.conversionRate} color="#00f5ff" />
            <Metric label="חבילה מובילה" value={analyticsData.topPackage} color="#ffd700" />
            <Metric label="שירות מבוקש" value={analyticsData.topService} color="#c084fc" />
            <Metric label="גדילה חודשית" value={analyticsData.monthlyGrowth} color="#00ff88" />
          </div>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(10,10,30,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3 className="text-white font-bold mb-4">פעילות שבועית</h3>
          <div className="flex items-end gap-2 h-24">
            {analyticsData.weeklyLeads.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${(val / 11) * 80}px`,
                    background: `linear-gradient(180deg, #00f5ff, #9b59b640)`,
                    boxShadow: "0 0 8px rgba(0,245,255,0.3)",
                  }}
                />
                <span className="text-white/30 text-xs">
                  {["א", "ב", "ג", "ד", "ה", "ו", "ש"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,30,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white font-bold">לידים אחרונים</h3>
          <a href="/admin/leads" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            כל הלידים →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {["זוג", "אירוע", "סוג", "חבילה", "סטטוס", "תאריך"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-right text-xs font-medium text-white/30 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => {
                const sc = statusColors[lead.status];
                return (
                  <tr
                    key={lead.id}
                    className="admin-table-row"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {lead.groom} & {lead.bride}
                      </div>
                      <div className="text-white/40 text-xs">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-white/60">{lead.eventDate}</td>
                    <td className="px-6 py-4 text-white/60">{lead.eventType}</td>
                    <td className="px-6 py-4 text-white/60">{lead.package}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs">{lead.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50 text-sm">{label}</span>
      <span className="font-bold text-sm" style={{ color }}>{value}</span>
    </div>
  );
}
