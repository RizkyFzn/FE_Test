import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const DoughnutChart = () => {
  const doughnutChartRef = useRef(null);
  const { data } = useSelector((state) => state.lalins);

  useEffect(() => {
    const shiftCounts = { 1: 0, 2: 0, 3: 0 };
    
    if (data.rows && data.rows.rows) {
      data.rows.rows.forEach(item => {
        if (item.Shift) {
          shiftCounts[item.Shift]++;
        }
      });

      
      const total = data.rows.rows.length;
      const shiftPercentages = [
        (shiftCounts[1] / total) * 100 || 0,
        (shiftCounts[2] / total) * 100 || 0,
        (shiftCounts[3] / total) * 100 || 0,
      ];

      const doughnutData = {
        labels: ['Shift 1', 'Shift 2', 'Shift 3'],
        datasets: [
          {
            label: 'Persentase Shift',
            data: shiftPercentages,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
          },
        ],
      };

      const doughnutChartConfig = {
        type: 'doughnut',
        data: doughnutData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      };
      const doughnutChart = new Chart(doughnutChartRef.current, doughnutChartConfig);

      return () => {
        doughnutChart.destroy();
      };
    }
  }, [data]);

  return (
    <div className='max-h-72 flex justify-center'>
      <canvas ref={doughnutChartRef} />
    </div>
  );
};

export default DoughnutChart;
