// src/Pages/Home.js

import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../Assets/Css/style.css";
import "../Assets/Css/Testimonials.css";
import { useEffect } from "react";
import { MyContext } from "../../Context/context"; // Adjust path if necessary
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../Assets/Images/logo-removebg-preview.png";

const Home = () => {
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {
    // Removed createProperty, propertyTp, fetchPropertyType, loading, error, constructionP, fetchConstructionPhase
    getFilteredProperties, // Still needed for search filters
    getServiceTypes,
    getServiceScope,
    getCityName,
    cityName,
    getPropertyName,
    propertyName,
    testimonials,
    getTestimonials,
    loading,
    error,
  } = useContext(MyContext);

  const homeService = useRef(null);
  const postProperty = useRef(null); // Keep this ref for scrolling

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Removed useEffect for fetchPropertyType and fetchConstructionPhase, it's now in ListPropertyForm

  useEffect(() => {
    getCityName();
    getPropertyName();
    getTestimonials();
  }, []);

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fa-solid fa-star ${i <= rating ? 'rating-star-filled' : 'rating-star-empty'}`}></i>
      );
    }
    return <div className="rating-stars-container">{stars}</div>;
  };

  // Unified filter state structure
  const [filters, setFilters] = useState({
    Sell: {
      city: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
    },
    Rent: {
      city: "",
      propertyType: "",
      rentalPeriod: "",
      minRent: "",
      maxRent: "",
    },
    Commercial: {
      city: "",
      commercialType: "",
      transactionType: "",
      minPrice: "",
      maxPrice: "",
    },
    PG: {
      city: "",
      occupancy: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  // Removed Property listing state (formData, step, activeCategory, errors, isSubmitting, submitMessage, showSuccessPopup)

  // Service booking state (still in Home.js)
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedScopeId, setSelectedScopeId] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [services, setServices] = useState([]);
  const [serviceScope, setServiceScope] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData1, setFormData1] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    preferredDate: "",
    serviceDescription: "",
    propertySize: "",
    additionalOptions: [],
    frequency: "",
  });

  // Removed UI state (step, activeCategory, errors, isSubmitting, submitMessage, showSuccessPopup) - now in ListPropertyForm

  useEffect(() => {
    // AOS Init
    import("aos").then((AOS) => {
      AOS.init();
    });

    // Removed Property form steps UI logic

    // Mega Menu JS (keep this if relevant to Home component's header/nav)
    const buyLink = document.getElementById("buyLink");
    const megaMenu = document.getElementById("megaMenu");
    const buyMenuItem = buyLink?.parentElement;

    let menuCloseTimer;

    megaMenu?.addEventListener("mouseenter", () =>
      clearTimeout(menuCloseTimer)
    );
    megaMenu?.addEventListener("mouseleave", () => {
      menuCloseTimer = setTimeout(() => {
        megaMenu.style.display = "none";
        setTimeout(() => (megaMenu.style.display = ""), 50);
      }, 100);
    });

    buyMenuItem?.addEventListener("mouseenter", () =>
      clearTimeout(menuCloseTimer)
    );

    // Mobile touch support
    if ("ontouchstart" in window) {
      megaMenu?.addEventListener("touchstart", function (e) {
        megaMenu.classList.add("touch-hover");
        e.stopPropagation();
      });

      buyMenuItem?.addEventListener("touchstart", function (e) {
        buyMenuItem.classList.add("touch-hover");
        e.stopPropagation();
      });

      document.addEventListener("touchstart", function (e) {
        if (
          !e.target.closest(".nav-item.position-static") &&
          !e.target.closest(".mega-menu-wrapper")
        ) {
          buyMenuItem?.classList.remove("touch-hover");
          megaMenu?.classList.remove("touch-hover");
        }
      });
    }

    // Mobile toggle
    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 991.98) {
        // e.preventDefault(); // Commented out to prevent unintended link blocking
        // megaMenu?.classList.toggle("show");
      }
    });

    // Close on outside click (mobile)
    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 991.98) {
        if (
          !e.target.closest(".nav-item.position-static") &&
          !e.target.closest(".mega-menu-wrapper")
        ) {
          megaMenu?.classList.remove("show");
        }
      }
    });
  }, []); // This useEffect remains, but its internal logic is trimmed.

  // Removed Property listing handlers (handleChange, handleNumberChange, handleFileChange, validateStep, handleNext, handlePrev, handleCategoryChange, handleSubmit)

  // Helper function to get budget value from min/max prices (Still needed for search)
  const getBudgetValue = (min, max, category) => {
    if (category === "Sell") {
      if (min === 0 && max === 500000) return "under500";
      if (min === 500000 && max === 1000000) return "500to1M";
      if (min === 1000000 && max === 2000000) return "1Mto2M";
      if (min === 2000000 && max === "") return "2Mplus";
    } else if (category === "Rent") {
      if (min === 0 && max === 5000) return "under5000";
      if (min === 5000 && max === 10000) return "5000to10000";
      if (min === 10000 && max === 15000) return "10000to15000";
      if (min === 15000 && max === "") return "over15000";
    } else if (category === "Commercial") {
      if (min === 0 && max === 1000000) return "under1M";
      if (min === 1000000 && max === 5000000) return "1Mto5M";
      if (min === 5000000 && max === "") return "5Mplus";
    } else if (category === "PG") {
      if (min === 0 && max === 3000) return "under3K";
      if (min === 3000 && max === 5000) return "3Kto5K";
      if (min === 5000 && max === "") return "5Kplus";
    }
    return "";
  };

  // Filter handlers (Still needed for search)
  const handleFilterChange = (category, e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value,
      },
    }));
  };

  const handleSearch = (e, category) => {
    e.preventDefault();
    const categoryFilters = filters[category];
    const params = new URLSearchParams();

    // Common parameters
    if (categoryFilters.city) params.append("city", categoryFilters.city);

    // Category-specific parameters
    switch (category) {
      case "Sell":
        if (categoryFilters.propertyType)
          params.append("propertyType", categoryFilters.propertyType);
        if (categoryFilters.minPrice)
          params.append("minPrice", categoryFilters.minPrice);
        if (categoryFilters.maxPrice)
          params.append("maxPrice", categoryFilters.maxPrice);
        break;

      case "Rent":
        if (categoryFilters.propertyType)
          params.append("propertyType", categoryFilters.propertyType);
        if (categoryFilters.rentalPeriod)
          params.append("rentalPeriod", categoryFilters.rentalPeriod);
        if (categoryFilters.minRent)
          params.append("minRent", categoryFilters.minRent);
        if (categoryFilters.maxRent)
          params.append("maxRent", categoryFilters.maxRent);
        break;

      case "Commercial":
        if (categoryFilters.commercialType)
          params.append("commercialType", categoryFilters.commercialType);
        if (categoryFilters.transactionType)
          params.append("transactionType", categoryFilters.transactionType);
        if (categoryFilters.minPrice)
          params.append("minPrice", categoryFilters.minPrice);
        if (categoryFilters.maxPrice)
          params.append("maxPrice", categoryFilters.maxPrice);
        break;

      case "PG":
        if (categoryFilters.occupancy)
          params.append("occupancy", categoryFilters.occupancy);
        if (categoryFilters.minPrice)
          params.append("minPrice", categoryFilters.minPrice);
        if (categoryFilters.maxPrice)
          params.append("maxPrice", categoryFilters.maxPrice);
        break;
    }

    params.append("category", category);
    navigate(`/propertySearch?${params.toString()}`);
  };

  // Render filter form based on category (Still needed for search)
  const renderFilterForm = (category) => {
    const categoryFilters = filters[category];

    return (
      <form onSubmit={(e) => handleSearch(e, category)}>
        <div className="row g-3">
          {/* City Field (Common to all categories) */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">City</label>
            <select
              className="form-select shadow-none"
              name="city"
              value={categoryFilters.city}
              onChange={(e) => handleFilterChange(category, e)}
            >
              <option value="">Select City</option>
              {cityName.map((cities) => (
                <option key={cities.id} value={cities.id}>
                  {cities.city}
                </option>
              ))}
            </select>
          </div>

          {/* Sell Tab */}
          {category === "Sell" && (
            <>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Property Type</label>
                <select
                  className="form-select shadow-none"
                  name="propertyType"
                  value={categoryFilters.propertyType}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">Select Property Type</option>
                  {propertyName.map((properties) => (
                    <option key={properties.id} value={properties.id}>
                      {properties.propertyType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Budget</label>
                <select
                  className="form-select shadow-none"
                  name="budgetRange"
                  value={getBudgetValue(
                    categoryFilters.minPrice,
                    categoryFilters.maxPrice,
                    category
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    let minPrice = "";
                    let maxPrice = "";

                    if (value === "under500") {
                      minPrice = 0;
                      maxPrice = 500000;
                    } else if (value === "500to1M") {
                      minPrice = 500000;
                      maxPrice = 1000000;
                    } else if (value === "1Mto2M") {
                      minPrice = 1000000;
                      maxPrice = 2000000;
                    } else if (value === "2Mplus") {
                      minPrice = 2000000;
                      maxPrice = "";
                    }

                    setFilters((prev) => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        minPrice,
                        maxPrice,
                      },
                    }));
                  }}
                >
                  <option value="">Any Budget</option>
                  <option value="under500">Under R500,000</option>
                  <option value="500to1M">R500,000 - R1,000,000</option>
                  <option value="1Mto2M">R1,000,000 - R2,000,000</option>
                  <option value="2Mplus">R2,000,000+</option>
                </select>
              </div>
            </>
          )}

          {/* Rent Tab (Updated with Rental Period and Monthly Rent) */}
          {category === "Rent" && (
            <>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Property Type</label>
                <select
                  className="form-select shadow-none"
                  name="propertyType"
                  value={categoryFilters.propertyType}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">Select Property Type</option>
                  {propertyName.map((properties) => (
                    <option key={properties.id} value={properties.id}>
                      {properties.propertyType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Rental Period</label>
                <select
                  className="form-select shadow-none"
                  name="rentalPeriod"
                  value={categoryFilters.rentalPeriod}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">Any Period</option>
                  <option value="Short Term">Short Term (1-30 days)</option>
                  <option value="Medium Term">Medium Term (1-6 months)</option>
                  <option value="Long Term">Long Term (1-3 years)</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Monthly Rent</label>
                <select
                  className="form-select shadow-none"
                  name="rentRange"
                  value={getBudgetValue(
                    categoryFilters.minRent,
                    categoryFilters.maxRent,
                    category
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    let minRent = "";
                    let maxRent = "";

                    if (value === "under5000") {
                      minRent = 0;
                      maxRent = 5000;
                    } else if (value === "5000to10000") {
                      minRent = 5000;
                      maxRent = 10000;
                    } else if (value === "10000to15000") {
                      minRent = 10000;
                      maxRent = 15000;
                    } else if (value === "over15000") {
                      minRent = 15000;
                      maxRent = "";
                    }

                    setFilters((prev) => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        minRent,
                        maxRent,
                      },
                    }));
                  }}
                >
                  <option value="">Any Amount</option>
                  <option value="under5000">Under R5,000</option>
                  <option value="5000to10000">R5,000 - R10,000</option>
                  <option value="10000to15000">R10,000 - R15,000</option>
                  <option value="over15000">R15,000+</option>
                </select>
              </div>
            </>
          )}

          {/* Commercial Tab */}
          {category === "Commercial" && (
            <>
              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Commercial Type
                </label>
                <select
                  className="form-select shadow-none"
                  name="commercialType"
                  value={categoryFilters.commercialType}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">All Types</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Retail">Retail</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">For</label>
                <select
                  className="form-select shadow-none"
                  name="transactionType"
                  value={categoryFilters.transactionType}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">Buy or Rent</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Budget</label>
                <select
                  className="form-select shadow-none"
                  name="budgetRange"
                  value={getBudgetValue(
                    categoryFilters.minPrice,
                    categoryFilters.maxPrice,
                    category
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    let minPrice = "";
                    let maxPrice = "";

                    if (value === "under1M") {
                      minPrice = 0;
                      maxPrice = 1000000;
                    } else if (value === "1Mto5M") {
                      minPrice = 1000000;
                      maxPrice = 5000000;
                    } else if (value === "5Mplus") {
                      minPrice = 5000000;
                      maxPrice = "";
                    }

                    setFilters((prev) => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        minPrice,
                        maxPrice,
                      },
                    }));
                  }}
                >
                  <option value="">Any Budget</option>
                  <option value="under1M">Under R1,000,000</option>
                  <option value="1Mto5M">R1,000,000 - R5,000,000</option>
                  <option value="5Mplus">R5,000,000+</option>
                </select>
              </div>
            </>
          )}

          {/* PG Tab */}
          {category === "PG" && (
            <>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Occupancy</label>
                <select
                  className="form-select shadow-none"
                  name="occupancy"
                  value={categoryFilters.occupancy}
                  onChange={(e) => handleFilterChange(category, e)}
                >
                  <option value="">Any</option>
                  <option value="Single">Single</option>
                  <option value="Shared (2 Person)">Shared (2 Person)</option>
                  <option value="Shared (3+ Person)">Shared (3+ Person)</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Monthly Budget</label>
                <select
                  className="form-select shadow-none"
                  name="budgetRange"
                  value={getBudgetValue(
                    categoryFilters.minPrice,
                    categoryFilters.maxPrice,
                    category
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    let minPrice = "";
                    let maxPrice = "";

                    if (value === "under3K") {
                      minPrice = 0;
                      maxPrice = 3000;
                    } else if (value === "3Kto5K") {
                      minPrice = 3000;
                      maxPrice = 5000;
                    } else if (value === "5Kplus") {
                      minPrice = 5000;
                      maxPrice = "";
                    }

                    setFilters((prev) => ({
                      ...prev,
                      [category]: {
                        ...prev[category],
                        minPrice,
                        maxPrice,
                      },
                    }));
                  }}
                >
                  <option value="">Any Budget</option>
                  <option value="under3K">Under R3,000</option>
                  <option value="3Kto5K">R3,000 - R5,000</option>
                  <option value="5Kplus">R5,000+</option>
                </select>
              </div>
            </>
          )}

          <div className="col-12 text-end">
            <button type="submit" className="btn bg-theme">
              Search{" "}
              {category === "PG"
                ? "PG Accommodation"
                : category + " Properties"}
            </button>
          </div>
        </div>
      </form>
    );
  };

  // Service booking handlers (Still in Home.js)
  const handleChange2 = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData1((prev) => ({
        ...prev,
        additionalOptions: checked
          ? [...prev.additionalOptions, id]
          : prev.additionalOptions.filter((opt) => opt !== id),
      }));
    } else if (type === "radio") {
      setFormData1((prev) => ({ ...prev, frequency: id }));
    } else {
      setFormData1((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Calculate estimate (Still in Home.js)
  const calculateEstimate = async () => {
    if (!selectedServiceId || !selectedScopeId) {
      toast.warn("Please select service type and scope");
      return;
    }

    try {
      const [svcPrice, scopePrice] = await Promise.all([
        axios.get(`${URL}/property/getServicePrice/${selectedServiceId}`),
        axios.get(`${URL}/property/getScopePrice/${selectedScopeId}`),
      ]);

      const total = (svcPrice.data?.price || 0) + (scopePrice.data?.price || 0);
      setEstimatedTotal(total);
      setShowConfirmModal(true);
    } catch (error) {
      toast.error("Failed to calculate estimate");
    }
  };

  // Send booking - FIXED VERSION (Still in Home.js)
  const bookNow = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ServiceId: selectedServiceId,
        ServiceScopeId: selectedScopeId,
        name: formData1.fullName,
        email: formData1.email,
        Phone: formData1.phoneNumber,
        Address: formData1.address,
        date: formData1.preferredDate,
        Description: formData1.serviceDescription,
        PropertySize: formData1.propertySize,
        AdditionalOptions: formData1.additionalOptions,
        ServiceFrequency: formData1.frequency,
      };

      const res = await axios.post(`${URL}/property/bookService`, payload, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success("Service booked successfully!");
        setShowConfirmModal(false);
        // Reset form
        setFormData1({
          fullName: "",
          email: "",
          phoneNumber: "",
          address: "",
          preferredDate: "",
          serviceDescription: "",
          propertySize: "",
          additionalOptions: [],
          frequency: "",
        });
        setSelectedServiceId("");
        setSelectedScopeId("");
        setEstimatedTotal(0);
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Booking failed. Please try again.";
      toast.error(errorMessage);
      console.error("Booking error:", error.response?.data || error);
    }
  };

  // Fetch services on mount (Still in Home.js)
  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServiceTypes();
      if (res.success) {
        setServices(res.details);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchScopes = async () => {
      const res = await getServiceScope();
      if (res.success) setServiceScope(res.details);
    };
    fetchScopes();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-section overflow-hidden"
        data-aos="fade-down-left"
        data-aos-duration="3000"
      >
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-4">
                Find Your Dream <br /> Property
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container search-container">
        <div className="card border border-primary border-2 search-box">
          <div className="card-body py-2 p-0">
            {/* Search Tabs */}
            <ul
              className="nav nav-tabs gap-2 search-tabs"
              id="searchTabs"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="buy-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#buy-tab-pane"
                  type="button"
                >
                  Sell
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="rent-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#rent-tab-pane"
                  type="button"
                >
                  Rent
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="commercial-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#commercial-tab-pane"
                  type="button"
                >
                  Commercial
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pg-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#pg-tab-pane"
                  type="button"
                >
                  PG
                </button>
              </li>
            </ul>

            {/* Search Form */}
            <div className="tab-content p-4" id="searchTabContent">
              <div
                className="tab-pane fade show active"
                id="buy-tab-pane"
                role="tabpanel"
                aria-labelledby="buy-tab"
              >
                {renderFilterForm("Sell")}
              </div>

              <div
                className="tab-pane fade"
                id="rent-tab-pane"
                role="tabpanel"
                aria-labelledby="rent-tab"
              >
                {renderFilterForm("Rent")}
              </div>

              <div
                className="tab-pane fade"
                id="commercial-tab-pane"
                role="tabpanel"
                aria-labelledby="commercial-tab"
              >
                {renderFilterForm("Commercial")}
              </div>

              <div
                className="tab-pane fade"
                id="pg-tab-pane"
                role="tabpanel"
                aria-labelledby="pg-tab"
              >
                {renderFilterForm("PG")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Quick Links Section --> */}

      <section className="container py-5" id="services">
        <h2 className="text-center mb-4 text-info fs-1 fw-semibold">
          Quick Links
        </h2>
        <div className="row">
          {/* Home Services Card */}
          <div
            className="col-md-4 col-lg-3 mb-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-tools text-primary"></i>
                </div>
                <h5 className="card-title">Home Services</h5>
                <p className="card-text">Maintenance & repair services</p>
                <Link
                  onClick={() => scrollToSection(homeService)}
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Find Services
                </Link>
              </div>
            </div>
          </div>

          {/* Rent Agreement Card */}
          <div
            className="col-md-4 col-lg-3 mb-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-file-contract text-primary"></i>
                </div>
                <h5 className="card-title">Rent Agreement</h5>
                <p className="card-text">Create legal rental agreements</p>
                <Link
                  to="/rentAgreement"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Create Agreement
                </Link>
              </div>
            </div>
          </div>

          {/* Packers & Movers Card */}
          <div
            className="col-md-4 col-lg-3 mb-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3 ">
                  <i className="fas fa-truck text-primary"></i>
                </div>
                <h5 className="card-title">Packers & Movers</h5>
                <p className="card-text">Reliable moving services</p>
                <Link
                  to="/packermoverservices"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Book Service
                </Link>
              </div>
            </div>
          </div>

          {/* Post Property Card */}
          <div
            className="col-md-4 col-lg-3 mb-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100 border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-home text-primary"></i>
                </div>
                <h5 className="card-title">Post Property</h5>
                <p className="card-text">List your property for sale or rent</p>
                <Link
                  onClick={() => scrollToSection(postProperty)}
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Post Now
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Services Card */}
          <div
            className="col-md-4 col-lg-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-balance-scale text-primary"></i>
                </div>
                <h5 className="card-title">Legal Services</h5>
                <p className="card-text">Property legal assistance</p>
                <Link
                  to="/legalservices"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Get Help
                </Link>
              </div>
            </div>
          </div>

          {/* Bond Originators Card */}
          <div
            className="col-md-4 col-lg-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-landmark text-primary"></i>
                </div>
                <h5 className="card-title">Bond Originators</h5>
                <p className="card-text">Home loan assistance</p>
                <Link
                  to="/bondOrientation"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Insurers Card */}
          <div
            className="col-md-4 col-lg-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-shield-alt text-primary"></i>
                </div>
                <h5 className="card-title">Insurance</h5>
                <p className="card-text">Property & contents insurance</p>
                <Link
                  to="/propertyInsurence"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>

          {/* AI Matches Card */}
          <div
            className="col-md-4 col-lg-3"
            data-aos="fade-down-left"
            data-aos-duration="3000"
          >
            <div className="card h-100  border border-primary border-1 quick-links-card shadow">
              <div className="card-body text-center py-4">
                <div className="quick-links-icon mb-3">
                  <i className="fas fa-robot text-primary"></i>
                </div>
                <h5 className="card-title">AI Matches</h5>
                <p className="card-text">
                  Get personalized property suggestions
                </p>
                <Link
                  to="/Ai-match-property"
                  className="btn btn-outline-primary bg-theme mt-2"
                >
                  Find Matches
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- vedio-section --> */}
      <div
        className="container-fliud position-relative overflow-hidden p-0"
        style={{ height: "700px" }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3410663/3410663-uhd_2562_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="position-relative z-1 text-white d-flex flex-column justify-content-center align-items-center h-100">
          <div className="">
            <h1 className="display-2 fw-semibold">Welcome</h1>
            <p className="ps-4"> South Africa -&gt; $2,50,000</p>
          </div>
        </div>

        {/* Optional: Semi-transparent overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
      </div>

      {/* <!-- Featured Properties Section --> */}

      <section
        className="py-5 bg-white"
        data-aos="zoom-out-right"
        data-aos-duration="3000"
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold">Featured Properties</h2>
              <p className="text-muted">
                Handpicked properties across South Africa
              </p>
            </div>
          </div>
          <div className="row g-4">
            {/* Property Card 1 */}
            <div className="col-md-4">
              <Link to="/propertySearch" className="card property-card shadow">
                <div className="property-image">
                  <img
                    src="https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?"
                    className="img-fluid"
                    alt="Property"
                  />
                  <span className="property-tag">For Sale</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Modern Family Home</h5>
                  <div className="property-price mb-2">R2,500,000</div>
                  <div className="property-address mb-3">
                    <i className="bi bi-geo-alt"></i> Sandton, Johannesburg
                  </div>
                  <div className="property-features d-flex justify-content-between border-top pt-3">
                    <span>
                      <i className="bi bi-door-closed"></i> 3 Bed
                    </span>
                    <span>
                      <i className="bi bi-droplet"></i> 2 Bath
                    </span>
                    <span>
                      <i className="bi bi-square"></i> 240 m²
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {/* Property Card 2 */}
            <div className="col-md-4">
              <Link to="/propertySearch" className="card property-card shadow">
                <div className="property-image">
                  <img
                    src="https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg?"
                    className="img-fluid"
                    alt="Property"
                  />
                  <span className="property-tag">For Rent</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Luxury Apartment</h5>
                  <div className="property-price mb-2">R15,000/month</div>
                  <div className="property-address mb-3">
                    <i className="bi bi-geo-alt"></i> Sea Point, Cape Town
                  </div>
                  <div className="property-features d-flex justify-content-between border-top pt-3">
                    <span>
                      <i className="bi bi-door-closed"></i> 2 Bed
                    </span>
                    <span>
                      <i className="bi bi-droplet"></i> 2 Bath
                    </span>
                    <span>
                      <i className="bi bi-square"></i> 120 m²
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            {/* Property Card 3 */}
            <div className="col-md-4">
              <Link to="/propertySearch" className="card property-card shadow">
                <div className="property-image">
                  <img
                    src="https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2400/200"
                    className="img-fluid"
                    alt="Property"
                  />
                  <span className="property-tag">Commercial</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Office Space</h5>
                  <div className="property-price mb-2">R22,000/month</div>
                  <div className="property-address mb-3">
                    <i className="bi bi-geo-alt"></i> Umhlanga, Durban
                  </div>
                  <div className="property-features d-flex justify-content-between border-top pt-3">
                    <span>
                      <i className="bi bi-building"></i> Open Plan
                    </span>
                    <span>
                      <i className="bi bi-square"></i> 200 m²
                    </span>
                    <span>
                      <i className="bi bi-p-square"></i> Parking
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/propertySearch" className="btn btn-outline-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* <!-- find properties section --> */}

      <div className="container-fluid bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center m-4" id="h2txt">
                Find Your Property in{" "}
                <span className="">
                  {" "}
                  Your <br /> Preferred City
                </span>
              </h2>
              <div className="grid-card">
                <Link
                  to="/propertySearch?city=Cape%20Town"
                  className="card border-0 shadow text-decoration-none text-dark"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://img.freepik.com/free-photo/park-city_1127-4099.jpg?t=st=1747024134~exp=1747027734~hmac=abdc7ea649dc2f833badf3c9e56d69ca438d62be7c6d857be5a7c14b759c7cc6&w=996"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Cape Town</h5>
                  </div>
                </Link>

                <Link
                  to="/propertySearch?city=Johannesburg"
                  className="card border-0 shadow text-decoration-none text-dark"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://img.freepik.com/free-photo/aerial-view-beautiful-village-surrounded-by-nature_1268-15592.jpg?t=st=1747025234~exp=1747028834~hmac=3adc5b92a9291ac5a14906435e5f41f069425f8a0a4a9fa3a3725a78747f7624&w=1380"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Johannesburg</h5>
                  </div>
                </Link>

                <Link
                  to="/propertySearch?city=Durban"
                  className="card border-0 shadow text-decoration-none text-dark"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://img.freepik.com/free-photo/view-from-rooftop-china-town-middle-city-bangkok-thailand_231208-1546.jpg?t=st=1747025345~exp=1747028945~hmac=fa3a241d64f6aa6dbf42b329db77a5598d56ed1ee203958347a2c11d5ec61ef2&w=996"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Durban</h5>
                  </div>
                </Link>

                <Link
                  to="/propertySearch?city=Pretoria"
                  className="card border-0 shadow text-decoration-none text-dark"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src="https://img.freepik.com/free-photo/high-angle-shot-exotic-wild-plants-growing-rocks-tatacoa-desert-colombia_181624-17308.jpg?t=st=1747025462~exp=1747029062~hmac=fbaa474d658ccce8c7b405480437d509fd2a2d2e0b27640ad9606a681c6832de&w=996"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Pretoria</h5>
                  </div>
                </Link>
              </div>
              {/* --------------End the city section --------------------------------------- */}

              <div className="d-flex justify-content-center my-5">
                {/* <button
                  type="button"
                  className="rounded-pill bg-theme py-3 px-5 border border-info"
                >
                  View more cities
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Home Services Section -->  */}
      {/* is now completed */}
      <section
        ref={homeService}
        className="container-fluid home-services-big-image py-5"
        id="ServicesSection"
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h1 className="fw-bold pb-2" style={{ color: "white" }}>
                Home Services
              </h1>
              <h3 className="text-white fw-semibold ">
                Professional services for your home needs
              </h3>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-droplet"></i>
                    </div>
                    <h5>Plumbing</h5>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-lightning"></i>
                    </div>
                    <h5>Electrical</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-brush"></i>
                    </div>
                    <h5>Painting</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="fa-solid fa-broom"></i>
                    </div>
                    <h5>Cleaning</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-fan"></i>
                    </div>
                    <h5>AC Services</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-bug"></i>
                    </div>
                    <h5>Pest Control</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-hammer"></i>
                    </div>
                    <h5>Carpentry</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <Link data-bs-toggle="modal" data-bs-target="#ServicesModal">
                <div className="card service-card text-center p-3">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div className="service-icon">
                      <i className="bi bi-tree"></i>
                    </div>
                    <h5>Gardening</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary mt-4 px-5 py-3 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#ServicesModal"
            >
              Book a Service
            </button>
          </div>
        </div>
      </section>
      {/* ////////////////  Modal Home Services  ///////////////// */}
      <div className="modal fade" id="ServicesModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-blue">Request a Service</h3>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Service Type</label>
                  <select
                    className="form-select"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {services?.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.servicetype}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Service Scope
                  </label>
                  <select
                    className="form-select"
                    value={selectedScopeId}
                    onChange={(e) => setSelectedScopeId(e.target.value)}
                  >
                    <option value="">Select a scope</option>
                    {serviceScope?.map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.ServiceScope}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <input
                    id="fullName"
                    placeholder="Full Name"
                    className="form-control"
                    value={formData1.fullName}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={formData1.email}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="form-control"
                    value={formData1.phoneNumber}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    id="address"
                    placeholder="Address"
                    className="form-control"
                    rows="2"
                    value={formData1.address}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="preferredDate"
                    type="date"
                    className="form-control"
                    value={formData1.preferredDate}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="propertySize"
                    placeholder="Property Size (sq ft)"
                    className="form-control"
                    value={formData1.propertySize}
                    onChange={handleChange2}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    id="serviceDescription"
                    placeholder="Service Description"
                    className="form-control"
                    rows="3"
                    value={formData1.serviceDescription}
                    onChange={handleChange2}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Additional Options
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    {["deepCleaning", "windowCleaning", "carpetCleaning"].map(
                      (opt) => (
                        <div className="form-check" key={opt}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={opt}
                            checked={formData1.additionalOptions.includes(opt)}
                            onChange={handleChange2}
                          />
                          <label
                            className="form-check-label text-capitalize"
                            htmlFor={opt}
                          >
                            {opt.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Service Frequency
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    {["oneTime", "weekly", "monthly"].map((freq) => (
                      <div className="form-check" key={freq}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="frequency"
                          id={freq}
                          checked={formData1.frequency === freq}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label text-capitalize"
                          htmlFor={freq}
                        >
                          {freq === "oneTime" ? "One Time" : freq}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 d-grid">
                  <button
                    className="btn btn-primary py-2"
                    onClick={calculateEstimate}
                  >
                    Check Estimate & Book
                  </button>
                </div>
              </div>

              {estimatedTotal > 0 && (
                <div className="mt-3 p-3 bg-light rounded d-flex justify-content-between">
                  <strong>Estimated Total:</strong>
                  <span className="fw-bold">₹{estimatedTotal}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Booking</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Your estimated price is <strong>₹{estimatedTotal}</strong>
                </p>
                <p className="mt-3">Confirm booking for:</p>
                <ul className="mb-0">
                  <li>
                    <strong>Name:</strong> {formData1.fullName}
                  </li>
                  <li>
                    <strong>Date:</strong>{" "}
                    {formData1.preferredDate || "Not specified"}
                  </li>
                  <li>
                    <strong>Frequency:</strong>{" "}
                    {formData1.frequency
                      ? formData1.frequency === "oneTime"
                        ? "One Time"
                        : formData1.frequency
                      : "Not specified"}
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={bookNow}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal Home Services end */}

      {/* <!-- request service modal end --> */}

      {/* <!-- todo --> */}
      <div className="container my-5 bg-light">
        <div className="row">
          <div className="col-md-5 d-flex flex-column justify-content-center">
            <h1 className="text-blue display-2 fw-bold ms-5">
              <img src={logo} height="200" alt="" />
            </h1>
            <p>
              Your journey to the perfect home starts here with Tudr. Explore
              thousands of verified properties across South Africa, tailored to
              fit your needs and budget. Whether you’re renting your first
              apartment or buying your dream house, Tudr is here to make
              property simple, safe, and stress-free.
            </p>
          </div>
          <div className="col-md-7">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="rounded-4"
                    src="https://cdn.pixabay.com/photo/2016/07/13/20/42/architecture-1515450_1280.jpg"
                    width="100%"
                    height="500px"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="rounded-4"
                    src="https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg"
                    width="100%"
                    height="500px"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="rounded-4"
                    src="https://cdn.pixabay.com/photo/2020/03/16/19/26/architecture-4938096_1280.jpg"
                    width="100%"
                    height="500px"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* this part is done and don't changes this */}

   
{/* ---------  Testimonials Section -------------  */}
 <section className="testimonial-section-container py-5">
      <h2 className="testimonial-main-header text-center mb-5">What Our Clients Say</h2>
      {loading && <p className="text-center">Loading testimonials...</p>}
      {error && <p className="text-center text-danger">Error: {error}</p>}

      {!loading && !error && testimonials.length > 0 && (
        <div id="testimonialSliderUnique" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="d-flex justify-content-center">
                  <div className="col-10 col-md-8">
                    <div className="testimonial-card-custom">
                      <img
                        src={testimonial.image || "https://via.placeholder.com/90"}
                        alt={testimonial.name}
                        className="testimonial-user-image"
                      />
                      <div className="testimonial-content">
                        <h5 className="testimonial-user-name mb-1">{testimonial.name}</h5>
                        <p className="testimonial-user-location text-muted">{testimonial.location}</p>
                        <blockquote className="testimonial-quote my-4">
                          "{testimonial.quote}"
                        </blockquote>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev testimonial-nav-button"
            type="button"
            data-bs-target="#testimonialSliderUnique"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon testimonial-nav-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next testimonial-nav-button"
            type="button"
            data-bs-target="#testimonialSliderUnique"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon testimonial-nav-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </section>
{/* ---------  Testimonials Section END -------------  */}


      {/* The remaining modals (ServicesModal, PriceEstimate) are still in Home.js */}
      <div
        className="modal modal-lg fade"
        id="ServicesModal"
        tabIndex="-1"
        aria-labelledby="ServicesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="form-service-heading text-blue">
                Request a Service
              </h3>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="text-center mb-2"></div>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="serviceType"
                        className="form-label fw-semibold"
                      >
                        Service Type
                      </label>
                      <select
                        className="form-select shadow-none border border-info form-service-select"
                        id="serviceType"
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                      >
                        <option value="">Select a service</option>
                        {services?.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.servicetype}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control py-2 border border-info shadow-none form-service-fullname"
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData1.fullName}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control py-2 border border-info shadow-none form-service-email"
                        id="email" // Changed id to 'email' to match formData1
                        placeholder="Enter your email"
                        value={formData1.email}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="tel"
                        className="form-control py-2 border border-info shadow-none form-service-phone"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData1.phoneNumber}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="mb-4">
                      <textarea
                        className="form-control py-2 border border-info shadow-none form-service-address"
                        id="address"
                        rows="3"
                        placeholder="Enter your address"
                        value={formData1.address}
                        onChange={handleChange2}
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="preferredDate"
                        className="form-label fw-semibold"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="form-control py-2 border border-info shadow-none form-service-date"
                        id="preferredDate"
                        value={formData1.preferredDate}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="serviceDescription"
                        className="form-label fw-semibold"
                      >
                        Service Description
                      </label>
                      <textarea
                        className="form-control py-2 border border-info shadow-none form-service-description"
                        id="serviceDescription"
                        rows="5"
                        placeholder="Describe your service needs"
                        value={formData1.serviceDescription}
                        onChange={handleChange2}
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary shadow-none form-service-submit w-100"
                        onClick={calculateEstimate} 
                        data-bs-toggle="modal"
                        data-bs-target="#PriceEstimate" 
                      >
                        View Pricing
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-lg fade"
        id="PriceEstimate"
        tabIndex="-1"
        aria-labelledby="PriceEstimateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-back shadow-none border-0 bg-white"
                data-bs-toggle="modal"
                data-bs-target="#ServicesModal"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <h4 className="text-center mb-2 fw-bold text-blue">
                      Get a Price Estimate
                    </h4>

                    <div className="mb-3">
                      <label
                        htmlFor="serviceScope"
                        className="form-label fw-semibold"
                      >
                        Service Scope
                      </label>
                      <select
                        className="form-select shadow-none"
                        id="serviceScope"
                        value={selectedScopeId}
                        onChange={(e) => setSelectedScopeId(e.target.value)}
                      >
                        <option value="">Select scope</option>
                        {serviceScope?.map((sc) => (
                          <option key={sc.id} value={sc.id}>
                            {sc.ServiceScope}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="propertySize"
                        className="form-label fw-semibold"
                      >
                        Property Size (sq ft)
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="propertySize"
                        placeholder="Enter property size"
                        value={formData1.propertySize}
                        onChange={handleChange2}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Additional Options
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input shadow-none"
                          type="checkbox"
                          id="deepCleaning"
                          checked={formData1.additionalOptions.includes(
                            "deepCleaning"
                          )}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deepCleaning"
                        >
                          Deep Cleaning
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input shadow-none"
                          type="checkbox"
                          id="windowCleaning"
                          checked={formData1.additionalOptions.includes(
                            "windowCleaning"
                          )}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="windowCleaning"
                        >
                          Window Cleaning
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input shadow-none"
                          type="checkbox"
                          id="carpetCleaning"
                          checked={formData1.additionalOptions.includes(
                            "carpetCleaning"
                          )}
                          onChange={handleChange2}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="carpetCleaning"
                        >
                          Carpet Cleaning
                        </label>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Service Frequency
                      </label>
                      <div className="d-flex flex-wrap gap-3">
                        {["oneTime", "weekly", "monthly"].map((freq) => (
                          <div className="form-check" key={freq}>
                            <input
                              className="form-check-input shadow-none"
                              type="radio"
                              name="frequency"
                              id={freq}
                              checked={formData1.frequency === freq}
                              onChange={handleChange2}
                            />
                            <label
                              className="form-check-label text-capitalize"
                              htmlFor={freq}
                            >
                              {freq === "oneTime" ? "One Time" : freq}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-light rounded-3 mb-3 d-flex justify-content-between">
                      <strong>Estimated Total:</strong>
                      <span className="text-primary fw-bold">
                        ₹{estimatedTotal}
                      </span>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary fw-semibold shadow-none"
                        type="button"
                        onClick={bookNow}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;