import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const BarGerbang = () => {
  const barChartRef = useRef(null);
  const { data } = useSelector((state) => state.lalins);

  useEffect(() => {
    
    if (!data || data.length === 0) return;

    const barData = {
      labels: ['Gerbang 1', 'Gerbang 2', 'Gerbang 3', 'Gerbang 4', 'Gerbang 5'],
      datasets: [
        {
          label: 'Jumlah Lalin',
          data: [
            data.rows.rows.filter(item => item.IdGerbang == 1).reduce((acc, item) => acc + item.eBca + item.eBri + item.eBni + item.eDKI + item.eMandiri + item.eMega + item.eFlo, 0),
            data.rows.rows.filter(item => item.IdGerbang == 2).reduce((acc, item) => acc + item.eBca + item.eBri + item.eBni + item.eDKI + item.eMandiri + item.eMega + item.eFlo, 0),
            data.rows.rows.filter(item => item.IdGerbang == 3).reduce((acc, item) => acc + item.eBca + item.eBri + item.eBni + item.eDKI + item.eMandiri + item.eMega + item.eFlo, 0),
            data.rows.rows.filter(item => item.IdGerbang == 4).reduce((acc, item) => acc + item.eBca + item.eBri + item.eBni + item.eDKI + item.eMandiri + item.eMega + item.eFlo, 0),
            data.rows.rows.filter(item => item.IdGerbang == 5).reduce((acc, item) => acc + item.eBca + item.eBri + item.eBni + item.eDKI + item.eMandiri + item.eMega + item.eFlo, 0),
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

export default BarGerbang;
