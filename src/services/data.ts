import { Sensor } from "../types/Sensor";

export const testData: Sensor[] = [
    {
      "id": 1,
      "name": "test",
      "status": false,
      "measurements": [
        {
          "id": 1,
          "temp": 23.0,
          "measurementTime": "2024-09-23T14:27:08.002901"
        },
        {
          "id": 2,
          "temp": 17.0,
          "measurementTime": "2024-09-22T14:27:18.059"
        }
      ]
    },
    {
      "id": 2,
      "name": "bob",
      "status": false,
      "measurements": [
        {
          "id": 3,
          "temp": 6.0,
          "measurementTime": "2024-01-23T14:28:44.859"
        }
      ]
    },
    {
      "id": 3,
      "name": "bleb",
      "status": false,
      "measurements": []
    }
  ]

  export type SortConfig = {
    key: keyof Sensor;
    direction: "asc" | "desc";
  };
  