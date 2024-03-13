import React from 'react'
import styles from './Navbar.module.css';
import logo from '../../assets/logo_fix.png'

const links=['Home', 'Services', 'Blogs', 'About']
function Navbar() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" style={{height:'3rem'}} />
      <div className={styles.features}>
        <div className={styles.links}>
          {
            links.map((link, idx)=>(
              <a key={idx} href="/">{link}</a>{' '}
            ))
          }
        </div>
        <button></button>
      </div>
    </div>
  )
}

export default Navbar