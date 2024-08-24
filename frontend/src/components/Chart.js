import React, { useEffect, useState } from 'react';
import { fetchTotalSales } from '../api/api';
import { Line } from 'react-chartjs-2';

const Chart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const salesData = await fetchTotalSales();
      setData({
        labels: salesData.labels,
        datasets: [
          {
            label: 'Total Sales',
            data: salesData.values,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      });
    };
    loadData();
  }, []);

  return <Line data={data} />;
};

export default Chart;
