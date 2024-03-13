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
        <h1 className="font-bold">Musicart</h1>
      </div>
      <h1 className="hidden md:block font-bold text-2xl mt-2">Welcome</h1>
      <div className="flex flex-col items-center mb-16 w-[40%]">
        <form className="border-2 border-gray-300 rounded-lg w-1/3 md:w-4/5">
          <div className="flex flex-col items-center p-4">
            <h1 className="text-lg font-bold mb-2">Sign In. <span className="font-normal">Already a customer?</span></h1>
            <div style={DivStyles}>
              <label htmlFor="email" className="font-semibold text-sm">Enter your email or mobile number</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
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
            <span className="text-red-500 text-sm mb-2">{error}</span>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="bg-purple-900 text-white rounded-lg p-2 cursor-pointer"
              type="submit"
              onClick={login}
            >
              Continue
            </button>
          </div>
          <div className="w-full flex justify-center mt-4">
            <p className="w-4/5 text-sm text-left mt-0">By continuing, you agree to Musicart privacy notice and conditions of use.</p>
          </div>
        </form>
        <div className="flex mt-10">
          <hr className="w-36 border-t-2 border-gray-300" />
          <span className="mx-4 text-sm">New to Musicart?</span>
          <hr className="w-36 border-t-2 border-gray-300" />
        </div>
        <button
          className="w-30 bg-none border-2 border-gray-300 rounded-lg p-2 mt-4 cursor-pointer"
          onClick={() => {
            navigate('/register');
          }}
        >
          Create your Musicart account
        </button>
      </div>
      <footer className="bg-purple-900 w-full p-2 text-white">
        Musicart | All rights reserved
      </footer>
    </div>
  );
}

export default Login;
