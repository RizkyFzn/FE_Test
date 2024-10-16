import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Content from '../Content'
import { fetchLalinsData } from '../../store/lalin';
import { fetchGerbangData } from '../../store/gerbang';
import { useDispatch } from 'react-redux';



const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchLalinsData());
        dispatch(fetchGerbangData());
        
    }, [dispatch]);
    return (
        <div className='w-screen h-screen flex flex-row'>
            <div>
                <Sidebar/>
            </div>
            <div className='flex flex-col flex-grow'>
                <Navbar/>
                <Content />
            </div>
        </div>
    )
}

export default Dashboard