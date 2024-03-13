import React,{useState} from 'react'
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/lev_logo.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addProduct, clearProducts } from '../../store/features/productsSlice';
import { UseDispatch } from 'react-redux';

function DownloadPage() {
  const products = useSelector((state: RootState) => state.product.items);
  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [isOpen, setIsOpen]=useState(true)

  const handleGeneratePDF = async () => {
    const htmlContent = document.documentElement.innerHTML;
    try {
      const response = await axios.post('http://localhost:4000/generate-pdf', { htmlContent },{ responseType: 'blob' });
      setIsOpen(false);
      const { data } = response;
      const pdfBlob = new Blob([data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'products.pdf'); 
      document.body.appendChild(link);
      link.click();
      
      dispatch(clearProducts())
      navigate('/add-products')
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  return (
    <div className='h-screen w-screen'>
      <div className='h-[10%] lg:h-[12%] flex justify-around items-center'>
        <h1 className=' font-bold text-lg lg:text-2xl'>INVOICE GENERATOR</h1>
        <img src="https://i.ibb.co/Ph7dNn9/lev-logo.jpg" alt="logo" className=' h-10 lg:h-14' />
      </div>
      {
        isOpen?
        (
            <div style={{ width: '45%', display: 'flex', justifyContent: 'center' }}>
              <button
                className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8"
                type="submit"
                style={{ cursor: 'pointer' }}
                onClick={handleGeneratePDF}
              >
                Download
              </button>
            </div>
        ):
        (
          <></>
        )
      }
      
      <div className='w-full flex justify-center pl-10 lg:pl-24 mt-12'>
        <table className=' w-[80%] lg:w-[70%] lg:h-[50%] overflow-auto mb-6 '>
          <thead className=' border-b-2'>
            <tr className='text-left mb-8 h-16 text-lg'>
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
        <div className='flex w-[50%] lg:w-[20%] justify-between text-lg '>
          <p className='font-bold'>Total</p>
          <p>{total} </p>
        </div>
        <div className='flex w-[50%] lg:w-[20%] justify-between text-sm '>
          <p className='font-bold'>GST</p>
          <p>18%</p>
        </div>
        <table className='w-[50%] lg:w-[20%] h-16'>
          <thead className='border-b-2 border-t-2 w-full h-full flex flex-col justify-center '>
            <tr className='flex justify-between'>
              <td>Grand Total</td>
              <td className=' text-cyan-600'>₹{total*18/100}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div className='w-[50%] mt-8 flex justify-center'>
        <span>Valid until: <span className=' text-cyan-600'>12/04/24</span></span>
      </div>
      <div className='w-full flex justify-center mt-12'>
        <div className='w-[80%] lg:w-[60%] bg-black px-16 py-8 rounded-[3rem] text-md text-white  '>
          <p >Terms and Conditions</p>
          <span >We are happy to supply any further information you may need and trust that you call on us to fill your order. which will receive our prompt and careful attention. </span>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage