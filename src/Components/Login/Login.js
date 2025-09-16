import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MyContext } from '../../Context/context'; // Ensure this path is correct
import "../Assets/Css/style.css"; // Your existing stylesheet
import logo from "../Assets/Images/logo-removebg-preview.png"; // Ensure this path is correct

const Login = () => {
  const { login } = useContext(MyContext);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  // State for the main login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // State for the Forgot Password modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handlers for the main login form
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      return toast.error("Please fill in both email and password.");
    }
    const res = await login(loginForm);
    if (res.success) {
      localStorage.setItem("token", res.token);
      toast.success(res.message);
      setTimeout(() => navigate('/home'), 2000);
    } else {
      toast.error(res.message);
    }
  };

  // Handlers for the Forgot Password modal
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordForm({ ...forgotPasswordForm, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // IMPORTANT: Replace with your actual API endpoint URL
      const response = await axios.post(`${URL}/togouser/forgot-password`, {
        email: forgotPasswordForm.email,
        newPassword: forgotPasswordForm.newPassword,
        confirmPassword: forgotPasswordForm.confirmPassword,
      });

      toast.success(response.data.message || "Password reset successful!");
      localStorage.setItem("adminToken", response.data.token); // Optional
      setLoading(false);
      setIsModalOpen(false);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // ✅ **FIX 1: Create a dedicated function to open the modal**
  // This function accepts the event `e` object.
  const openModal = (e) => {
    // ✅ **FIX 2: Prevent the default form submission behavior**
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 p-0">
            <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center bg-colorrr-utututu">
              <div className="login-card-card bg-colorrr-utututu">
                <div className="brand">
                  <img src={logo} width="100px" alt="logo" />
                  <p>Enter your credentials to access your account</p>
                </div>
                <form id="loginForm" onSubmit={handleLoginSubmit}>
                  {/* Login Form Fields */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      autoComplete="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        style={{ paddingRight: '40px' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          fontSize: '16px',
                          color: '#6c757d'
                        }}
                      >
                        {showPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </div>
                  <div className="remember-forgot">
                    <div className="remember-me">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                    <button
                      type="button"
                      className="forgot-password"
                      // ✅ **FIX 3: Update the onClick handler to call the new function**
                      onClick={openModal}
                      style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <button type="submit" className="login-btn">Sign in</button>
                </form>
                <div className="signup-link">
                  <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 p-0">
            <div id="retailCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://img.freepik.com/free-photo/facade-modern-house_1268-24725.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    className="d-block w-100" style={{minHeight:"100vh"}} alt="Retail Store 1" />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://img.freepik.com/free-photo/hong-kong-apartment-block_1359-904.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    className="d-block w-100" style={{minHeight:"100vh"}} alt="Retail Store 2" />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://img.freepik.com/free-photo/hotel_1127-4044.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    className="d-block w-100" style={{minHeight:"100vh"}} alt="Retail Store 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#retailCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#retailCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORGOT PASSWORD MODAL --- */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="bg-white rounded shadow-lg position-relative"
            style={{
              padding: '30px',
              width: '90%',
              maxWidth: '450px',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            {/* Add keyframe animation style */}
            <style>
              {`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}
            </style>
            
            <div 
              className="d-flex justify-content-between align-items-center pb-3 mb-3"
              style={{ borderBottom: '1px solid #eee' }}
            >
              <h2 className="mb-0 h4 text-dark">Reset Password</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="btn-close"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  color: '#555',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleForgotPasswordSubmit}>
              <div>
                <div className="mb-3">
                  <label htmlFor="modal-email" className="form-label fw-semibold text-dark">
                    Email
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your registered email"
                    value={forgotPasswordForm.email}
                    onChange={handleForgotPasswordChange}
                    style={{
                      padding: '12px',
                      fontSize: '1rem',
                      border: '1px solid #ccc',
                      borderRadius: '5px'
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label fw-semibold text-dark">
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      className="form-control"
                      placeholder="Enter a new password"
                      value={forgotPasswordForm.newPassword}
                      onChange={handleForgotPasswordChange}
                      style={{
                        padding: '12px',
                        paddingRight: '40px',
                        fontSize: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0',
                        fontSize: '16px',
                        color: '#6c757d'
                      }}
                    >
                      {showNewPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark">
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your new password"
                      value={forgotPasswordForm.confirmPassword}
                      onChange={handleForgotPasswordChange}
                      style={{
                        padding: '12px',
                        paddingRight: '40px',
                        fontSize: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0',
                        fontSize: '16px',
                        color: '#6c757d'
                      }}
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-end mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4 py-2"
                  disabled={loading}
                  style={{
                    fontSize: '1rem',
                    transition: 'background-color 0.3s',
                    backgroundColor: loading ? '#6c757d' : '#007bff',
                    borderColor: loading ? '#6c757d' : '#007bff',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#0056b3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#007bff';
                    }
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;