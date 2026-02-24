import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import styles from "./donut-chart.module.css";

export interface DonutChartDataItem {
  name: string;
  value: number;
  color: string;
  label: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of data items for the chart */
  data: DonutChartDataItem[];
  /** The value to display in the center */
  centerValue: string | number;
  /** The unit for the center value (e.g., "m²", "units") */
  centerUnit?: string;
  /** The label above the center value */
  centerLabel?: string;
  /** Override typography class for the center value (default: ui-mono-semibold-24) */
  centerValueClassName?: string;
  /** Override typography class for the center label (default: ui-sans-regular-14) */
  centerLabelClassName?: string;
  /** Hide the legend below the chart */
  hideLegend?: boolean;
  /** Custom className */
  className?: string;
}

export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      centerValue,
      centerUnit,
      centerLabel,
      centerValueClassName = "ui-mono-semibold-24",
      centerLabelClassName = "ui-sans-regular-14",
      hideLegend = false,
      className,
      ...props
    },
    ref
  ) => {
    // Extract numeric value and superscript from centerUnit
    const renderCenterUnit = () => {
      if (!centerUnit) return null;

      // Check if unit contains superscript (e.g., "m²")
      if (centerUnit.includes("²")) {
        const parts = centerUnit.split("²");
        return (
          <span className={styles.centerUnit}>
            <span className={cn(styles.centerUnitText, "ui-sans-regular-12")}>
              {parts[0]}
            </span>
            <span className={styles.centerUnitSuperscript}>2</span>
          </span>
        );
      }

      return (
        <span className={cn(styles.centerUnitText, "ui-sans-regular-12")}>
          {centerUnit}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(styles.container, className)}
        {...props}
      >
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={75}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                cornerRadius={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <div className={styles.centerContent}>
            {centerLabel && (
              <div className={styles.centerLabel}>
                <p className={cn(styles.centerLabelText, centerLabelClassName)}>
                  {centerLabel}
                </p>
              </div>
            )}
            <div className={styles.centerValueContainer}>
              <p className={cn(styles.centerValue, centerValueClassName)}>
                {centerValue}
              </p>
              {renderCenterUnit()}
            </div>
          </div>
        </div>

        {/* Legend items */}
        {!hideLegend && (
        <div className={styles.legendContainer}>
          {data.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <div className={styles.legendItemContent}>
                <div className={styles.legendDot}>
                  <div
                    className={styles.legendDotInner}
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <p className={cn(styles.legendLabel, "ui-sans-regular-14")}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    );
  }
);

DonutChart.displayName = "DonutChart";
