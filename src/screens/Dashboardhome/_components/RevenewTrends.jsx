import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useRevenuDataQuery } from "../../../../store/slices/apiSlice";

const RevenueTrend = () => {
  const { data: revenue, isLoading } = useRevenuDataQuery(2025);

  // Ensure data exists, and convert revenue to numbers
  const chartData = revenue?.map((item) => ({
    month: item.month,
    revenue: parseFloat(item.revenue),
  })) || [];

  return (
    <div
      className="bg-white mt-8 rounded-xl shadow p-6 pb-8"
      style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="py-2 font-semibold text-[32px]">Revenue Report</h2>
        <button className="flex items-center gap-1 font-semibold border px-3 py-1 rounded-md text-sm">
          Filter <ChevronDown size={14} />
        </button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <p className="text-center text-gray-500 py-16 text-lg">
          Loading chart...
        </p>
      ) : (
        <div className="w-full h-[505px]">
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#e5e7eb"
                strokeDasharray="8 6"
                strokeWidth={1.5}
                opacity={0.6}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 14,
                }}
              />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Revenue Line */}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RevenueTrend;
