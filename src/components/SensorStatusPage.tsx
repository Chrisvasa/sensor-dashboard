import { useState, useMemo } from "react"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { CalendarIcon, ArrowUpDown } from "lucide-react"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Mock data - replace this with your actual sensor data
const sensorData = [
  { date: "2023-01-01", totalMeasurements: 150 },
  { date: "2023-02-01", totalMeasurements: 200 },
  { date: "2023-03-01", totalMeasurements: 180 },
  { date: "2023-04-01", totalMeasurements: 220 },
  { date: "2023-05-01", totalMeasurements: 250 },
  { date: "2023-06-01", totalMeasurements: 300 },
  { date: "2023-07-01", totalMeasurements: 280 },
  { date: "2023-08-01", totalMeasurements: 320 },
  { date: "2023-09-01", totalMeasurements: 350 },
  { date: "2023-10-01", totalMeasurements: 400 },
  { date: "2023-11-01", totalMeasurements: 380 },
  { date: "2023-12-01", totalMeasurements: 420 },
]

const sensors = [
  { name: "Living Room", uptime: 99.9, status: "Online", lastMeasurement: 22.5 },
  { name: "Kitchen", uptime: 98.7, status: "Online", lastMeasurement: 23.1 },
  { name: "Bedroom", uptime: 100, status: "Online", lastMeasurement: 21.8 },
  { name: "Bathroom", uptime: 97.5, status: "Offline", lastMeasurement: null },
  { name: "Garage", uptime: 99.2, status: "Online", lastMeasurement: 19.7 },
  { name: "Office", uptime: 99.5, status: "Online", lastMeasurement: 21.2 },
  { name: "Basement", uptime: 98.1, status: "Online", lastMeasurement: 18.9 },
  { name: "Attic", uptime: 96.8, status: "Online", lastMeasurement: 24.3 },
  { name: "Garden", uptime: 95.5, status: "Online", lastMeasurement: 17.8 },
  { name: "Porch", uptime: 97.9, status: "Online", lastMeasurement: 20.1 },
]

const chartConfig = {
  measurements: {
    label: "Total Measurements",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

type SortConfig = {
  key: keyof typeof sensors[0]
  direction: 'asc' | 'desc'
}

export function SensorStatusPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  })
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' })

  const filteredData = sensorData.filter(
    (entry) =>
      dateRange?.from && dateRange?.to &&
      new Date(entry.date) >= dateRange.from &&
      new Date(entry.date) <= dateRange.to
  )

  const totalMeasurements = filteredData.reduce((sum, entry) => sum + entry.totalMeasurements, 0)

  const sortedSensors = useMemo(() => {
    let sortableSensors = [...sensors]
    if (sortConfig !== null) {
      sortableSensors.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableSensors
  }, [sensors, sortConfig])

  const requestSort = (key: keyof typeof sensors[0]) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="min-h-screen bg-rgb(13, 13, 13) text-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sensor Status Dashboard</h1>
      <div className="space-y-8">
        <Card className="bg-zinc-950 border-transparent focus:border-transparent focus:ring-0 shadow-mac">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Sensor Measurements Overview</CardTitle>
              <CardDescription>
                Visualizing total measurements from all sensors over time
              </CardDescription>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-950" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="bg-zinc-950 text-slate-100"
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-3/4">
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}>
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => format(new Date(value), "MMM yyyy")}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={70}/>
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip
                        cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                        content={<ChartTooltipContent />}/>
                      <Bar
                        dataKey="totalMeasurements"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}/>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="w-full lg:w-1/4 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Statistics</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Measurements:</p>
                    <p className="text-2xl font-bold text-primary">{totalMeasurements}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-transparent focus:border-transparent focus:ring-0 shadow-mac">
          <CardHeader>
            <CardTitle className="text-2xl">Sensor Status / Uptime</CardTitle>
            <CardDescription>Current status and uptime of all sensors</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-zinc-950 sticky top-0">
                    <TableHead className="w-[200px]">
                      <Button
                        variant="ghost"
                        onClick={() => requestSort('name')}
                        className="hover:text-primary"
                      >
                        Sensor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => requestSort('uptime')}
                        className="hover:text-primary"
                      >
                        Uptime
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => requestSort('status')}
                        className="hover:text-primary"
                      >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => requestSort('lastMeasurement')}
                        className="hover:text-primary"
                      >
                        Last Measurement
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSensors.map((sensor) => (
                    <TableRow key={sensor.name}>
                      <TableCell className="font-medium">{sensor.name}</TableCell>
                      <TableCell>{sensor.uptime.toFixed(1)}%</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          sensor.status === 'Online' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
                        }`}>
                          {sensor.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {sensor.lastMeasurement !== null ? `${sensor.lastMeasurement.toFixed(1)}°C` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}