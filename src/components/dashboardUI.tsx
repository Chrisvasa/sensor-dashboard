import { useState, useEffect } from "react";
import { SensorCard } from "../components/SensorCard";
import { Button } from "@/components/ui/button";
import { fetchAllSensors } from "../services/api";
import { Sensor } from "@/types/Sensor";
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
import SensorDetail from "./SensorDetail";

export default function Dashboard() {
  const [selectedSensorId, setSelectedSensorId] = useState<number | null>(null);
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  useEffect(() => {
    const loadSensors = async () => {
      try {
        const response = await fetchAllSensors();
        const sensors = response.data;
        console.log('Fetched Sensors', sensors);
        setSensorData(sensors);

        if (sensors.length > 0) {
          setSelectedSensorId(sensors[0].id);
        }
      } catch (err) {
        console.error("Failed to load sensor data", err);
      }
    };

    loadSensors();
  }, []);

  const selectedSensor = sensorData.find(sensor => sensor.id === selectedSensorId);

  return (
    <div className="flex min-h-screen w-full flex-col text-slate-50">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-transparent focus:border-transparent focus:ring-0 bg-background px-4 md:px-6">
        {/* Header content */}
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="border-transparent focus:border-transparent focus:ring-0">
          <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 w-auto">
                {sensorData.map(sensor => (
                  <div
                    key={sensor.id}
                    onClick={() => setSelectedSensorId(sensor.id)}
                  >
                    <SensorCard sensor={sensor} selected={sensor.id === selectedSensorId} />
                  </div>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Other content, if any */}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <Card className="col-span-2 xl:col-span-1">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Temperatures</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                {/* Button content */}
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Measurement Date</TableHead>
                    <TableHead>Measurement Time</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSensor && selectedSensor.measurements.length > 0 ? (
                    selectedSensor.measurements.map((measurement, index) => (
                      <TableRow key={measurement.id}>
                        <TableCell>{new Date(measurement.measurementTime).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(measurement.measurementTime).toLocaleTimeString()}</TableCell>
                        <TableCell>{measurement.temp}°C</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>No data available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="col-span-2 xl:col-span-1">
            {selectedSensor && <SensorDetail sensor={selectedSensor} />}
          </Card>
        </div>
      </main>
    </div>
  );
}
