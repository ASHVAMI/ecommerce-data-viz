import React, { useEffect, useState } from 'react';
import { fetchGeoDistribution } from '../api/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GeoDistribution = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadGeoDistribution = async () => {
      const geoData = await fetchGeoDistribution();
      
      const cityNames = geoData.map((item) => item._id); 
      const cityCounts = geoData.map((item) => item.count); 

      setChartData({
        labels: cityNames,
        datasets: [
          {
            label: '# of Customers',
            data: cityCounts,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      });
    };

    loadGeoDistribution();
  }, []);

  return (
    <div>
      <h2>Geographical Distribution of Customers</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default GeoDistribution;
