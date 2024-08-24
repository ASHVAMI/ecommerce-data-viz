import React, { useEffect, useState } from 'react';
import { fetchCLVByCohort } from '../api/api';
import { Bar } from 'react-chartjs-2';

const CLVByCohort = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const clvData = await fetchCLVByCohort();

      setChartData({
        labels: clvData.cohorts, 
        datasets: [
          {
            label: 'Customer Lifetime Value ($)',
            data: clvData.values,  
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'CLV ($)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Cohort',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CLVByCohort;
