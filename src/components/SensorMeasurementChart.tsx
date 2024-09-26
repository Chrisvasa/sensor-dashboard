import { useState, useEffect } from 'react'
import { format, parse } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type GroupedDataEntry = {
  date: string;
  totalMeasurements: number;
};

type SensorMeasurementsChartProps = {
  data: GroupedDataEntry[];
  isShortDateRange: boolean;
};

export function SensorMeasurementsChart({ data, isShortDateRange }: SensorMeasurementsChartProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const formatXAxis = (dateString: string) => {
    const date = parse(dateString, isShortDateRange ? "yyyy-MM-dd" : "yyyy-MM", new Date());
    return isShortDateRange ? format(date, "MMM d") : format(date, "MMM yyyy");
  };
  

  const formatYAxis = (value: number) => {
    if (isMobile) {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    }
    return value.toLocaleString()
  }

  const chartConfig = {
    measurements: {
      label: "Total Measurements",
      color: "rgb(18, 18, 18)",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: isMobile ? 5 : 30,
            left: isMobile ? -15 : 20,
            bottom: isMobile ? 20 : 60,
          }}
        >
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={formatXAxis}
            interval={isMobile ? 'preserveStartEnd' : (isShortDateRange ? 0 : 'preserveStartEnd')}
            angle={-45}
            textAnchor="end"
            height={isMobile ? 60 : 70}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={isMobile ? 0 : 10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            width={isMobile ? 40 : 50}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={formatYAxis}
            tickCount={5}
          />
          <ChartTooltip 
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} 
            content={<ChartTooltipContent />} 
          />
          <Bar
            dataKey="totalMeasurements"
            fill="#5C6BC0"
            radius={[4, 4, 0, 0]}
            maxBarSize={isMobile ? 15 : (isShortDateRange ? 20 : 50)}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}