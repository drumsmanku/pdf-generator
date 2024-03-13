import React, {useState, useEffect} from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';
import Form from './Form';
import Testimonials from './Testimonials';

interface FormData {
  _id: string;
  name: string;
  expertise: string;
  city: string;
  // Add other properties as per your data structure
}

function LandingPage() {
  const [data, setData] = useState<FormData | null>(null); 
  const[immData, setImmData]=useState<FormData | null>(null)

  const handleFormSubmit = async (formData: any) => {
    setData(formData);
    
  };
  useEffect(() => {
    setImmData(data)
    console.log(data);
    
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>  
      <div className={styles.mainContent}>
        <Form onFormSubmit={handleFormSubmit}/>
        <div className={styles.availableDoctors}></div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default LandingPage