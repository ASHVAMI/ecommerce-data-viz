import React, { useEffect, useState } from 'react';
import { fetchSalesGrowth } from '../api/api'; 
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; 

const SalesGrowth = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSalesGrowth(); 
        const labels = data.map(item => item.date); 
        const values = data.map(item => item.growthRate); 

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Sales Growth Rate',
              data: values,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="sales-growth">
      <h2>Sales Growth Rate Over Time</h2>
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Growth Rate (%)'
            }
          }
        }
      }} />
    </div>
  );
};

export default SalesGrowth;
