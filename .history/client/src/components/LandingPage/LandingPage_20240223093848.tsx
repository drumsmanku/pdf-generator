import React from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';

function LandingPage() {
  return (
    <div className={styles.container}>
      <div>
        <Navbar/>
      </div>
      
      <div className={styles.mainContent}>
        
      </div>
    </div>
  )
}

export default LandingPage