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
    <div className="bg-white mt-8 rounded-xl shadow p-4" style={{
       boxShadow: '0px 0px 10px 0px #0000001A'
    }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Revenue Trend</h2>
        <button className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm">
          Filter <ChevronDown size={14} />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-[575px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `$${v}`} />
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
