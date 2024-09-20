import { useState, useEffect } from 'react'
import { format, parse } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type SensorMeasurementsChartProps = {
  data: Array<{ date: string; totalMeasurements: number }>;
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
    const date = parse(dateString, isShortDateRange ? "yyyy-MM-dd" : "yyyy-MM", new Date())
    if (isMobile) {
      return isShortDateRange ? format(date, "MMM d") : format(date, "MMM")
    }
    return isShortDateRange ? format(date, "MMM d") : format(date, "MMM yyyy")
  }

  const chartConfig = {
    measurements: {
      label: "Total Measurements",
      color: "hsl(var(--primary))",
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
            angle={isMobile ? -45 : -45}
            textAnchor="end"
            height={isMobile ? 60 : 70}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={isMobile ? 0 : 10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            width={isMobile ? 30 : 40}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <ChartTooltip 
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} 
            content={<ChartTooltipContent />} 
          />
          <Bar
            dataKey="totalMeasurements"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={isMobile ? 15 : (isShortDateRange ? 20 : 50)}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}