import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateFeedbackForm.module.css'
import { useDispatch } from 'react-redux';
// Assuming the feedback slice and actions are defined somewhere
import { addProduct } from '../../store/features/productsSlice';


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
  const[product, setProduct]=useState<Product>({
    
    name : '', 
    quantity:0,
    price:0,
    
    
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
    setProduct({name: '', quantity:0, price:0});
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
                  <input type="text" name="productName" required value={product.name} onChange={handleChange} placeholder="Product Name" />
                </div>


                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="number" name="price" required value={product.price} onChange={handleChange} placeholder="Price" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="number" required name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" />
                </div>

                <div style={{width:'85%', backgroundColor:'#36416A'}}>
                  <button className={styles.addPopupButton} type="submit" style={{ cursor:'pointer'}} onClick={sendProd}>Create</button>
                  
                </div>

              </form>
                <div className={styles.modalAddBodyRight}>
                  <h1 className={styles.h1RightBody} style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Post your Feedbacks......</h1>
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