import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Make sure Bootstrap is imported first
import 'bootstrap/dist/css/bootstrap.min.css';
// Then your custom CSS
import "../Assets/Css/listPackages.css";

const PricingPackages = () => {
  const URL = process.env.REACT_APP_API_URL;
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/list-packages/packages-getAll`);
      
      if (response.data.success) {
        setPackages(response.data.data);
        console.log('Fetched packages:', response.data);
      } else {
        setError('Failed to fetch packages');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching packages');
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  // Icon component for better organization
  const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="pricing-check-icon">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  // Custom loading spinner icon
  const LoadingSpinner = () => (
    <div className="pricing-loader-spinner"></div>
  );

  // Custom retry icon
  const RetryIcon = () => (
    <span className="pricing-icon-rotate me-2">🔄</span>
  );

  if (loading) {
    return (
      <div className="container-fluid py-5 pricing-loading-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="d-flex flex-column align-items-center">
                <LoadingSpinner />
                <p className="h5 text-muted mt-3">
                  <span className="me-2">📦</span>
                  Loading packages...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5 mt-5 pricing-error-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-danger">
                <div className="card-body text-center p-5">
                  <div className="pricing-error-icon mb-3">⚠️</div>
                  <h3 className="card-title text-danger mb-3">
                    <span className="me-2">🚨</span>
                    Something went wrong
                  </h3>
                  <p className="card-text text-muted mb-4">
                    <span className="me-2">💬</span>
                    {error}
                  </p>
                  <button 
                    className="btn btn-danger px-4"
                    onClick={fetchPackages}
                  >
                    <RetryIcon />
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5 pricing-container-wrapper">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold text-dark mb-3 pricing-header-title">
              <span className="me-3 pricing-icon-bounce">🎯</span>
              Choose Your Perfect Plan
              <span className="ms-3 pricing-icon-bounce">🎯</span>
            </h1>
            <p className="lead text-muted">
              <span className="me-2">✨</span>
              Select the package that best fits your needs and start your journey with us
              <span className="ms-2">✨</span>
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="row g-4 justify-content-center">
          {packages.map((pkg, index) => (
            <div key={pkg._id || index} className="col-lg-4 col-md-6">
              <div className={`card h-100 pricing-package-card ${pkg.popular ? 'pricing-popular-card' : ''}`}>
                {pkg.popular && (
                  <div className="pricing-popular-badge">
                    <span className="badge-text">Most Popular</span>
                  </div>
                )}
                
                <div className="card-header bg-white border-0 text-center py-4">
                  <h3 className="h4 fw-bold mb-3">
                    <span className="me-2">
                      {pkg.popular ? '👑' : '📋'}
                    </span>
                    {pkg.name}
                  </h3>
                  <div className="d-flex align-items-baseline justify-content-center">
                    <span className="pricing-currency-symbol">💰</span>
                    <span className="pricing-amount-display">{pkg.price}</span>
                    <span className="pricing-period-text ms-1">
                      <span className="me-1">📅</span>
                      /month
                    </span>
                  </div>
                </div>

                <div className="card-body px-4">
                  <div className="list-group list-group-flush">
                    {pkg.features && pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="list-group-item border-0 px-0 py-2">
                        <div className="d-flex align-items-center">
                          <div className="pricing-feature-checkmark me-3">
                            <CheckIcon />
                          </div>
                          <span className="text-dark">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-footer bg-white border-0 text-center py-4">
                  <button className={`btn w-100 ${pkg.popular ? 'pricing-popular-button' : 'pricing-default-button'}`}>
                    <span className="pricing-button-icon">
                      {pkg.popular ? '🚀' : '▶️'}
                    </span>
                    {pkg.buttonText || 'Get Started'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section with Additional Icons */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
              <span className="text-muted">
                <i className="fas fa-lock me-2"></i>
                Secure Payment
              </span>
              <span className="text-muted">
                <i className="fas fa-bolt me-2"></i>
                Instant Setup
              </span>
              <span className="text-muted">
                <i className="fas fa-headset me-2"></i>
                24/7 Support
              </span>
              <span className="text-muted">
                <i className="fas fa-phone me-2"></i>
                Free Consultation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPackages;