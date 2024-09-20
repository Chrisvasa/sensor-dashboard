import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SensorsTableProps = {
  sensors: Array<Sensor>;
  requestSort: (key: keyof Sensor) => void;
};

export function SensorTable({ sensors, requestSort }: SensorsTableProps) {
  return (
    <ScrollArea className="h-[250px]">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 sticky top-0 ">
            <TableHead className="w-[200px]">
              <Button variant="ghost" onClick={() => requestSort("name")} className="hover:text-primary pl-0">
                Sensor
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort("uptime")} className="hover:text-primary pl-0">
                Uptime
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort("status")} className="hover:text-primary pl-0">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("lastMeasurement")}
                className="hover:text-primary pl-0"
              >
                <span className="hidden md:inline">Last Measurement</span>
                <span className="md:hidden">Last</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sensors.map((sensor) => (
            <TableRow key={sensor.name}>
              <TableCell className="font-medium">{sensor.name}</TableCell>
              <TableCell>{sensor.uptime.toFixed(1)}%</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    sensor.status === "Online" ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"
                  }`}
                >
                  {sensor.status}
                </span>
              </TableCell>
              <TableCell>
                {sensor.lastMeasurement !== null ? `${sensor.lastMeasurement.toFixed(1)}°C` : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
