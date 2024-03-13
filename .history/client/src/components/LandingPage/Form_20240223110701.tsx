import React, { useState } from 'react';
import styles from './Form.module.css';
import { useLocation } from 'react-router-dom';

interface FormData {
  name: string;
  phoneNumber: string;
  age: string;
  city: string;
  company: string;
  chiefComplaints: string;
  previousExperience: boolean;
}

const Form = () => {
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

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const cityParam = urlParams.get('city');
  if (cityParam) {
    formData.city = cityParam; // Override city if URL parameter is present
  }

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
    // Here you would typically make an API call
    // For simplicity, let's log the current state to the console
    console.log(formData);
    
    // You would submit to an API endpoint, for example:
    // const response = await fetch('https://your-free-server.com/api/doctors', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    // console.log(data);
  };

  const renderFormSlide = () => {
    switch(slideIndex) {
      case 0:
        return (
          <>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
            <button onClick={nextSlide}>Next</button>
          </>
        );
      case 1:
        return (
          <>
            <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
            <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} />
            <button onClick={nextSlide}>Next</button>
          </>
        );
      case 2:
        return (
          <>
            <input type="text" name="chiefComplaints" placeholder="Chief Complaints" value={formData.chiefComplaints} onChange={handleInputChange} />

            {!isAgeLessThan40 && (
              <label>
                <input type="checkbox" name="previousExperience" checked={formData.previousExperience} onChange={handleInputChange} />
                Previous experience with physiotherapy
              </label>
            )}
            <button onClick={submitForm}>Submit</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      {showError()}
      {renderFormSlide()}
    </div>
  );
};

export default Form;
