import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { Sensor } from "../types/Sensor";
import { Measurement } from "../types/Measurement";

// Filters the sensor data based on the selected date range.
export function useFilteredData(sensors: Sensor[], dateRange: DateRange | undefined): Measurement[] {
  return useMemo(() => {
    const allMeasurements = sensors.flatMap((sensor) => sensor.measurements);

    return allMeasurements.filter((measurement) => {
      if (!dateRange?.from || !dateRange.to) return true;
      const measurementDate = new Date(measurement.measurementTime);
      return measurementDate >= dateRange.from && measurementDate <= dateRange.to;
    });
  }, [sensors, dateRange]);
}