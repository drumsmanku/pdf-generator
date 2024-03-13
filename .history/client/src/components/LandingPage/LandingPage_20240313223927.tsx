import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateFeedbackForm from '../AddProduct/CreateFeedbackForm';
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';
import Navbar from './Navbar';


function LandingPage() {
  const products = useSelector((state: RootState) => state.product.items);
  const navigate=useNavigate()
  

  return (
    <div className="h-screen w-screen  flex flex-col ">
      <Navbar/>
      <div className='h-full w-full bg-[#F5F5DC] flex lg:flex-row flex-col justify-center lg:justify-around items-center'>
        <CreateFeedbackForm />
        <div className='bg-white rounded-md w-[80%] lg:w-[30%] h-[80%] lg:h-[50%] overflow-auto p-10 shadow-md'>
          {products.length > 0 ? (
            <>
              {products.map((prod: Product, idx: number) => (
                <div className=' border-2 rounded-md mb-5 p-4' key={idx.toString()}>
                  <h3>
                    <u>Product name</u>: {prod.name}
                  </h3>
                  <p>
                    <u>Price</u>: {prod.price}
                  </p>
                  <p>
                    <u>Total</u>: {prod.price*prod.quantity}
                  </p>
                  <p>
                    <u>GST</u>: {18*((prod.price*prod.quantity)/100)}
                  </p>
                </div>
              ))}
              <div style={{ width: '85%' }}>
                <button
                  className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8"
                  type="submit"
                  style={{ cursor: 'pointer' }}
                  onClick={()=>navigate('/download')}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <h1>Please add at least 1 product</h1>
          )}
        </div>
      </div>
     
    </div>
  );
}

export default LandingPage;
