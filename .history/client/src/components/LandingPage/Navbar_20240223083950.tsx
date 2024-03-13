import React from 'react'
import styles from './Navbar.module.css';
import logo from '../../assets/logo_fix.png'

const links=['Home', 'Services', 'Blogs', 'About']
function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" height={20} />
      </div>
      <div className={styles.features}>
        <div className={styles.links}>
          {
            links.map((link, idx)=>(
              <a key={idx} href="/">{link}</a>
            ))
          }
        </div>
        <div className={styles.bookNowButton}></div>
      </div>
    </div>
  )
}

export default Navbar