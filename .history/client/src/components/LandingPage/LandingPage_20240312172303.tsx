import  {useState ,useRef, useEffect } from 'react'
import styles from './LandingPage.module.css';
import CreateFeedbackForm from '../AddProduct/CreateFeedbackForm';
import { useSelector } from 'react-redux';


function LandingPage() {
  const products = useSelector((state) => state.product.items);


  return (
    <div className={styles.container}>
    <CreateFeedbackForm/>
    <div>
      {products.length>0 && products.map((prod) => (
        <div key={prod.id}>
          <h3>{prod.name}</h3>
          <p>Price: {prod.price}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default LandingPage