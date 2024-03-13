import React from 'react'
import styles from './LandingPage.module.css';
import Navbar from './Navbar';

function LandingPage() {
  return (
    <div className={styles.container}>
      <Navbar/>
    </div>
  )
}

export default LandingPage