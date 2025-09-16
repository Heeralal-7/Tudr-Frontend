import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export const PropertyInsurence = () => {
  const [form, setForm] = useState({
    propertyType: '',
    coverage: '',
    buildingValue: '',
    contentsValue: '',
  });
 
  const [quote, setQuote] = useState(null);
 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const building = parseFloat(form.buildingValue.replace(/[^0-9.]/g, '')) || 0;
    const contents = parseFloat(form.contentsValue.replace(/[^0-9.]/g, '')) || 0;
 
    let multiplier = 1;
    switch (form.coverage) {
      case 'Basic':
        multiplier = 0.005;
        break;
      case 'Standard':
        multiplier = 0.0075;
        break;
      case 'Premium':
        multiplier = 0.01;
        break;
      default:
        multiplier = 0;
    }
 
    const totalQuote = (building + contents) * multiplier;
    setQuote(totalQuote.toFixed(2));
  };
 
  return (
    <>
      {/* <!-- Hero Section --> */}
      <header className="bg-secondary-custom text-white ">
        <div className="container-fluid bgimage-insurance">
          <div className="row  h-100 d-flex align-items-center justify-content-center">
            <div className="col-md-10  d-flex flex-column   justify-content-center">
              <h1 className="fw-bold m-0 ">Property & Contents Insurance</h1>
              <p className="lead m-0 py-1">Protect your property and belongings with comprehensive coverage</p>
              <div className="">
                {/* <Link to="#" className="btn btn-light me-2">Buy Link Policy</Link>
                <Link to="#" className="btn btn-outline-light">Learn More</Link> */}
              </div>
            </div>
          </div>
        </div>
      </header>
 
      {/* <!-- Insurance Solutions --> */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Our Insurance Solutions</h2>
          <div className="row g-4">
            {/* <!-- Buildings Insurance --> */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body ">
                  <div className=" icon-circle bg-primary-custom  text-white p-3 mb-3 rounded-circle">
                    <i className="fas fa-home fa-2x"></i>
                  </div>
                  <h4 className="text-primary  text-center">Buildings Insurance</h4>
                  <ul className="list-unstyled text-center">
                    <li><i className="fas fa-check text-success me-2"></i> Structural damage protection</li>
                    <li><i className="fas fa-check text-success me-2"></i> Natural disaster coverage</li>
                    <li><i className="fas fa-check text-success me-2"></i> Permanent fixtures included</li>
                  </ul>
                </div>
              </div>
            </div>
 
            {/* <!-- Contents Insurance --> */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body ">
                  <div className=" icon-circle bg-primary-custom  text-white p-3 mb-3 rounded-circle">
                    <i className="fas fa-couch fa-2x"></i>
                  </div>
                  <h4 className="text-primary  text-center">Contents Insurance</h4>
                  <ul className="list-unstyled text-center">
                    <li><i className="fas fa-check text-success me-2"></i> Household item protection</li>
                    <li><i className="fas fa-check text-success me-2"></i> Electronics & appliances</li>
                    <li><i className="fas fa-check text-success me-2"></i> Personal belongings coverage</li>
                  </ul>
                </div>
              </div>
            </div>
 
            {/* <!-- All-Risk Coverage --> */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body ">
                  <div className=" icon-circle bg-primary-custom  text-white p-3 mb-3 rounded-circle">
                    <i className="fas fa-shield-alt fa-2x"></i>
                  </div>
                  <h4 className="text-primary  text-center">All-Risk Coverage</h4>
                  <ul className="list-unstyled text-center">
                    <li><i className="fas fa-check text-success me-2"></i> Comprehensive package</li>
                    <li><i className="fas fa-check text-success me-2"></i> Liability coverage</li>
                    <li><i className="fas fa-check text-success me-2"></i> Extended item protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Quick Quote Calculator</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="propertyType" className="form-label">Property Type</label>
                        <select className="form-select shadow-none" id="propertyType" onChange={handleChange}>
                          <option value="">Select...</option>
                          <option>House</option>
                          <option>Apartment</option>
                          <option>Condo</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="coverage" className="form-label">Coverage Level</label>
                        <select className="form-select shadow-none" id="coverage" onChange={handleChange}>
                          <option value="">Select...</option>
                          <option>Basic</option>
                          <option>Standard</option>
                          <option>Premium</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label htmlFor="buildingValue" className="form-label">Building Value</label>
                        <input type="text" className="form-control shadow-none" id="buildingValue" placeholder="$" onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="contentsValue" className="form-label">Contents Value</label>
                        <input type="text" className="form-control shadow-none" id="contentsValue" placeholder="$" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary bg-primary-custom">Calculate Quote</button>
                    </div>
                  </form>
                  {quote !== null && (
                    <div className="alert alert-success mt-4 text-center">
                      <strong>Estimated Quote:</strong> ${quote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* <!-- Why Choose Us --> */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Why Choose Our Insurance</h2>
          <div className="row g-4">
            <div className="col-md-3 col-6 text-center">
              <div className="icon-circle bg-primary-custom text-white">
                <i className="fas fa-bolt fa-2x"></i>
              </div>
              <h5>Quick Claims</h5>
              <p className="small">Fast processing times</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="icon-circle bg-primary-custom text-white">
                <i className="fas fa-handshake fa-2x"></i>
              </div>
              <h5>Trusted Reputation</h5>
              <p className="small">95% customer satisfaction</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="icon-circle bg-primary-custom text-white">
                <i className="fas fa-headset fa-2x"></i>
              </div>
              <h5>24/7 Support</h5>
              <p className="small">Always here to help</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="icon-circle bg-primary-custom text-white">
                <i className="fas fa-percent fa-2x"></i>
              </div>
              <h5>Competitive Rates</h5>
              <p className="small">Best value coverage</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Claims Process --> */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Simple Claims Process</h2>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                {/* <!-- Step 1 --> */}
                <div className="col-md-3 process-step text-center mb-4 mb-md-0">
                  <div className="icon-circle bg-primary-custom text-white">
                    <i className="fas fa-file-alt fa-2x"></i>
                  </div>
                  <h5>File Claim</h5>
                  <p className="small">Submit your claim online or by phone</p>
                </div>
 
                {/* <!-- Step 2 --> */}
                <div className="col-md-3 process-step text-center mb-4 mb-md-0">
                  <div className="icon-circle bg-primary-custom text-white">
                    <i className="fas fa-search fa-2x"></i>
                  </div>
                  <h5>Assessment</h5>
                  <p className="small">We review your claim details</p>
                </div>
 
                {/* <!-- Step 3 --> */}
                <div className="col-md-3 process-step text-center mb-4 mb-md-0">
                  <div className="icon-circle bg-primary-custom text-white">
                    <i className="fas fa-thumbs-up fa-2x"></i>
                  </div>
                  <h5>Approval</h5>
                  <p className="small">Get notification of approval</p>
                </div>
 
                {/* <!-- Step 4 --> */}
                <div className="col-md-3 process-step text-center">
                  <div className="icon-circle bg-primary-custom text-white">
                    <i className="fas fa-money-bill-wave fa-2x"></i>
                  </div>
                  <h5>Payout</h5>
                  <p className="small">Receive your settlement payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
 
 