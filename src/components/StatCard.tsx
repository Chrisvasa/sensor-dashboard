import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

type StatCard = {
  totalMeasurements: number;
  averageMeasurementsPerDay: number;
  dateRange: DateRange | undefined;
};

export function StatCard({ totalMeasurements, averageMeasurementsPerDay, dateRange }: StatCard) {
  return (
    <Card className="bg-dark-300 border-none">
      <CardHeader>
        <CardTitle className="text-main">Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-main">Total Measurements:</p>
          <p className="text-2xl font-bold text-title">{totalMeasurements.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-main">Average Measurements/Day:</p>
          <p className="text-2xl font-bold text-title">{Math.round(averageMeasurementsPerDay).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-main">Date Range:</p>
          <p className="text-lg font-semibold">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
              : "All Time"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
