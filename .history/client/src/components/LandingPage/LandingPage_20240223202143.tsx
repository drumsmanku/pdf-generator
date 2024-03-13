import  {useState} from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';
import Form from './Form';
import Testimonials from './Testimonials';

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

  const handleBookNowClick = () => {
    setIsFormPopupOpen(true);
  };

  // This function will be triggered when clicking outside the `Form`
  const closePopup = () => {
    setIsFormPopupOpen(false);
  };
  


  const handleFormSubmit = async (formData: FormData[]) => {
    setDoctorsData(formData); 
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
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar onBookNowClick={handleBookNowClick}/>
      </div>  
      {isFormPopupOpen && (
        <div className={styles.popupContainer} onClick={closePopup}>
          <Form onFormSubmit={handleFormSubmit} />
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