import { useState, useMemo } from "react";
import { differenceInDays } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorMeasurementsChart } from "@/components/SensorMeasurementChart";
import { StatCard } from "../components/StatCard";
import { DateRangePicker } from "../components/DateRangePicker";
import { SensorTable } from "../components/SensorTable";
import { useFilteredData} from "../hooks/useFilteredData";
import { useGroupedData } from "../hooks/useGroupedData";
import { useSortedSensors } from "../hooks/useSortedSensors";
import { sensorData, sensors, SortConfig } from "../services/data";
import { DateRange } from "react-day-picker";

const DEFAULT_DATE_RANGE: DateRange = {
  from: new Date(2024, 0, 1),
  to: new Date(2024, 11, 31),
};

export default function SensorStatusPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(DEFAULT_DATE_RANGE);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range.to) {
      setDateRange(range);
    } else {
      setDateRange(DEFAULT_DATE_RANGE);
    }
  };

  const filteredData = useFilteredData(sensorData, dateRange);
  const groupedData = useGroupedData(filteredData, dateRange);
  const { sortedSensors, requestSort } = useSortedSensors(sensors, sortConfig, setSortConfig);

  const totalMeasurements = groupedData.reduce((sum, entry) => sum + entry.totalMeasurements, 0);
  const averageMeasurementsPerDay = totalMeasurements / (filteredData.length || 1);

  const isShortDateRange = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from) <= 90; // 3 months
    }
    return false;
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 space-y-6">
      <Card className="bg-card border-transparent focus:border-transparent focus:ring-0 shadow-mac">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Sensor Measurements</CardTitle>
            <CardDescription className="text-muted-foreground">
              Overview of all sensor measurements
            </CardDescription>
          </div>
          <DateRangePicker dateRange={dateRange} setDateRange={handleDateRangeChange} />
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/4 overflow-x-auto">
              <SensorMeasurementsChart data={groupedData} isShortDateRange={isShortDateRange} />
            </div>
            <div className="w-full lg:w-1/4">
              <StatCard
                totalMeasurements={totalMeasurements}
                averageMeasurementsPerDay={averageMeasurementsPerDay}
                dateRange={dateRange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-transparent focus:border-transparent focus:ring-0 shadow-mac">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sensor Status</CardTitle>
          <CardDescription className="text-muted-foreground">
            Current status and uptime of all sensors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          <SensorTable sensors={sortedSensors} requestSort={requestSort} />
        </CardContent>
      </Card>
    </div>
  );
}
