import React from 'react'
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo_lev.png'

function DownloadPage() {
  const products = useSelector((state: RootState) => state.product.items);
  return (
    <div className='h-screen w-screen'>
      <div className='h-[30%] flex justify-around'>
        <h1>INVOICE GENERATOR</h1>
        <img src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default DownloadPage