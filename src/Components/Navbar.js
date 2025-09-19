import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

import logo from "../Components/Assets/Images/logo-removebg-preview.png";
import { MyContext } from "../Context/context";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 👇 Get user object from context
  const { user, logout, isLoggedIn } = useContext(MyContext);

  // Navigate to home page after successful login
  useEffect(() => {
    if (user && isLoggedIn) {
      // Check if we're not already on the home page to avoid unnecessary navigation
      if (window.location.pathname !== '/' && window.location.pathname !== '/home') {
        navigate('/');
      }
    }
  }, [user, isLoggedIn, navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
    // Navigate to home page after logout
    navigate('/');
  };

  const handleFilterClick = (filterObj) => {
    const params = new URLSearchParams();

    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        Object.entries(value).forEach(([subKey, subVal]) => {
          if (subVal != null) {
            params.set(
              subKey === "under"
                ? "maxPrice"
                : subKey === "min"
                ? "minPrice"
                : subKey === "max"
                ? "maxPrice"
                : subKey,
              subVal
            );
          }
        });
      } else if (value != null) {
        params.set(key, value);
      }
    });

    navigate(`/propertySearch?${params.toString()}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.position-relative')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand text-gray" to="/">
            <img src={logo} height="65px" alt="Company Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-3">
              <li className="nav-item active">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item position-static">
                <button className="nav-link btn btn-link pt-2 " id="buyLink">
                  Buy
                </button>
                <div className="mega-menu-wrapper" id="megaMenu">
                  <div className="row">
                    <div className="col-md-4 menu-column">
                      <h6>
                        <i className="fas fa-home me-2"></i>Property Types
                      </h6>
                      {[
                        { label: "Plot", propertyType: "Plot" },
                        {
                          label: "Builder Floor",
                          propertyType: "Builder Floor",
                        },
                        { label: "Villa", propertyType: "Villa" },
                        {
                          label: "Independent House",
                          propertyType: "Independent House",
                        },
                        { label: "Apartment", propertyType: "Apartment" },
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

                    <div className="col-md-4 menu-column">
                      <h6 className="pb-3">Budget</h6>

                      <button
                        className="btn btn-link text-start w-100 text-black pb-3 p-0 fw-semibold text-decoration-none"
                        onClick={() =>
                          handleFilterClick({
                            ExpectedPrice: { under: 5000000 },
                          })
                        }
                      >
                        Under ₹50 Lakh
                      </button>

                      <button
                        className="btn btn-link text-start w-100 text-black pb-3 p-0 fw-semibold text-decoration-none"
                        onClick={() =>
                          handleFilterClick({
                            ExpectedPrice: { min: 5000000, max: 10000000 },
                          })
                        }
                      >
                        ₹50L - ₹1 Cr
                      </button>

                      <button
                        className="btn btn-link text-start w-100 text-black fw-semibold pb-3 p-0 text-decoration-none"
                        onClick={() =>
                          handleFilterClick({
                            ExpectedPrice: { min: 10000000 },
                          })
                        }
                      >
                        Above ₹1 Cr
                      </button>
                    </div>

                    <div className="col-md-4 menu-column">
                      <h6>
                        <i className="fas fa-map-marker-alt me-2"></i>Popular
                        City
                      </h6>
                      {[
                        "Johannesburg",
                        "Cape Town",
                        "Durban",
                        "Pretoria",
                        "Soweto",
                      ].map((city) => (
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

              <li className="nav-item">
                <Link className="nav-link" to="/guidlineseller">
                  Guidline-Seller
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact-us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/homeloan">
                  Home-loan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About
                </Link>
              </li>
            </ul>

            {/* ✅ Show Login button only if user is NOT logged in */}
            {!user && (
              <div className="d-flex">
                <Link
                  to="/signup"
                  className="login-btn py-2 rounded-3 fs-5 text-white px-5 me-2"
                >
                  Login
                </Link>
              </div>
            )}

            <div className="d-flex">
              <Link
                to="/list-package"
                className="login-btn py-2 rounded-3 fs-5 text-white px-3 me-2"
              >
                Post Property
              </Link>
            </div>

            {/* ✅ Show user profile dropdown only if user is logged in */}
            {user && (
              <div className="ms-3 position-relative">
                <div
                  className="img d-flex flex-column align-items-center cursor-pointer"
                  onClick={toggleDropdown}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="rounded-circle"
                    src={user.profileImage || "https://img.freepik.com/free-photo/handsome-bearded-businessman-rubbing-hands-having-deal_176420-18778.jpg?ga=GA1.1.208091473.1733813303&semt=ais_hybrid&w=740"}
                    width="40px"
                    height="40px"
                    alt="User Profile"
                  />
                  <h6 className="text-center">{user.name || "User"}</h6>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="position-absolute bg-white border rounded shadow-sm"
                    style={{
                      top: "100%",
                      right: "0",
                      minWidth: "160px",
                      zIndex: 1000,
                    }}
                  >
                    <div className="py-1">
                      <Link
                        to="/userprofile"
                        className="dropdown-item d-flex align-items-center px-3 py-2 text-decoration-none text-dark"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{
                          transition: "background-color 0.15s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f8f9fa")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <i
                          className="fas fa-user me-2"
                          style={{ width: "16px" }}
                        ></i>
                        View Profile
                      </Link>

                      <button
                        className="dropdown-item d-flex align-items-center px-3 py-2 w-100 border-0 bg-transparent text-dark"
                        onClick={handleSignOut}
                        style={{
                          transition: "background-color 0.15s ease-in-out",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#f8f9fa")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <i
                          className="fas fa-sign-out-alt me-2"
                          style={{ width: "16px" }}
                        ></i>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;