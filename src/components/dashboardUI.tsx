import { SensorCard } from "../components/SensorCard";
import { useEffect } from "react";
import { mockSensors } from "../mockData/mockSensors";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Dashboard() {
  const navigate = useNavigate();
  const { sensorId } = useParams<{ sensorId: string }>();

  useEffect(() => {
    if (!sensorId) {
      navigate(`sensor/${mockSensors[0].id}`, { replace: true });
    }
  }, [sensorId, navigate]);

  const selectedSensor = mockSensors.find((sensor) => sensor.id === Number(sensorId)) || mockSensors[0];

  return (
    <div className="flex min-h-screen w-full flex-col text-slate-50">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ">
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium w-full">
              <div className="flex flex-row justify-between w-full">
                {mockSensors.map((sensor) => (
                  <Link key={sensor.id} to={`sensor/${sensor.id}`}>
                    <SensorCard sensor={sensor} selected={sensor.id === Number(sensorId)} />
                  </Link>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Temperatures</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSensor &&
                    selectedSensor.chartData.map((data, index) => (
                      <TableRow key={`${selectedSensor.id}-${index}`}>
                        <TableCell>{data.month}</TableCell>
                        <TableCell>{data.temperature}°C</TableCell>
                        <TableCell>{new Date(selectedSensor.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{selectedSensor.location}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* SensorDetail Component */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
