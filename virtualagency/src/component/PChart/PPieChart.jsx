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
  // 1️⃣ Consolidate data to avoid duplicate Legend entries
  const consolidatedData = useMemo(() => {
    const map = new Map();
    data.forEach((item) => {
      const existing = map.get(item.name) || 0;
      map.set(item.name, existing + item.value);
    });
    return Array.from(map, ([name, value]) => ({ name, value }));
  }, [data]);

  // 2️⃣ Map colors for consistency
  const colorMap = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];

  const total = consolidatedData.reduce((sum, item) => sum + item.value, 0);

  const dataWithPercent = consolidatedData.map((item) => ({
    ...item,
    percent: item.value / total, // decimal fraction for Recharts
  }));

  // 3️⃣ Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, percent } = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "12px",
            color: "#111827",
          }}
        >
          {`${name}: ${value} (${(percent * 100).toFixed(1)}%)`} {/* Single line */}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "#ffffff",
        padding: "5px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={400}>
          <Pie
            data={dataWithPercent}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            cornerRadius={4}
            startAngle={80}
            endAngle={450}
            labelLine= {true}
            label={({ name, value, percent }) =>
              `${name}: ${value} (${(percent * 100).toFixed(1)}%)` // Name + count + percentage
            }
            fontSize={8}
            
          >
            {dataWithPercent.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={colorMap[index % colorMap.length]}
              />
            ))}
          </Pie>

          {/* 4️⃣ Use Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

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

      {/* Center total */}
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>
          {total}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#64748b",
            textTransform: "uppercase",
          }}
        >
          Total
        </div>
      </div>
    </div>
  );
};

export default PPieChart;