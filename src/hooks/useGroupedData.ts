import { useMemo } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import { Measurement } from "@/types/Measurement";

type GroupedDataEntry = {
  date: string;
  totalMeasurements: number;
};

// Groups the filtered data by month or keeps it as is, depending on the date range.
export function useGroupedData(filteredMeasurements: Measurement[], dateRange: DateRange | undefined): GroupedDataEntry[] {
  return useMemo(() => {
    const isShortDateRange =
      dateRange?.from && dateRange?.to && differenceInDays(dateRange.to, dateRange.from) <= 90;

    const groupingFormat = isShortDateRange ? 'yyyy-MM-dd' : 'yyyy-MM';

    const grouped = filteredMeasurements.reduce((acc, curr) => {
      const dateKey = format(new Date(curr.measurementTime), groupingFormat);
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, totalMeasurements: 0 };
      }
      acc[dateKey].totalMeasurements += 1;
      return acc;
    }, {} as Record<string, GroupedDataEntry>);

    return Object.values(grouped);
  }, [filteredMeasurements, dateRange]);
}