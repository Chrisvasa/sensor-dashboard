import { SensorCard } from "../components/SensorCard";
import { useEffect } from "react";
import { mockSensors } from "../mockData/mockSensors";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SensorDetail } from "./SensorDetail";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  // const navigate = useNavigate();
  const { sensorId } = useParams<{ sensorId: string }>();

  // useEffect(() => {
  //   if (!sensorId) {
  //     navigate(`sensor/${mockSensors[0].id}`, { replace: true });
  //   }
  // }, [sensorId, navigate]);

  const selectedSensor = mockSensors.find((sensor) => sensor.id === Number(sensorId)) || mockSensors[0];

  return (
    <div className="flex min-h-screen w-full flex-col text-slate-50 ">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-transparent focus:border-transparent focus:ring-0 bg-background px-4 md:px-6">
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ">
        <Card className="border-transparent focus:border-transparent focus:ring-0" x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 w-auto">
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

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <Card className="col-span-2 xl:col-span-1">
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
          <Card className="col-span-2 xl:col-span-1">
            <SensorDetail sensor={selectedSensor}/>
          </Card>
        </div>
      </main>
    </div>
  );
}
