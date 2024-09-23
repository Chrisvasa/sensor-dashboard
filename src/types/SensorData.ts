export interface SensorData {
    totalMeasurements: number;
    id: number;
    name: string;
    temperature: number;
    date: string;
    chartData: Array<{month: string, temperature: number}>;
  }
  