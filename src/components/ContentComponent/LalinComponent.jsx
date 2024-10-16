import React, { useEffect } from 'react'
import LalinTableComponent from '../Table/DataLalinHarian'
import { useDispatch } from 'react-redux';
import { fetchLalinsData } from '../../store/lalin';

const LalinComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLalinsData());
        
    }, [dispatch]);
  return (
    <div>
        <LalinTableComponent/>
    </div>
  )
}

export default LalinComponent