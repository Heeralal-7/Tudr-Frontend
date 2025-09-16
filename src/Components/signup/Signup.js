import React, { useContext, useState } from 'react';
import "../Assets/Css/style.css";
import { MyContext } from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // 🔥 Import toast

const Signup = () => {
  const { register } = useContext(MyContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    
    if (res.success) {
      toast.success(res.message); // ✅ Show success notification
      setTimeout(() => {
        navigate('/login'); // ⏳ Navigate after 2 seconds
      }, 2000);
    } else {
      toast.error(res.message); // ❌ Show error notification immediately
    }
  };
  

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center sign-upimage">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-10 d-flex justify-content-center align-items-center">
            <form className="signup-tudr" onSubmit={handleSubmit} autoComplete="off">
              <h1 className="turdr-text">Create account</h1>
              <h2 className="turdr-text">Already have an account? <a className="fw-semibold text-success" href="/login">Login in</a></h2>

              <div className="signup-tudr__field">
                <input
                  className="signup-tudr__input"
                  type="text"
                  name="name"
                  id="username"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <label className="signup-tudr__label" htmlFor="username">Username</label>
              </div>

              <div className="signup-tudr__field">
                <input
                  className="signup-tudr__input"
                  type="text"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="signup-tudr__label" htmlFor="email">Email</label>
              </div>

              <div className="signup-tudr__field">
                <input
                  className="signup-tudr__input"
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="signup-tudr__label" htmlFor="password">Password</label>
              </div>

              <button className="tudr-buttom" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
