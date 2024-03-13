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
  const [doctorsData, setDoctorsData] = useState<FormData[]>([]); 
  

  const handleFormSubmit = async (formData: FormData[]) => {
    setDoctorsData(formData); // Expecting an array from the form now
  };

  const renderDoctors = () => {
    return doctorsData.map((doctor, index) => (
      <div key={doctor._id} className={styles.doctorCard}>
        <p>Name: {doctor.name}</p>
        <p>Expertise: {doctor.expertise}</p>
        <p>City: {doctor.city}</p>
      </div>
    ));
  };
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>  
      <div className={styles.mainContent}>
        <Form onFormSubmit={handleFormSubmit}/>
        <div className={styles.availableDoctors}>
          
          {doctorsData.length > 0 ? renderDoctors() : null}
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default LandingPage