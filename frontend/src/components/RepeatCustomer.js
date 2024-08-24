import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchRepeatCustomers } from '../api/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RepeatCustomers = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Repeat Customers',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchRepeatCustomers();
        const data = response.data; 

        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Number of Repeat Customers',
              data: data.values,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching repeat customer data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Number of Repeat Customers</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time Period',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Repeat Customers',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RepeatCustomers;
