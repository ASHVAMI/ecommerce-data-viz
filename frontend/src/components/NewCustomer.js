import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchNewCustomers } from '../api/api';  

const NewCustomers = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchNewCustomers();
        const { labels, values } = response;

        setChartData({
          labels: labels, 
          datasets: [
            {
              label: 'New Customers Added',
              data: values, 
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>New Customers Added Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default NewCustomers;
