import React, {useState, useEffect} from 'react'
import styles from './Navbar.module.css';
import logo from '../../assets/logo_fix.png'

const links=['Home', 'Services', 'Blogs', 'About']
function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove scroll event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={isScrolled ? `${styles.navContainer} ${styles.scrolled}` : styles.navContainer}>
      <img src={logo} alt="logo" style={{height:'3rem'}} />
      <div className={styles.features}>
        <div className={styles.links}>
          {
            links.map((link, idx)=>(
              <a key={idx} href="/">{link}</a>
            ))
          }
        </div>
        <button className={styles.bookNowButton}>Book now</button>
      </div>
    </div>
  )
}

export default Navbar