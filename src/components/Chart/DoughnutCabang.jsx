import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

const DoughnutCabang = () => {
  const doughnutChartRef = useRef(null);
  const { data } = useSelector((state) => state.lalins);

  useEffect(() => {
    const cabangCounts = {};
    
    if (data.rows && data.rows.rows) {
      data.rows.rows.forEach(item => {
        const idCabang = item.IdCabang;

        if (!cabangCounts[idCabang]) {
          cabangCounts[idCabang] = 0;
        }

        cabangCounts[idCabang] += item.eBca + item.eBri + item.eBni + item.eDKI + item.eFlo + item.eMandiri + item.eMega;
      });

      const sortedCabang = Object.entries(cabangCounts)
        .map(([idCabang, total]) => ({ idCabang, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

      const labels = sortedCabang.map(item => `Cabang ${item.idCabang}`);
      const dataValues = sortedCabang.map(item => item.total);

      const doughnutData = {
        labels: labels,
        datasets: [
          {
            label: 'Persentase berdasarkan IdCabang',
            data: dataValues,
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

export default DoughnutCabang;
