import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import '../styles/auth.css';

function LoginPage(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors({
        ...validationErrors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the auth slice
    }
  };

  const switchToSignup = () => {
    setActiveTab('signup');
    navigate('/signup');
  };

  return (
    <div className="auth-page">
      <div className="auth-split-layout">
        <div className="auth-animation-side">
          <div className="device-sync-container">
            <h1 className="device-sync-title">SyncD</h1>
            <p className="device-sync-subtitle">
              Seamlessly sync your data across all your devices
            </p>

            <div className="device-sync-animation">
              <div className="device device-left">
                <div className="device-screen">
                  <div className="sync-dots">
                    <div className="sync-dot" />
                    <div className="sync-dot" />
                    <div className="sync-dot" />
                  </div>
                </div>
              </div>

              <div className="sync-line" />

              <div className="device device-right">
                <div className="device-screen">
                  <div className="sync-dots">
                    <div className="sync-dot" />
                    <div className="sync-dot" />
                    <div className="sync-dot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-container">
            <div className="auth-tabs">
              <div
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTab('login')}
              >
                Login
              </div>
              <div
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={switchToSignup}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && switchToSignup()}
              >
                Sign Up
              </div>
            </div>

            <h2 className="auth-heading">Welcome Back</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <svg
                  className="form-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <div className="error-message">{validationErrors.email}</div>
                )}
              </div>

              <div className="form-group">
                <svg
                  className="form-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {validationErrors.password && (
                  <div className="error-message">
                    {validationErrors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </button>

              {error && (
                <div
                  className="error-message"
                  style={{ textAlign: 'center', marginTop: '0.5rem' }}
                >
                  {error}
                </div>
              )}
            </form>

            <div className="auth-footer">
              Don&apos;t have an account?{' '}
              <button
                className="auth-link"
                onClick={switchToSignup}
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
