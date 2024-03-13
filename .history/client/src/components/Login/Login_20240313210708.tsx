import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img1 from '../../Assets/head.png';

const DivStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  marginBottom: '1.2rem',
  alignItems: 'flex-start',
  width: '85%',
};
const InputStyles = {
  width: '90%',
  padding: '0.5rem 0.5rem 0.5rem 0.5rem',
  borderRadius: '8px',
  border: '2px solid #B6B6B6',
  marginTop: '0.5rem',
};

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const login = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/login', user)
      .then((res) => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData = localStorage.getItem('token');
        if (tokenData !== 'undefined') {
          navigate('/add-products');
        } else {
          setError('Invalid credentials');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="bg-purple-900 text-white p-4 w-full flex items-center">
        <h1 className="font-bold text-lg">PDF Generator</h1>
      </div>
      <h1 className="hidden md:block font-bold text-2xl mt-2">Welcome</h1>
      <div className="flex flex-col items-center mb-16 lg:w-[40%] sm:w-[70%] w-full">
        <form className="border-2 border-gray-300 pb-5 rounded-lg w-2/3 md:w-4/5">
          <div className="flex flex-col items-center p-4">
            <h1 className="text-lg font-bold mb-2">Sign In.</h1>
            <div style={DivStyles}>
              <label htmlFor="email" className="font-semibold text-sm">Enter your email or mobile number</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border-b-2 border-gray-300 rounded-lg"
              />
            </div>
            <div style={DivStyles}>
              <label htmlFor="password" className="font-semibold text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <div className="text-red-500 w-full text-sm mb-2 text-center">{error}</div>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="bg-purple-900 w-[70%] text-white rounded-lg p-2 cursor-pointer"
              type="submit"
              onClick={login}
            >
              Continue
            </button>
          </div>
          <div className="w-full flex justify-center mt-4">
            <p className="w-4/5 text-sm text-left mt-0">By continuing, you agree to PDF Generator's privacy notice and conditions of use.</p>
          </div>
        </form>
        <div className="flex items-center mt-10">
          <hr className="w-36 border-t-2 border-gray-300" />
          <span className="mx-4 text-sm">Don't have an account?</span>
          <hr className="w-36 border-t-2 border-gray-300" />
        </div>
        <button
          className="w-30 bg-none border-2 border-gray-300 rounded-lg p-2 mt-4 cursor-pointer"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Create your account
        </button>
      </div>
      <footer className="bg-purple-900 w-full p-2 text-center text-white">
        PDF Generator | All rights reserved
      </footer>
    </div>
  );
}

export default Login;
