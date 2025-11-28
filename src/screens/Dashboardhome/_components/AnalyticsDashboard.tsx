import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useUserActivityQuery, useSubsDistQuery } from '../../../../store/slices/apiSlice.js'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-white border bg-[#343F4F] border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground text-white font-medium">{label}</p>
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
      <div className="text-white border bg-[#343F4F] border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground text-white font-medium">{data.payload.subscription_type || data.name}</p>
        <p className="text-sm text-muted-foreground text-yellow-400">{data.value}%</p>
        <p className="text-sm text-gray-300">Count: {data.payload.count}</p>
      </div>
    )
  }
  return null
}

export function AnalyticsDashboard() {
  const { data: activities } = useUserActivityQuery()
  const { data: subs } = useSubsDistQuery()

  // Transform activities data for the bar chart
  const transformActivityData = (data) => {
    if (!data) return [];
    
    return data.map(item => ({
      day: item.day.substring(0, 3), // Shorten day names (e.g., "Monday" -> "Mon")
      freeUsers: item.free_users_activity,
      premiumUsers: item.premium_users_activity
    }));
  };

  // Transform subscription data for the pie chart
  const transformSubscriptionData = (data) => {
    if (!data?.distribution) return [];
    
    // Define colors for different subscription types
    const colorMap = {
      'Free': '#8C9FBA',
      'Premium Monthly': '#343F4F',
      'Premium Yearly': '#475569',
      'Lifetime Premium': '#64748b'
    };
    
    return data.distribution
      .filter(item => item.percentage > 0) // Only show non-zero percentages
      .map(item => ({
        name: item.subscription_type,
        value: item.percentage,
        count: item.count,
        color: colorMap[item.subscription_type] || '#94a3b8' // fallback color
      }));
  };

  const userActivityData = transformActivityData(activities);
  const subscriptionData = transformSubscriptionData(subs);

  return (
    <div className="mt-5 space-y-8 w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="bg-card border border-border rounded-lg shadow-sm" style={{
          boxShadow: '0px 0px 10px 0px #0000001A'
        }}>
          <div className="p-6 flex justify-between items-center pb-4">
            <h3 className="text-foreground text-[32px] font-semibold">User Activity</h3>
            <div className="flex items-center justify-end gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#8C9FBA] rounded-sm"></div>
                <span className="text-muted-foreground text-[#303030] text-[16px]">Free Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#343F4F] rounded-sm"></div>
                <span className="text-muted-foreground text-[#303030] text-[16px]">Premium Users</span>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="h-[27rem]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={userActivityData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
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
                    // Let YAxis automatically determine the domain based on data
                  />
                  <CartesianGrid 
                    horizontal={true} 
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="8 6"
                    strokeWidth={1.5}
                    opacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="freeUsers" fill="#8C9FBA" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="premiumUsers" fill="#343F4F" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Subscription Distribution Chart */}
        <div className="bg-card border border-border rounded-lg shadow-sm" style={{
          boxShadow: '0px 0px 10px 0px #0000001A'
        }}>
          <div className="p-6 pb-4">
            <h3 className="text-foreground text-[32px] font-semibold">Subscription Distribution</h3>
            {subs && (
              <p className="text-muted-foreground text-sm mt-2">
                Total Users: {subs.total_users}
              </p>
            )}
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
                    nameKey="name"
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
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-foreground block">
                      {item.value}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.count} users)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}