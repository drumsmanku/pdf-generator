import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DivStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  marginBottom: '1rem',
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

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const signup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/signup', user)
      .then((res) => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData = localStorage.getItem('token');
        if (tokenData !== 'undefined') {
          navigate('/add-products');
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="flex items-center bg-purple-900 text-white p-4 w-full">
        <h1 className="font-bold text-lg">PDF Generator</h1>
      </div>
      <h1 className="hidden md:block font-bold text-2xl mt-2">Welcome</h1>
      <form className="border-2 border-gray-300 rounded-lg pb-6 w-2/3 md:w-1/3">
        <div className="flex flex-col items-center p-4">
          <h2 className="text-lg font-bold mb-2" style={{ alignSelf: 'start', paddingLeft: '2.2rem', fontWeight: 600 }}>
            Create Account
          </h2>
          <div style={DivStyles}>
            <label htmlFor="name" className="font-semibold text-sm">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
              style={InputStyles}
            />
          </div>
          <div style={DivStyles}>
            <label htmlFor="mobile" className="font-semibold text-sm">
              Mobile number
            </label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
              style={InputStyles}
            />
          </div>
          <div style={DivStyles}>
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
              style={InputStyles}
            />
          </div>
          <div style={DivStyles}>
            <label htmlFor="password" className="font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border-2 border-gray-300 rounded-lg"
              style={InputStyles}
            />
          </div>
        </div>

        <span className="text-red-500 text-sm mb-2 text-center">{error}</span>
        <div className="w-[90%] flex justify-center">
          <button
            className="bg-purple-900 text-white rounded-lg p-2 cursor-pointer w-[80%]"
            type="submit"
            style={{ cursor: 'pointer' }}
            onClick={signup}
          >
            Continue
          </button>
        </div>
        <div className="w-full flex justify-center mt-4">
          <p className="w-4/5 text-sm text-left mt-0 font-semibold" style={{ fontWeight: 600, fontSize: 'small' }}>
            By continuing, you agree to PDF Generator's privacy notice and conditions of use.
          </p>
        </div>
      </form>
      <span className="font-bold mt-4">
        Already have an account?
        <button
          className="bg-none text-purple-900 text-md ml-1 p-0 cursor-pointer border-none underline"
          onClick={() => {
            navigate('/');
          }}
        >
          Sign in
        </button>
      </span>
      <footer className="bg-purple-900 w-full p-2 text-white mt-1 text-center">
        PDF Generator | All rights reserved
      </footer>
    </div>
  );
}

export default Register;
