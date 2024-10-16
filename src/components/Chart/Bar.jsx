import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const BarChart = () => {
  const barChartRef = useRef(null);
  const { data } = useSelector((state) => state.lalins);

  useEffect(() => {

    if (!data || data.length === 0) return;

    const barData = {
      labels: ['BCA', 'BRI', 'BNI', 'DKI', 'Mandiri', 'Mega', 'Flo'],
      datasets: [
        {
          label: 'Jumlah Lalin',
          data: [
            data.rows.rows.reduce((acc, item) => acc + item.eBca, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eBri, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eBni, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eDKI, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eMandiri, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eMega, 0),
            data.rows.rows.reduce((acc, item) => acc + item.eFlo, 0)
          ],
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const barChartConfig = {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    };

    const barChart = new Chart(barChartRef.current, barChartConfig);
    return () => {
      barChart.destroy();
    };
  }, [data]);

  return (
    <div className='flex justify-center max-h-72'>
      <canvas ref={barChartRef} />
    </div>
  );
};

export default BarChart;
