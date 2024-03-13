import  {useState ,useRef, useEffect } from 'react'
import styles from './LandingPage.module.css';
import CreateFeedbackForm from '../AddProduct/CreateFeedbackForm';


interface FormData {
  
}

function LandingPage() {
  

  return (
    <div className={styles.container}>
      <CreateFeedbackForm/>
    </div>
  )
}

export default LandingPage