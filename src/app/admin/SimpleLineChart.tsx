import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<'line'> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Users',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Orders',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options: ChartOptions<'line'> = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const SimpleLineChart: React.FC = () => (
  <div className="w-full p-4">
    <h2 className="text-xl font-bold mb-4">User and Order Statistics</h2>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div style={{ width: '100%', height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  </div>
);

export default SimpleLineChart;
