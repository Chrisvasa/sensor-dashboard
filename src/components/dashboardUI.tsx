import { useState, useEffect } from "react";
import { SensorCard } from "../components/SensorCard";
import { Button } from "@/components/ui/button";
import { fetchAllSensors } from "../services/api";
import { Sensor } from "@/types/Sensor";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  //FOR REACT QUERY
  // const { data: sensorData = [], isLoading, error } = useQuery({
  //   queryKey: ['sensors'],
  //   queryFn: fetchAllSensors,
  //   onSuccess:(data) => {
  //     const sensors = data.data;
  //     if(sensors.length > 0){
  //       setSelectedSensorId(sensors[0].id);
  //     }
  //   },
  // });

  const selectedSensor = sensorData.find(sensor => sensor.id === selectedSensorId);

  //FOR REACT QUERY
  //if(isLoading) return <div>Loading...</div>
  //if(error) return <div>Error loading sensors</div>

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="border-transparent focus:border-transparent focus:ring-0 shadow-mac bg-dark-200">
          <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-main font-medium w-full">
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
          <Card className="col-span-2 xl:col-span-1 bg-dark-200 border-transparent focus:border-transparent focus:ring-0 shadow-mac">
            <CardHeader className="flex flex-row items-center text-main">
              <div className="grid gap-2">
                <CardTitle>Recent Temperatures</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                {/* Button content */}
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Measurement Date</TableHead>
                      <TableHead>Measurement Time</TableHead>
                      <TableHead>Temperature (°C)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-title">
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
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 xl:col-span-1 bg-dark-200 border-transparent focus:border-transparent focus:ring-0 shadow-mac">
            {selectedSensor && <SensorDetail sensor={selectedSensor} />}
          </Card>
        </div>
      </main>
    </div>
  );
}
