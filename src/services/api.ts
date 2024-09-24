import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Update with your API URL
});

export const fetchAllMeasurements = () => api.get('/measurement/getall');
export const fetchAllSensors = () => api.get('/sensor/getall');
export const fetchPing = () => api.get('/getOnDemand');

// /sensor/getbyid/1 <- get by id
// /sensor/getbyname/vardagsrum <- get by name
// /sensor/getbyid/1/measurements/2024-09-18 <- get by date
// /sensor/getbyname/vardagsrum/measurements/2024-09-18/2024-09-19 <- get by range