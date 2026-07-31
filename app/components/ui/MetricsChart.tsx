"use client";

import React from "react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";



interface MetricsChartProps {
 data: Record<string, any>[];
  dataKey?: string;
  height?: number;
  color?: "blue" | "green" | "amber" | "fuchsia";
  valuePrefix?: string;
}

export function MetricsChart({ 
  data, 
  height = 300, 
  dataKey = "value",
  color = "blue",
  valuePrefix = ""
}: MetricsChartProps) {
  
  
  const themeColors = {
    blue: "#3b82f6", 
    green: "#10b981", 
    amber: "#fe9a00", 
    fuchsia: "#c800de"
  };

  const activeColor = themeColors[color];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={activeColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={activeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <XAxis 
          dataKey="name" 
          stroke="#525252" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#525252" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `${valuePrefix}${value}`}
        />
        
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
        
       <Tooltip
          contentStyle={{ 
            backgroundColor: "rgba(10, 10, 10, 0.8)", 
            backdropFilter: "blur(12px)",
            borderRadius: "12px", 
            borderColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
          }}
          itemStyle={{ color: activeColor, fontWeight: "bold" }}
          formatter={(value: any) => [`${valuePrefix}${value}`, "Total"]}
          labelStyle={{ color: "#a3a3a3", marginBottom: "4px" }}
        />
        
        <Area 
          type="monotone" 
          dataKey={dataKey}
          stroke={activeColor} 
          strokeWidth={2}
          fillOpacity={1} 
          fill={`url(#colorGradient-${color})`} 
          activeDot={{ r: 6, strokeWidth: 0, fill: activeColor }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}