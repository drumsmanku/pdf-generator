import React from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';

function LandingPage() {
  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.mainContent}>
        heyyyyyyyyy
      </div>
    </div>
  )
}

export default LandingPage