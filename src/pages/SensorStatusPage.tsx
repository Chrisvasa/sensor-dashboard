import { useState, useMemo, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { SensorMeasurementsChart } from "../components/SensorMeasurementChart";
import { StatCard } from "../components/StatCard";
import { DateRangePicker } from "../components/DateRangePicker";
import { SensorTable } from "../components/SensorTable";
import { useFilteredData } from "../hooks/useFilteredData";
import { useGroupedData } from "../hooks/useGroupedData";
import { useSortedSensors } from "../hooks/useSortedSensors";
import { SortConfig } from "../services/data";
import { Sensor } from "../types/Sensor";
import { fetchAllSensors } from "../services/api";

const DEFAULT_DATE_RANGE: DateRange = {
  from: new Date(2024, 0, 1),
  to: new Date(2024, 11, 31),
};

export default function SensorStatusPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(DEFAULT_DATE_RANGE);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    } else {
      setDateRange(DEFAULT_DATE_RANGE);
    }
  };
  

  const FETCH_INTERVAL = 30000;

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount
  
    const fetchSensors = async () => {
      try {
        const response = await fetchAllSensors();
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Sensor[] = response.data; // Correctly accessing data
        if (isMounted) {
          setSensors(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Error fetching data");
          setLoading(false);
        }
      }
    };
  

    // Initial fetch
    fetchSensors();

    // Set up polling
    const intervalId = setInterval(fetchSensors, FETCH_INTERVAL);

    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const filteredMeasurements = useFilteredData(sensors, dateRange);
  const groupedData = useGroupedData(filteredMeasurements, dateRange);
  const { sortedSensors, requestSort } = useSortedSensors(sensors, sortConfig, setSortConfig);

  const totalMeasurements = filteredMeasurements.length;

  const dateRangeLength =
    dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 1;

  const averageMeasurementsPerDay = totalMeasurements / dateRangeLength;

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
