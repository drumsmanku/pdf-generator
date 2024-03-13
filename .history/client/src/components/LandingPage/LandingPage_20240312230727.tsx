import React from 'react';
import { useSelector } from 'react-redux';
import styles from './LandingPage.module.css';
import CreateFeedbackForm from '../AddProduct/CreateFeedbackForm';
import { Product } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';

function LandingPage() {
  const products = useSelector((state: RootState) => state.product.items);

  return (
    <div className={styles.container}>
      <CreateFeedbackForm />
      <div className='bg-white rounded-sm w-[30%] h-[50%] overflow-auto p-10'>
        {products.length > 0 ? (
          <>
            {products.map((prod: Product, idx: number) => (
              <div key={idx.toString()}>
                <h3>
                  <u>Product name</u>: {prod.name}
                </h3>
                <p>
                  <u>Price</u>: {prod.price}
                </p>
                <p>
                  <u>Total</u>: {prod.price*prod.quantity}
                </p>
              </div>
            ))}
            <div style={{ width: '85%' }}>
              <button
                className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8"
                type="submit"
                style={{ cursor: 'pointer' }}
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
  );
}

export default LandingPage;
