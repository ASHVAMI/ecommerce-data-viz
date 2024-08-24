import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTotalSales = async () => {
  const response = await axios.get(`${API_URL}/orders/total-sales`);
  return response.data;
};


