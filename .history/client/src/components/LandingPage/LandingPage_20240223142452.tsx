import React, {useState, useEffect} from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';
import Form from './Form';
import Testimonials from './Testimonials';



function LandingPage() {
  const [data, setData] = useState<any[]>([]);

  const handleFormSubmit = async (formData: any) => {
    setData(formData);
  };
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>  
      <div className={styles.mainContent}>
        <Form onFormSubmit={handleFormSubmit}/>
      </div>
      <Testimonials/>
    </div>
  )
}

export default LandingPage