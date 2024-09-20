import { format, parse } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type SensorMeasurementsChartProps = {
  data: Array<{ date: string; totalMeasurements: number }>;
  isShortDateRange: boolean;
};

export function SensorMeasurementsChart({ data, isShortDateRange }: SensorMeasurementsChartProps) {
  const formatXAxis = (dateString: string) => {
    const date = parse(dateString, isShortDateRange ? "yyyy-MM-dd" : "yyyy-MM", new Date());
    return isShortDateRange ? format(date, "MMM d") : format(date, "MMM yyyy");
  };

  const chartConfig = {
    measurements: {
      label: "Total Measurements",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={formatXAxis}
            interval={isShortDateRange ? 0 : "preserveStartEnd"}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <ChartTooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} content={<ChartTooltipContent />} />
          <Bar
            dataKey="totalMeasurements"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={isShortDateRange ? 20 : 50}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
