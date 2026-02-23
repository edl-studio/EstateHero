import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export interface OccupancyChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The occupancy percentage (0-100) */
  occupancyRate: number;
  /** The value to display in the center */
  centerValue: string | number;
  /** The unit for the center value (e.g., "m²", "units") */
  centerUnit?: string;
  /** The label above the center value */
  centerLabel?: string;
  /** The text to display below the chart */
  badgeText?: string;
  /** Custom className */
  className?: string;
}

export const OccupancyChart = React.forwardRef<HTMLDivElement, OccupancyChartProps>(
  (
    {
      occupancyRate,
      centerValue,
      centerUnit,
      centerLabel = "Ground area",
      badgeText,
      className,
      ...props
    },
    ref
  ) => {
    // Clamp occupancy rate between 0 and 100
    const clampedRate = Math.max(0, Math.min(100, occupancyRate));
    
    // Data for the half donut chart
    const data = [
      { name: "occupied", value: clampedRate },
      { name: "vacant", value: 100 - clampedRate },
    ];

    // Get colors from CSS variables
    const getColor = (varName: string) => {
      if (typeof window !== 'undefined') {
        return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      }
      return varName; // Fallback for SSR
    };

    const COLORS = {
      occupied: getColor('--color-orange-500') || "#F97316",
      vacant: getColor('--color-neutral') || "#F3F4F6",
    };

    // Extract numeric value and superscript from centerUnit
    const renderCenterUnit = () => {
      if (!centerUnit) return null;
      
      // Check if unit contains superscript (e.g., "m²")
      if (centerUnit.includes("²")) {
        const parts = centerUnit.split("²");
        return (
          <span className="font-[family-name:var(--font-font-sans)] font-normal leading-[0] text-[0px]">
            <span className="leading-[31px] text-[18px]">{parts[0]}</span>
            <span className="leading-[31px] text-[11.61px]">2</span>
          </span>
        );
      }
      
      return (
        <span className="font-[family-name:var(--font-font-sans)] font-normal leading-[31px] text-[18px]">
          {centerUnit}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3 items-center w-full", className)}
        {...props}
      >
        {/* Progress circle container - fixed height for alignment */}
        <div className="flex flex-col items-center relative h-[150px] w-full">
          {/* Pie chart - 300px × 150px, centered naturally by flex */}
          <div className="relative w-[300px] h-[150px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={123}
                  outerRadius={150}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === "occupied" ? COLORS.occupied : COLORS.vacant}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center content - positioned at bottom center of container */}
          <div className="absolute bottom-0 left-[calc(50%+0.5px)] -translate-x-1/2 flex flex-col items-center">
            {centerLabel && (
              <div className="flex flex-col font-[family-name:var(--font-font-sans)] justify-center leading-[0] min-w-full not-italic text-[color:var(--tailwind-colors-gray-500,#6b7280)] text-[length:var(--text-sm-font-size,14px)] text-center w-[min-content]">
                <p className="leading-[1.2] whitespace-pre-wrap">{centerLabel}</p>
              </div>
            )}
            <div className="flex items-center">
              <div className="flex gap-[2px] items-end not-italic text-[color:var(--tailwind-colors-gray-950,#030712)]">
                <p className="font-[family-name:var(--font-font-mono)] font-semibold leading-[44px] text-[length:var(--text-4xl-font-size,36px)]">
                  {centerValue}
                </p>
                {renderCenterUnit()}
              </div>
            </div>
          </div>
        </div>

        {/* Badge with occupancy rate */}
        {badgeText && (
          <div className="flex gap-1.5 items-center justify-center pl-1 pr-2 rounded-2xl">
            <div className="relative w-2 h-2">
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: COLORS.occupied }}
              />
            </div>
            <p className="font-[family-name:var(--font-font-sans)] leading-[1.2] not-italic text-[color:var(--tailwind-colors-gray-950,#030712)] text-[length:var(--text-sm-font-size,14px)] text-right">
              {badgeText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

OccupancyChart.displayName = "OccupancyChart";
