export const sensorData = [
    { date: "2024-01-01", totalMeasurements: 150 },
    { date: "2024-01-02", totalMeasurements: 155 },
    { date: "2024-01-03", totalMeasurements: 160 },
    { date: "2024-01-04", totalMeasurements: 165 },
    { date: "2024-01-05", totalMeasurements: 170 },
    { date: "2024-01-06", totalMeasurements: 175 },
    { date: "2024-01-07", totalMeasurements: 180 },
    { date: "2024-02-01", totalMeasurements: 200 },
    { date: "2024-03-01", totalMeasurements: 180 },
    { date: "2024-04-01", totalMeasurements: 220 },
    { date: "2024-05-01", totalMeasurements: 250 },
    { date: "2024-06-01", totalMeasurements: 300 },
    { date: "2024-07-01", totalMeasurements: 280 },
    { date: "2024-08-01", totalMeasurements: 320 },
    { date: "2024-09-01", totalMeasurements: 350 },
    { date: "2024-10-01", totalMeasurements: 400 },
    { date: "2024-11-01", totalMeasurements: 380 },
    { date: "2024-12-01", totalMeasurements: 420 },
  ];
  
  export const sensors = [
    { name: "Living Room", uptime: 99.9, status: "Online", lastMeasurement: 22.5 },
    { name: "Kitchen", uptime: 98.7, status: "Online", lastMeasurement: 23.1 },
    { name: "Bedroom", uptime: 100, status: "Online", lastMeasurement: 21.8 },
    { name: "Bathroom", uptime: 97.5, status: "Offline", lastMeasurement: null },
    { name: "Garage", uptime: 99.2, status: "Online", lastMeasurement: 19.7 },
    { name: "Office", uptime: 99.5, status: "Online", lastMeasurement: 21.2 },
    { name: "Basement", uptime: 98.1, status: "Online", lastMeasurement: 18.9 },
    { name: "Attic", uptime: 96.8, status: "Online", lastMeasurement: 24.3 },
    { name: "Garden", uptime: 95.5, status: "Online", lastMeasurement: 17.8 },
    { name: "Porch", uptime: 97.9, status: "Online", lastMeasurement: 20.1 },
  ];
  
  export type SensorData = typeof sensorData[number];
  export type Sensor = typeof sensors[number];
  export type SortConfig = {
    key: keyof Sensor;
    direction: "asc" | "desc";
  };
  