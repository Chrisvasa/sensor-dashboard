import { useMemo } from "react";
import { SensorData } from "@/types/SensorData";
import { DateRange } from "react-day-picker";

// Filters the sensor data based on the selected date range.
export function useFilteredData(sensorData: Array<SensorData>, dateRange: DateRange | undefined) {
  return useMemo(() => {
    return sensorData.filter(
      (entry) =>
        dateRange?.from &&
        dateRange?.to &&
        new Date(entry.date) >= dateRange.from &&
        new Date(entry.date) <= dateRange.to
    );
  }, [sensorData, dateRange]);
}