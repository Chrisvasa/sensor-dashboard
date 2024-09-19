"use client"
import { useParams } from 'react-router-dom';
import { mockSensors } from '../mockData/mockSensors';
import { TrendingUp } from 'lucide-react';
import {CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis} from "recharts";

import{
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import{
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { mock } from 'node:test';

export const description = "A line chart with a label"

const chartConfig = {
    temperature: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
    },
    mobile:{
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
interface Sensor {
  id: number;
  name: string;
  temperature: number;
  date: string;
  location: string;
}

const SensorDetail: React.FC = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const sensor = mockSensors.find((s: Sensor) => s.id === Number(sensorId)) || mockSensors[0];

  return (
    <div className="p-4 rgb(13, 13, 13) text-white">
      <h2 className="text-2xl font-bold mb-4">{sensor.name}</h2>
      <Card>
        <CardHeader>
            <CardTitle>{sensor.name}</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
                <LineChart
                    accessibilityLayer
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
                        
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                                />
                            <Line
                                dataKey="temperature"
                                type="natural"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={{
                                    fill:"var(--color-desktop)",
                                }}
                                activeDot={{
                                    r:6,
                                }}
                                >
                                <LabelList
                                position="top"
                                offset={12}
                                fill="#FFFFFF"
                                //className="fill-foreground"
                                fontSize={12}
                                />
                                </Line>
                    </LineChart>
            </ChartContainer>
        </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
       <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
       </div>
       <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
       </div>
      </CardFooter>
      </Card>
      
      {/* {<p>Temperature: {sensor.temperature}°C</p>
      <p>Date: {sensor.date}</p>
      <p>Location: {sensor.location}</p>} */}
    </div>
  );
};

export default SensorDetail;
