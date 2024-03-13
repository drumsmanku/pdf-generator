import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CreateFeedbackForm.module.css'

interface FeedbackFormProps {
  fetchData: () => void; // Corrected Prop Type
}
interface Feedback {
  productName: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewRating: string;
  reviewText: string;
}

function CreateFeedbackForm( props:FeedbackFormProps) {

  const navigate = useNavigate();
  const[feedback, setFeedback]=useState<Feedback>({
    
    productName : '', 
    reviewerName:'',
    reviewerEmail:'',
    reviewRating:'', 
    reviewText : '', 
    
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
      setFeedback({
        ...feedback,
        [name]: value,
      });
    
  };
  const sendProd = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  
    // Check if any field is empty
    const isEmptyField = Object.values(feedback).some((value) => value.trim() === '');
    
    if (isEmptyField) {
      alert('Please fill in all fields');
      return;
    }
  
    // Check if the email includes '@'
    if (!feedback.reviewerEmail.includes('@')) {
      alert('Invalid email format');
      return;
    }
  
    axios
      .post('https://feedback-1.onrender.com/api/reviews', feedback)
      .then((res) => {
        console.log('Feedback added successfully');
        alert('Feedback added successfully');
        props.fetchData(); 
        navigate('/'); 
      })
      .catch((err) => console.log(err));
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
                  <input type="text" name="productName" required value={feedback.productName} onChange={handleChange} placeholder="Product Name" />
                </div>


                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="reviewerName" required value={feedback.reviewerName} onChange={handleChange} placeholder="Reviewer Name" />
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="email" required name="reviewerEmail" value={feedback.reviewerEmail} onChange={handleChange} placeholder="Reviewer Email" />
                </div>

                <div className={styles.classStyles} style={{display:'flex', width:'100%', marginBottom:'2rem',alignItems:'center'}}>
                  <label htmlFor="class"><u>Rating:</u> </label>
                  <select className={styles.rating} name='reviewRating' required value={feedback.reviewRating} onChange={handleChange}>
                    <option value="">Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="reviewText" required value={feedback.reviewText} onChange={handleChange} placeholder="Review Text" />
                </div>

                
                <div style={{width:'85%'}}>
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

export default CreateFeedbackForm