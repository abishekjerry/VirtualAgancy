import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const PPieChart = ({ data = [] }) => {
  // 1. Consolidate data so Legend doesn't show duplicates
  const consolidatedData = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      const existing = map.get(item.name) || 0;
      map.set(item.name, existing + item.value);
    });
    return Array.from(map, ([name, value]) => ({ name, value }));
  }, [data]);

  // Map colors to names for consistency
  const colorMap = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

  const total = consolidatedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        width: "100%",
        height: 300, // Reduced height
        background: "#ffffff",
        padding: "10px", // Reduced padding
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        position: "relative", // Required for absolute center text
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={consolidatedData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            cornerRadius={6}
            startAngle={90}
            endAngle={450}
          >
            {consolidatedData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={colorMap[index % colorMap.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* 2. Absolute Centering (Better than Margin-top) */}
      <div
        style={{
          position: "absolute",
          top: "42%", // Adjusted for Legend height
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b" }}>
          {total}
        </div>
        <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase" }}>
          Total
        </div>
      </div>
    </div>
  );
};

export default PPieChart;