import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSensors } from "../mockData/mockSensors";


// Create chartData by transforming mockSensors to suit the chart
const chartData = mockSensors.map((sensor) => ({
    key: sensor.id, // Use unique identifier
    name: sensor.name,
    temperature: sensor.temperature,
    date: sensor.date,
    location: sensor.location,
}));

// Assuming mockSensors have an array of historical data points for each sensor
// If mockSensors only have a current value, you need to adjust the structure
const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))"
  }
};

export function StatChart() {
  return (
    <Card className="border-transparent focus:border-transparent focus:ring-0">
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>
          Showing sensor temperatures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData} // Ensure chartData has the appropriate structure
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name" // Use the sensor name for the X-axis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                // Ensure the value is a string before slicing
                if (typeof value === 'string') {
                  return value.slice(0, 3); // Optionally truncate name
                }
                return value;
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            {/* Render an <Area> for each sensor */}
            {mockSensors.map((sensor) => (
              <Area
                key={sensor.id} // Ensure each area has a unique key
                dataKey="temperature"
                type="linear"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
