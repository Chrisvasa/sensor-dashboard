import { Sensor } from "../types/Sensor";
  export type SortConfig = {
    key: keyof Sensor;
    direction: "asc" | "desc";
  };
  