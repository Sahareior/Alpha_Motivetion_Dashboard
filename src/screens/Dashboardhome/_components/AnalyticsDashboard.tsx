

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

const userActivityData = [
  { day: "Mon", freeUsers: 45, premiumUsers: 30 },
  { day: "Tue", freeUsers: 25, premiumUsers: 65 },
  { day: "Wed", freeUsers: 35, premiumUsers: 45 },
  { day: "Thu", freeUsers: 30, premiumUsers: 40 },
  { day: "Fri", freeUsers: 40, premiumUsers: 85 },
  { day: "Sat", freeUsers: 35, premiumUsers: 50 },
  { day: "Sun", freeUsers: 30, premiumUsers: 60 },
]

const subscriptionData = [
  { name: "Monthly", value: 45, color: "#1e293b" },
  { name: "Yearly", value: 30, color: "#475569" },
  { name: "One-time", value: 25, color: "#64748b" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === "freeUsers" ? "Free Users" : "Premium Users"}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">{data.value}%</p>
      </div>
    )
  }
  return null
}

export function AnalyticsDashboard() {
  return (
    <div className=" mt-5 space-y-8 w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="bg-card border border-border rounded-lg shadow-sm" style={{
          boxShadow: '0px 0px 10px 0px #0000001A'

        }}>
          <div className="p-6 pb-4">
            <h3 className="text-foreground text-lg font-semibold mb-4">User Activity</h3>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-sm"></div>
                <span className="text-muted-foreground">Free Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-1 rounded-sm"></div>
                <span className="text-muted-foreground">Premium Users</span>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    domain={[0, 100]}
                    ticks={[0, 15, 30, 45, 60, 75]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="freeUsers" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="premiumUsers" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Subscription Distribution Chart */}
        <div  className="bg-card border border-border rounded-lg shadow-sm" style={{
           boxShadow: '0px 0px 10px 0px #0000001A'
        }}>
          <div className="p-6 pb-4">
            <h3 className="text-foreground text-lg font-semibold">Subscription Distribution</h3>
          </div>
          <div className="px-6 pb-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {subscriptionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
