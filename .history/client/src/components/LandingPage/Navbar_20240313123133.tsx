import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


function Navbar() {
  const navigate=useNavigate()
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);
  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
  }
  const handleLogin=()=>{
    navigate('/');
  }
  const handleSignup=()=>{
    navigate('/signup')
  }
  return (
    <div className="w-full bg-[#333] h-[7%]">
    <div className="p-2 md:p-4 flex justify-between items-center bg-blue-500 text-white">
    
      <div>
        {
          isLoggedIn?(
            <>
              <button className="logoutButton text-white text-md font-medium cursor-pointer" onClick={handleLogout}>Logout</button>
            </>
          ):
          <>
          <button className="loginButton text-white text-md font-medium cursor-pointer" onClick={handleLogin}>Login </button>&nbsp;|&nbsp;
          <button className="signupButton text-white text-md font-medium cursor-pointer" onClick={handleSignup}>Signup</button>
          </>
        }
      </div>
    </div>
    
  </div>
  )
}

export default Navbar