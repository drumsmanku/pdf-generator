import React from 'react'
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import { useSelector } from 'react-redux';
import logo from '../../assets/lev_logo.jpg'

function DownloadPage() {
  const products = useSelector((state: RootState) => state.product.items);
  return (
    <div className='h-screen w-screen'>
      <div className='h-[15%] flex justify-around items-center'>
        <h1 className=' font-bold text-2xl'>INVOICE GENERATOR</h1>
        <img src={logo} alt="logo" className='h-14' />
      </div>
      <div className='w-full flex justify-center'>
        <table>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default DownloadPage