import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../styles/Signup.css';
import {url} from '../api/apiendpoint';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(url+'/api/auth/register', formData);
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'Welcome to the dashboard!',
          confirmButtonText: 'Go to login',
        }).then(() => {
          navigate('/login');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: error.response?.data?.message || 'An error occurred during signup',
          confirmButtonText: 'Try Again',
        });
      }
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === 'Google') {
      window.location.href = url+'/api/auth/google';
    } else if (platform === 'Facebook') {
      window.location.href = url+'/api/auth/facebook';
    } else if (platform === 'Apple') {
      console.log(`Sign up with ${platform}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <p>Create your account to start building your resume</p>
        <br />
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className={touched.fullName && errors.fullName ? 'input-error' : ''}
          />
          {touched.fullName && errors.fullName && <p className="error-message">{errors.fullName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className={touched.email && errors.email ? 'input-error' : ''}
          />
          {touched.email && errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className={touched.password && errors.password ? 'input-error' : ''}
          />
          {touched.password && errors.password && <p className="error-message">{errors.password}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          {errors.general && <p className="error-message">{errors.general}</p>}
        </form>

        <div className="social-login">
          <p>or sign up with</p>
          <button className="social-btn apple" onClick={() => handleSocialLogin('Apple')}>
            <i className="fab fa-apple"></i> Sign up with Apple
          </button>
          <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
            <i className="fab fa-google"></i> Sign up with Google
          </button>
          <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
            <i className="fab fa-facebook-f"></i> Sign up with Facebook
          </button>
        </div>

        <p className="login-redirect">
          Already have an account? <span onClick={() => navigate('/login')}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
