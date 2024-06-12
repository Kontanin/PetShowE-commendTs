import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<'bar'> = {
  labels: ['Packaging', 'Sending', 'Done'],
  datasets: [
    {
      label: 'Order Status',
      data: [10, 5, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'bar'> = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const OrderStatusChart: React.FC = () => (
  <div className="w-full p-4">
    <h2 className="text-xl font-bold mb-4">Order Status Overview</h2>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div style={{ width: '100%', height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  </div>
);

export default OrderStatusChart;
