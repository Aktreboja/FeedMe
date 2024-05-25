import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options = {} }: { data: any; options?: any }) => {
  return <Doughnut data={data} options={options} />;
};

export default PieChart;
