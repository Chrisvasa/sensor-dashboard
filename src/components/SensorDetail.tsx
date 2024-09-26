import React from 'react';
import { Sensor } from "@/types/Sensor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const SensorDetail: React.FC<{ sensor: Sensor }> = ({ sensor }) => {
  const measurements = sensor.measurements || []; // Default to an empty array if measurements is undefined

  return (
    <div className="p-4 text-main">
      <Card className="border-transparent focus:border-transparent focus:ring-0">
        <CardHeader>
          <CardTitle>{sensor.name}</CardTitle>
          <CardDescription className='text-title'>Recent Measurements</CardDescription>
        </CardHeader>
        <CardContent>
          {measurements.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <LineChart
                data={measurements}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <YAxis
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#5C6BC0' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°C`}
                  tick={{ style: { fill: '#f0f0f0' } }}
                />
                <XAxis
                  dataKey="measurementTime"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  tick={{ style: { fill: '#f0f0f0' } }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Line
                  dataKey="temp"
                  type="natural"
                  stroke="#3F51B5"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-desktop)' }}
                  activeDot={{ r: 6 }}
                >
                  <LabelList position="top" offset={12} fill="#f0f0f0" fontSize={12} />
                </Line>
              </LineChart>
            </ChartContainer>
          ) : (
            <div>No chart data available for this sensor</div>
          )}
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing temperature trends for the recent period
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default SensorDetail;
