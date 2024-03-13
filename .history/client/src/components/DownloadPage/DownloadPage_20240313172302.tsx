import React from 'react'
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import { useSelector } from 'react-redux';
import logo from '../../assets/lev_logo.jpg'

function DownloadPage() {
  const products = useSelector((state: RootState) => state.product.items);
  return (
    <div className='h-screen w-screen'>
      <div className='h-[30%] flex justify-around'>
        <h1 className=' font-bold'>INVOICE GENERATOR</h1>
        <img src={logo} alt="logo" className='h-12' />
      </div>
    </div>
  )
}

export default DownloadPage