import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BarChart from '../Chart/Bar';
import DoughnutChart from '../Chart/Doughnut';
import { fetchLalinsData } from '../../store/lalin';
import BarGerbang from '../Chart/BarGerbang';
import DoughnutCabang from '../Chart/DoughnutCabang';

const DashboardComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLalinsData());
    
  }, [dispatch]);

  return (
    <div className='p-3 bg-slate-200 h-full'>
      <div className='flex flex-col'>
        <div className='text-lg font-semibold'>Dashboard</div>
        <div className='px-44 flex gap-3'>
          <input type="date" className='px-2 py-1 rounded-sm' />
          <button className='bg-blue-700 px-3 py-1 rounded-md text-white'>Filter</button>
        </div>
      </div>

      <div className="flex-col justify-center my-8 items-center gap-11">
        <div className='flex flex-row justify-evenly items-center gap-4 w-full'>
          <div className='w-1/2'>
            <BarChart/>
          </div>
          <div className='w-1/2'>
            <DoughnutChart/>
          </div>
        </div>
        <div className='flex flex-row justify-evenly items-center gap-4 w-full'>
          <div className='w-1/2'>
            <BarGerbang/>
          </div>
          <div className='w-1/2'>
            <DoughnutCabang />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
