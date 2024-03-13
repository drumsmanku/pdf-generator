import  {useState ,useRef, useEffect } from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';
import Form from './Form';
import Testimonials from './Testimonials';
import FormPopup from './FormPopup';

interface FormData {
  _id: string;
  name: string;
  expertise: string;
  city: string;
  imgUrl:string;
}

function LandingPage() {
  const [doctorsData, setDoctorsData] = useState<FormData[]>([]); 
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
  const formPopupRef = useRef<HTMLDivElement>(null);

  const handleBookNowClick = () => {
    setIsFormPopupOpen(true);
  };

  const closePopup = () => {
    setIsFormPopupOpen(false);
  };
  


  const handleFormSubmit = async (formData: FormData[]) => {
    setDoctorsData(formData); 
    closePopup()
  };

  const renderDoctors = () => {
    return doctorsData.map((doctor) => (
      <div key={doctor._id} className={styles.doctorCard}>
        <div className={styles.imgDiv}>
          <div className={styles.imgImgDiv}><img src={doctor.imgUrl} alt="img" /></div>
        </div>
        <p>Name: {doctor.name}</p>
        <p>Expertise: {doctor.expertise}</p>
        <p>City: {doctor.city}</p>
      </div>
    ));
  };

  useEffect(() => {

    const handleWindowClick = (e: MouseEvent) => {

      if (formPopupRef.current && formPopupRef.current.contains(e.target as Node)) {
        return;
      }
     
      closePopup();
    };

    if (isFormPopupOpen) {
      window.addEventListener('mousedown', handleWindowClick);
    }

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
    };
  }, [isFormPopupOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar onBookNowClick={handleBookNowClick}/>
      </div>  
      {isFormPopupOpen && (
        <div className={styles.popupContainer}  >
          <FormPopup onFormSubmit={handleFormSubmit} />
        </div>
      )}
      <div className={styles.mainContent}>
        <Form onFormSubmit={handleFormSubmit}/>
        <div className={styles.availableDoctors}>
          
          {doctorsData.length > 0 ? renderDoctors() : <p style={{color:'white'}}>Please enter details to see a list of doctors...</p>}
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default LandingPage