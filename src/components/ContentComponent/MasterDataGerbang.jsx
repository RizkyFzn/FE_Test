import React, { useEffect } from 'react'
import DataTableComponent from '../Table'
import { useDispatch } from 'react-redux';
import { fetchGerbangData } from '../../store/gerbang';

const MasterDataGerbang = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGerbangData());
      }, [dispatch]);
  return (
    <>
        <DataTableComponent />
    </>
  )
}

export default MasterDataGerbang