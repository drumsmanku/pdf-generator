import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './CreateFeedbackForm.module.css'
import { useDispatch } from 'react-redux';
// Assuming the feedback slice and actions are defined somewhere
import { addProduct } from '../../store/features/productsSlice';
import { RootState } from '../../store/features/productsSlice';


interface ProductFormProps {
  fetchData: () => void; // Corrected Prop Type
}
interface Product {
  // or number, depending on your ID system
  name: string;
  quantity: number;
  price: number;
  // Add other product fields as necessary
}

function CreateProductForm( ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state:RootState) => state.product.items);
  const[product, setProduct]=useState<Product>({
    
    name : '', 
    quantity:NaN,
    price:NaN,
    
    
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
      setProduct({
        ...product,
        [name]: value,
      });
    
  };
  const sendProd = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  
    // Check if any field is empty
    const isEmptyField = Object.values(product).some((value) => value.trim() === '');
    
    if (isEmptyField) {
      alert('Please fill in all fields');
      return;
    }
  
  
    dispatch(addProduct(product)); // Dispatch the addFeedback action with the feedback data
    alert('Feedback submitted successfully!'); // Optional: Alert the user of successful submission
    setProduct({name: '', quantity:NaN, price:NaN});
  };


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        
        
          <div className={styles.modalAdd} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
            <div className={styles.modalAddContent}>
              
              <div className={styles.modalAddBody}>
             
              <form className={styles.modalAddBodyLeft}>
              <h2>Create Feedback </h2>

                

                <div className={styles.productName} style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="name" required value={product.name} onChange={handleChange} placeholder="Product Name" />
                </div>


                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="number" name="price" required value={product.price} onChange={handleChange} placeholder="Price" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="number" required name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" />
                </div>

                <div style={{width:'85%'}}>
                  <button className="px-4 py-1.5 text-white h-8 text-md rounded-full border-none bg-[#36416A] mt-8 " type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>{products.length>0 ?<span>Add more</span>:<span>Add</span>}</button>
                  
                </div>

              </form>
                <div className={styles.modalAddBodyRight}>
                  <h1 className={styles.h1RightBody} style={{fontSize:'xx-large'}}>Products</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Add your Products......</h1>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        
      </header>
    </div>
  )
}

export default CreateProductForm