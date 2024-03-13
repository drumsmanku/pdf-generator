import React,{useState} from 'react'
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import { useSelector } from 'react-redux';
import logo from '../../assets/lev_logo.jpg'

function DownloadPage() {
  const products = useSelector((state: RootState) => state.product.items);
  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  return (
    <div className='h-screen w-screen'>
      <div className='h-[15%] flex justify-around items-center'>
        <h1 className=' font-bold text-2xl'>INVOICE GENERATOR</h1>
        <img src={logo} alt="logo" className='h-14' />
      </div>
      <div className='w-full flex justify-center pl-24 mt-12'>
        <table className='w-[70%] h-[50%] overflow-auto text-xxl mb-6 '>
          <thead className=' border-b-2'>
            <tr className='text-left mb-8 h-16 text-xxl'>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          {/* <tr><hr className=' w-[100%] h'/></tr> */}
          
          {
            products.map((product:Product, idx:Number)=>(
              <tr className=' text-xxl h-16' key={idx.toString()}>
                <td>{product.name}</td>
                <td className=' text-cyan-600'>{product.quantity}</td>
                <td>{product.price}</td>
                <td>INR&nbsp;{product.price*product.quantity}</td>
              </tr>
            ))
          }
          <thead className='border-b-2'><tr></tr></thead>
        </table>
          
      </div>
      <div className='w-full flex  pr-[15%] flex-col items-end space-y-6'>
        <div className='flex w-[20%] justify-between text-lg '>
          <p className='font-bold'>Total</p>
          <p>{total} </p>
        </div>
        <div className='flex w-[20%] justify-between text-sm '>
          <p className='font-bold'>GST</p>
          <p>18%</p>
        </div>
        <table className='w-[20%] h-16'>
          <thead className='border-b-2 border-t-2 w-full h-full flex flex-col justify-center '>
            <tr className='flex justify-between'>
              <td>Grand Total</td>
              <td className=' text-cyan-600'>₹{total*18/100}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default DownloadPage