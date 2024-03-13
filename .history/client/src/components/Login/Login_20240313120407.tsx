import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import img1 from '../../Assets/head.png';


const DivStyles ={
  display: 'flex',
  flexDirection: 'column' as const,
  marginBottom: '1.2rem',
  alignItems: 'flex-start',
  width: '85%',
}
const InputStyles={
  width: '90%',
  padding:'0.5rem 0.5rem 0.5rem 0.5rem',
  borderRadius: '8px',
  border:'2px solid #B6B6B6',
  marginTop: '0.5rem',
}

function Login() {
  const navigate = useNavigate();
  const [error, setError]=useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const login = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.post('http://localhost:4000/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/add-products')
        }
        else{
         setError('Invalid credentials');
        }
        
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 style={{fontWeight:'500'}}>Musicart</h1>
      </div>
      <h1 className={styles.welcomeText} >Welcome</h1>
      <div className={styles.mainBody}>
        <form className={styles.form}>
          
          <div className={styles.inputContainer}>
            <h1 className={styles.signInText}>Sign In. <span className={styles.alreadyCustomer}>Already a customer?</span></h1>
            

            <div style={DivStyles}>
              <label htmlFor="email" style={{fontWeight:600, fontSize:'small'}}>Enter your email or mobile number</label>
              <input type="text" name="email" value={user.email} onChange={handleChange} style={InputStyles}/>
            </div>

            
            <div style={DivStyles}>
              <label htmlFor="password" style={{fontWeight:600, fontSize:'small'}}>Password</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} style={InputStyles} />
            </div>
            <span style={{color:'red', fontSize:'small', marginBottom:'0.6rem'}}>
              {error}
            </span>
            
          </div>
          
          <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <button className={styles.buttonStyles} type="submit" style={{ cursor:'pointer'}} onClick={login}>Continue</button>
          </div>

          <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1rem'}}>
            <p style={{width:'85%', textAlign:'left',fontSize:'small',  marginTop:0}}>By continuing, you agree to Musicart privacy notice and conditions of use.
            </p>
          </div>

        </form>
        <div style={{display:'flex', marginTop:'2.5rem'}}>
          <hr className={styles.wideLine} />
          <span className={styles.newToMusic} >New to Musicart?</span>
          <hr className={styles.wideLine} />
        </div>

        <button className={styles.notLoggedInButton}  onClick={()=>{navigate('/register')}}>Create your Musicart account</button>
      </div>
      

      <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white'}}>
          Musicart | All rights reserved
      </footer>
    </div>
  )
}

export default Login