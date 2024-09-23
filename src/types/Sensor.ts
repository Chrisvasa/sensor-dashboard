import { Measurement } from "./Measurement";

export type Sensor = {
    id: number;
    name: string;
    status: boolean;
    measurements: Measurement[];
  };