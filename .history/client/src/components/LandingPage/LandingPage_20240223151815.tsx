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
}

function LandingPage() {
  const [data, setData] = useState<FormData | null>(null);
  

  const handleFormSubmit = async (formData: FormData) => {
    setData(formData);
  };
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>  
      <div className={styles.mainContent}>
        <Form onFormSubmit={handleFormSubmit}/>
        <div className={styles.availableDoctors}>
        {data && (
          <div className={styles.availableDoctors}>
            <p>Name: {data.name}</p>
            <p>Expertise: {data.expertise}</p>
            <p>City: {data.city}</p>
          </div>
        )}
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default LandingPage