import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

const DivStyles={
  display: 'flex',
  flexDirection: 'column' as FlexDirection,
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
  // const navigate = useNavigate();
  const [error, setError]=useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const login = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.post('http://localhost:4000/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.name);
        // const tokenData=localStorage.getItem('token')
        // if(tokenData!=='undefined') {
        //   navigate('/')
        // }
        // else{
        //  setError('Invalid credentials');
        // }
        
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className='mx-auto min-h-screen flex flex-col justify-between items-center'>
      <div className='flex items-center font-roboto text-purple-900 font-medium md:heading bg-purple-900 md:w-full md:h-8 md:pl-8 text-sm  '>
        <h1 style={{fontWeight:'500'}}>DoubtShare</h1>
      </div>
      <h1 className='hidden' >Welcome</h1>
      <div className="w-full flex flex-col items-center mb-16">
        <form className='bg-white border-3 border-gray-300 rounded-xl w-1/3 flex flex-col'>
          
          <div className='flex items-center flex-col'>
            <h3 className='self-start pl-8 font-medium'>Sign In for Students.</h3>
            

            <div style={DivStyles}>
              <label htmlFor="email" className=' font-semibold text-sm' >Enter your email </label>
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
            <button className='w-11/12 bg-purple-900 rounded-md text-white py-2.5 font-roboto font-medium text-base' type="submit" style={{ cursor:'pointer'}} onClick={login}>Continue</button>
          </div>

          <div style={{width:'100%', display:'flex', paddingTop:'1rem', paddingLeft:'2rem'}}>
             <p>Are you a Tutor?</p>
             <u style={{ cursor:'pointer', marginLeft:'0.5rem'}} onClick={()=>{navigate('/login/tutor')}}>click here</u> 
          </div>


          <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1rem'}}>
            <p style={{width:'85%', textAlign:'left',fontSize:'small',  marginTop:0}}>By continuing, you agree to DoubtShare privacy notice and conditions of use.
            </p>
          </div>

        </form>
        <div style={{display:'flex', marginTop:'2.5rem'}}>
          <hr className='h-0.5 w-36 bg-gray-400' />
          <span className='mx-6' >New to DoubtShare?</span>
          <hr className='h-0.5 w-36 bg-gray-400' />
        </div>

        <button className='w-1/3 bg-transparent border-2 border-gray-400 rounded-md text-black py-2.5 font-roboto font-medium text-base mt-8 cursor-pointer'  onClick={()=>{navigate('/register/student')}}>Create your DoubtShare account</button>
      </div>
      

      <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white', textAlign:'center'}}>
          DoubtShare | All rights reserved
      </footer>
    </div>
  )
}

export default Login