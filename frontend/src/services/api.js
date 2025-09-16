import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base url
});

// Demand APIs
export const fetchDemand = () => API.get('/demand');
export const fetchDemandStats = () => API.get('/demand/stats');

// Supply APIs
export const fetchSupply = () => API.get('/supply');
export const fetchSupplyByFuel = (fuel) => API.get(`/supply/fuel/${fuel}`);
export const fetchSupplyStats = () => API.get('/supply/stats');

export default API;
