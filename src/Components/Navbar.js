import { Link ,useNavigate} from 'react-router-dom';
import React, { useContext, useState } from "react";

import logo from "../Components/Assets/Images/logo-removebg-preview.png";
import { MyContext } from "../Context/context";

const Navbar = () => {


 const navigate = useNavigate();

  const handleFilterClick = (filterObj) => {
    // Serialize filterObj into URLSearchParams
    const params = new URLSearchParams();

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        // e.g. ExpectedPrice: { min: 5000000, max: 10000000 }
        Object.entries(value).forEach(([subKey, subVal]) => {
          if (subVal != null) {
            params.set(subKey === 'under' ? 'maxPrice' : subKey === 'min' ? 'minPrice' : subKey === 'max' ? 'maxPrice' : subKey, subVal);
          }
        });
      } else if (value != null) {
        params.set(key, value);
      }
    });

    navigate(`/propertySearch?${params.toString()}`);
  };

  return (
    <>
      

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand text-gray" to="/home">
            <img src={logo} height="65px" alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-3">
              <li className="nav-item active">
                <Link className="nav-link active" to="/home">Home</Link>
              </li>
 <li className="nav-item position-static">
              <button className="nav-link btn btn-link pt-2 " id="buyLink">Buy</button>
              <div className="mega-menu-wrapper" id="megaMenu">
                <div className="row">
                 <div className="col-md-4  menu-column">
  <h6><i className="fas fa-home me-2"></i>Property Types</h6>
  {[
    { label: 'Plot', propertyType: 'Plot' },
    { label: 'Builder Floor', propertyType: 'Builder Floor' },
    { label: 'Villa', propertyType: 'Villa' },
    { label: 'Independent House', propertyType: 'Independent House' },
    { label: 'Apartment', propertyType: 'Apartment' }
  ].map(({ label, propertyType }) => (
    <button
      key={propertyType}
      className="btn btn-link text-start w-100 text-black fw-semibold text-decoration-none"
      onClick={() => handleFilterClick({ propertyType })}
    >
      {label}
    </button>
  ))}
</div>

<div className="col-md-4  menu-column">
  <h6 className='pb-3'>Budget</h6>

  <button
    className="btn btn-link text-start w-100 text-black pb-3 p-0 fw-semibold text-decoration-none "
    onClick={() => handleFilterClick({ ExpectedPrice: { under: 5000000 } })}
  >
    Under ₹50 Lakh
  </button>

  <button
    className="btn btn-link text-start w-100 text-black pb-3 p-0 fw-semibold text-decoration-none"
    onClick={() => handleFilterClick({ ExpectedPrice: { min: 5000000, max: 10000000 } })}
  >
    ₹50L - ₹1 Cr
  </button>

  <button
    className="btn btn-link text-start w-100 text-black fw-semibold pb-3 p-0 text-decoration-none"
    onClick={() => handleFilterClick({ ExpectedPrice: { min: 10000000 } })}
  >
    Above ₹1 Cr
  </button>
</div>

                <div className="col-md-4  menu-column">
  <h6><i className="fas fa-map-marker-alt me-2"></i>Popular City</h6>
  {[
    'Johannesburg',
    'Cape Town',
    'Durban',
    'Pretoria',
    'Soweto'
  ].map(city => (
    <button
      key={city}
      className="btn btn-link text-start w-100 text-black fw-semibold text-decoration-none"
      onClick={() => handleFilterClick({ city })}
    >
      {city}
    </button>
  ))}
</div>

                </div>
              </div>
            </li>
              {/* <li className="nav-item"><Link className="nav-link" to="#services">Services</Link></li> */}
              <li className="nav-item"><Link className="nav-link" to="/GuidlineSeller">Guidline-Seller</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contactus">Contact-us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/homeloan">Home-loan</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/AboutUs">About</Link></li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="login-btn py-2 rounded-3 fs-5 text-white px-5 me-2">Login</Link>
            </div>
            <div className="d-flex">
              <Link to="/post-property" className="login-btn py-2 rounded-3 fs-5 text-white px-3 me-2">Post Property</Link>
            </div>
            <Link to='/userprofile' className='ms-3' >
              <div className='img d-flex  flex-column align-items-center '>
                <img className='rounded-circle ' src="https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?ga=GA1.1.208091473.1733813303&semt=ais_hybrid&w=740"width="40px"height="40px" alt="" />
                 <h6 className='text-center'>User</h6>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
