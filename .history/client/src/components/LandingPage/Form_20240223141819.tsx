import React, { useState } from 'react';
import styles from './Form.module.css';


interface FormData {
  name: string;
  phoneNumber: string;
  age: string;
  city: string;
  company: string;
  chiefComplaints: string;
  previousExperience: boolean;
}

interface ChildComponentProps {
  data: any[]; // Define the type for the data state
  setData: React.Dispatch<React.SetStateAction<any[]>>; // Define the type for the setData function
}
const Form = (prop:ChildComponentProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    age: '',
    city: '',
    company: '',
    chiefComplaints: '',
    previousExperience: false,
  });
  const [error, setError] = useState('');

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (error) setError('');
  };

  const validateFields = (slide: number): boolean => {
    switch (slide) {
      case 0:
        if (!formData.name || !formData.phoneNumber) {
          setError("Please fill out all fields before continuing.");
          return false;
        }
        break;
      case 1:
        if (!formData.age || !formData.city || !formData.company) {
          setError("Please fill out all fields before continuing.");
          return false;
        }
        break;
    }
    return true;
  };

  const nextSlide = () => {
    if (validateFields(slideIndex)) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const showError = () => {
    if (error) {
      return <p className={styles.error}>{error}</p>;
    }
    return null;
  };

  const isAgeLessThan40 = formData.age && parseInt(formData.age) < 40;

  const submitForm = async () => {
    if (validateFields(2)) { 
      try {
        const response = await fetch('http://localhost:4000/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Doctors Data:', data); // Your list of doctors
        } else {
          console.error('Submission Failed:', data.message);
        }
      } catch (error) {
        console.error('Submission Error:', error);
      }
    }
  };

  const renderFormSlide = () => {
    switch(slideIndex) {
      case 0:
        return (
          <div className={styles.firstSlide}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
            <button className={styles.nextButton} onClick={nextSlide}>Next</button>
          </div>
        );
      case 1:
        return (
          <div className={styles.secondSlide}>
            <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
            <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} />
            <button className={styles.nextButton} onClick={nextSlide}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className={styles.thirdSlide}>
            <input type="text" name="chiefComplaints" placeholder="Chief Complaints" value={formData.chiefComplaints} onChange={handleInputChange} />

            {!isAgeLessThan40 && (
              <label style={{fontSize:'small', display:'flex', color:'#c2d5e8',alignItems:'center', marginTop:'1rem', marginBottom:'1rem'}}>
                Previous experience with physiotherapy
                <input style={{height:'1rem', marginLeft:'0.3rem'}} type="checkbox" name="previousExperience" checked={formData.previousExperience} onChange={handleInputChange} />
                
              </label>
            )}
            <button className={styles.submitButton} onClick={submitForm}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Book an appointment</h2>
      {showError()}
      {renderFormSlide()}
    </div>
  );
};

export default Form;
