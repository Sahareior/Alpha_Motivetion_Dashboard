import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", revenue: 500 },
  { month: "Feb", revenue: 4000 },
  { month: "Mar", revenue: 9000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 3000 },
  { month: "Jun", revenue: 8000 },
  { month: "Jul", revenue: 10000 },
  { month: "Aug", revenue: 6000 },
  { month: "Sep", revenue: 4000 },
  { month: "Oct", revenue: 8500 },
  { month: "Nov", revenue: 7000 },
  { month: "Dec", revenue: 8800 },
];

const RevenueTrend = () => {
  return (
 <div className="bg-white mt-8 rounded-xl shadow p-6 pb-8" style={{
   boxShadow: '0px 0px 10px 0px #0000001A'
}}>
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="py-2 font-semibold text-[32px]">Revenue Trend</h2>
    <button className="flex items-center gap-1 font-semibold border px-3 py-1 rounded-md text-sm">
      Filter <ChevronDown size={14} />
    </button>
  </div>

  {/* Chart */}
  <div className="w-full h-[505px]">
    <ResponsiveContainer>
      <LineChart 
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Increased bottom margin
      >
        <CartesianGrid 
          horizontal={true} 
          vertical={false}
          stroke="hsl(var(--muted-foreground))"
          strokeDasharray="8 6"
          strokeWidth={1.5}
          opacity={0.6}
        />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 20, fontWeight: 700, color: '#000000'}}
        />
        <YAxis 
          tickFormatter={(v) => `$${v}`}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 17 }}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
  );
};

export default RevenueTrend;