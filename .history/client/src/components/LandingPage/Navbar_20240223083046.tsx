import React from 'react'
import styles from './Navbar.module.css';
import logo from '../../assets/doctor.png'

const links=['Home', 'Services', 'Blogs', 'About']
function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.features}>
        <div></div>
      </div>
    </div>
  )
}

export default Navbar