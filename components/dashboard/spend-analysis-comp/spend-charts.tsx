"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { spendingBySuppliers, spendingByMonth, spendingByCommodity, spendingByLocation } from "@/data/spend-analysis";

export default function SpendCharts() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredSupplier, setHoveredSupplier] = useState<number | null>(null);

  // Spend by Month processing
  const maxMonthSpend = Math.max(...spendingByMonth.map(m => m.Spend));
  const points = spendingByMonth.map((m, i) => {
    const x = 50 + (i * 50);
    const y = 250 - (m.Spend / maxMonthSpend) * 200;
    return { x, y, ...m };
  });
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");
  const fillD = `${pathD} L ${points[points.length - 1].x} 250 L ${points[0].x} 250 Z`;

  // Spend by Supplier processing (top 8)
  const topSuppliers = [...spendingBySuppliers]
    .sort((a, b) => b.Spend - a.Spend)
    .slice(0, 8);
  const maxSupplierSpend = Math.max(...topSuppliers.map(s => s.Spend));

  // Spend by Commodity processing (top 5 for donut chart)
  const topCommodities = [...spendingByCommodity]
    .sort((a, b) => b.Spend - a.Spend)
    .slice(0, 5);
  const totalCommoditySpend = topCommodities.reduce((sum, c) => sum + c.Spend, 0);

  // Accumulate donut colors and angles
  let accumulatedPercent = 0;
  const donutSlices = topCommodities.map((c, i) => {
    const percent = (c.Spend / totalCommoditySpend) * 100;
    const start = accumulatedPercent;
    accumulatedPercent += percent;
    const colors = ["#8861F3", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
    return {
      name: c.name,
      spend: c.Spend,
      percent,
      color: colors[i % colors.length],
      gradient: `conic-gradient(from ${start * 3.6}deg, ${colors[i % colors.length]} 0% ${percent}%, transparent ${percent}% 100%)`
    };
  });

  // Spend by Location processing
  const maxLocationSpend = Math.max(...spendingByLocation.map(l => l.Spend));
  const locationColors = ["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500"];

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
      {/* Spending Trend by Month */}
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Spending Trend</CardTitle>
          <CardDescription>Monthly distribution of order spends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[280px]">
            <svg viewBox="0 0 650 280" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8861F3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8861F3" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map(val => (
                <line
                  key={val}
                  x1="50"
                  y1={50 + val * 50}
                  x2="600"
                  y2={50 + val * 50}
                  stroke="hsl(var(--muted))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Area path */}
              <path d={fillD} fill="url(#areaGradient)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="#8861F3"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredMonth === i ? "6" : "4"}
                    fill={hoveredMonth === i ? "#8861F3" : "var(--background)"}
                    stroke="#8861F3"
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredMonth(i)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  />
                  {/* Tooltip on Hover */}
                  {hoveredMonth === i && (
                    <foreignObject x={p.x - 50} y={p.y - 55} width="100" height="50">
                      <div className="bg-popover text-popover-foreground border shadow-md rounded p-1.5 text-center text-xs font-semibold">
                        <div className="text-[10px] text-muted-foreground">{p.name}</div>
                        <div>${p.Spend.toLocaleString()}</div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              ))}

              {/* X-axis labels */}
              {points.map((p, i) => (
                <text
                  key={i}
                  x={p.x}
                  y="265"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="11"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {p.name.substring(0, 3)}
                </text>
              ))}

              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4].map(val => {
                const labelSpend = maxMonthSpend - (val * maxMonthSpend) / 4;
                return (
                  <text
                    key={val}
                    x="40"
                    y={54 + val * 50}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="11"
                    textAnchor="end"
                    className="font-medium"
                  >
                    ${Math.round(labelSpend / 1000)}k
                  </text>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Spending by Supplier */}
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Top Suppliers</CardTitle>
          <CardDescription>Top 8 suppliers by purchase volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[280px]">
            <svg viewBox="0 0 550 280" className="w-full h-full overflow-visible">
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map(val => (
                <line
                  key={val}
                  x1="50"
                  y1={50 + val * 50}
                  x2="520"
                  y2={50 + val * 50}
                  stroke="hsl(var(--muted))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Bars */}
              {topSuppliers.map((s, i) => {
                const barWidth = 32;
                const gap = 24;
                const x = 70 + i * (barWidth + gap);
                const barHeight = (s.Spend / maxSupplierSpend) * 180;
                const y = 230 - barHeight;
                return (
                  <g key={i}>
                    {/* Background track (for styling) */}
                    <rect
                      x={x}
                      y="50"
                      width={barWidth}
                      height="180"
                      fill="hsl(var(--muted)/0.15)"
                      rx="4"
                    />
                    {/* Actual Bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={hoveredSupplier === i ? "#9d7bf5" : "#8861F3"}
                      rx="4"
                      className="cursor-pointer transition-colors duration-150"
                      onMouseEnter={() => setHoveredSupplier(i)}
                      onMouseLeave={() => setHoveredSupplier(null)}
                    />
                    {/* Hover Values */}
                    {hoveredSupplier === i && (
                      <foreignObject x={x - 34} y={y - 50} width="100" height="45">
                        <div className="bg-popover text-popover-foreground border shadow-md rounded p-1 text-center text-xs font-semibold">
                          ${s.Spend.toLocaleString()}
                        </div>
                      </foreignObject>
                    )}
                    {/* X-axis Label */}
                    <text
                      x={x + barWidth / 2}
                      y="250"
                      fill="hsl(var(--muted-foreground))"
                      fontSize="10"
                      textAnchor="middle"
                      className="font-medium"
                    >
                      {s.name.replace("Supplier ", "S")}
                    </text>
                  </g>
                );
              })}

              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4].map(val => {
                const labelSpend = maxSupplierSpend - (val * maxSupplierSpend) / 4;
                return (
                  <text
                    key={val}
                    x="40"
                    y={54 + val * 50}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="11"
                    textAnchor="end"
                    className="font-medium"
                  >
                    ${Math.round(labelSpend / 1000)}k
                  </text>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Spending by Commodity */}
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Spending by Commodity</CardTitle>
          <CardDescription>Highest volume sourcing categories</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-around gap-6 h-[280px]">
          {/* Donut container */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            {/* Multiple layers of conic-gradients overlaid */}
            <div className="absolute w-full h-full rounded-full bg-muted/20" />
            {donutSlices.map((slice, i) => (
              <div
                key={i}
                className="absolute w-full h-full rounded-full transition-transform hover:scale-105 duration-200"
                style={{
                  background: slice.gradient,
                  clipPath: "circle(50%)",
                  zIndex: 10 + i
                }}
              />
            ))}
            {/* Hole in the donut */}
            <div className="absolute w-[120px] h-[120px] bg-card rounded-full flex flex-col items-center justify-center shadow-sm z-30">
              <span className="text-xl font-bold text-foreground">${totalCommoditySpend.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Top 5 categories</span>
            </div>
          </div>

          {/* Legends */}
          <div className="flex flex-col gap-2.5 w-full max-w-[220px]">
            {donutSlices.map((slice, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                  <span className="font-medium text-muted-foreground truncate max-w-[120px]">{slice.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-foreground mr-1">${slice.spend.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">({Math.round(slice.percent)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending by Location */}
      <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Spending by Location</CardTitle>
          <CardDescription>Sourcing expenditure across regional centers</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center h-[280px]">
          {spendingByLocation.map((loc, i) => {
            const percentage = (loc.Spend / maxLocationSpend) * 100;
            return (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">{loc.name} <span className="text-xs text-muted-foreground font-normal">({loc.vendorName})</span></span>
                  <span className="font-bold text-foreground">${loc.Spend.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${locationColors[i % locationColors.length]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
