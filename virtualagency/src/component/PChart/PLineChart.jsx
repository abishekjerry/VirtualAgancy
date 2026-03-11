import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const PLineChart = ({ data }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 320,
        background: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e91e63" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#e91e63" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          />

          {/* Area Background */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#lineGradient)"
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#e91e63"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PLineChart;