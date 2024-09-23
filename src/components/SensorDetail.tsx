import React from 'react';
import { mockSensors } from '../mockData/mockSensors';
import { SensorData } from "@/types/SensorData";
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const SensorDetail: React.FC<{ sensorId: string }> = ({ sensorId }) => {
  const sensor = mockSensors.find((s: SensorData) => s.id === Number(sensorId));

  if (!sensor) {
    return <p>Sensor not found. Please select a valid sensor.</p>;
  }

  return (
    <div className="p-4 text-white">
      <Card className="border-transparent focus:border-transparent focus:ring-0">
        <CardHeader>
          <CardTitle>{sensor.name}</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={sensor.chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#8884d8' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
                tick={{ style: { fill: '#FFFFFF' } }}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ style: { fill: '#FFFFFF' } }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Line
                dataKey="temperature"
                type="natural"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: 'var(--color-desktop)' }}
                activeDot={{ r: 6 }}
              >
                <LabelList position="top" offset={12} fill="#FFFFFF" fontSize={12} />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SensorDetail;
