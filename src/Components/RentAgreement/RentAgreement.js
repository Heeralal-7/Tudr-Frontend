import React, { useState, useEffect } from 'react';

const RentalAgreementServices = () => {
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [agreementData, setAgreementData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    propertyAddress: '',
    city: '',
    pincode: '',
    monthlyRent: '',
    securityDeposit: '',
    lockInPeriod: '11',
    agreementDuration: '11',
    startDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgreementData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleDigitalSignature = () => {
    alert("Digital Signature process initiated! You will be redirected to a secure e-signature platform to sign your document legally.");
  };

  const handleDoorstepDelivery = () => {
    alert("Doorstep Delivery selected! Your printed, stamped rental agreement will be delivered to your address within 3-5 business days.");
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="card p-4">
            <h2 className="mb-4">Owner & Tenant Details</h2>
            <div className="row">
              <div className="col-md-6">
                <h4>Owner Details</h4>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="ownerName"
                    value={agreementData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Enter owner's full name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="ownerPhone"
                    value={agreementData.ownerPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="ownerEmail"
                    value={agreementData.ownerEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h4>Tenant Details</h4>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="tenantName"
                    value={agreementData.tenantName}
                    onChange={handleInputChange}
                    placeholder="Enter tenant's full name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="tenantPhone"
                    value={agreementData.tenantPhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="tenantEmail"
                    value={agreementData.tenantEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" disabled>Previous</button>
              <button className="btn btn-primary" onClick={nextStep}>Next Step</button>
            </div>
            <div className="text-center mt-3">Step 1 of 3</div>
          </div>
        );
      case 2:
        return (
          <div className="card p-4">
            <h2 className="mb-4">Property & Rent Details</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Property Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="propertyAddress"
                    value={agreementData.propertyAddress}
                    onChange={handleInputChange}
                    placeholder="Enter property address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="city"
                    value={agreementData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Monthly Rent ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="monthlyRent"
                    value={agreementData.monthlyRent}
                    onChange={handleInputChange}
                    placeholder="Enter monthly rent"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">PIN Code</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="pincode"
                    value={agreementData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter PIN code"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Security Deposit</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="securityDeposit"
                    value={agreementData.securityDeposit}
                    onChange={handleInputChange}
                    placeholder="Enter security deposit"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" onClick={prevStep}>Previous</button>
              <button className="btn btn-primary" onClick={nextStep}>Next Step</button>
            </div>
            <div className="text-center mt-3">Step 2 of 3</div>
          </div>
        );
      case 3:
        return (
          <div className="card p-4">
            <h2 className="mb-4">Agreement Terms</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Lock-in Period (months)</label>
                  <select 
                    className="form-select" 
                    name="lockInPeriod"
                    value={agreementData.lockInPeriod}
                    onChange={handleInputChange}
                  >
                    <option value="11">11 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Agreement Duration</label>
                  <select 
                    className="form-select" 
                    name="agreementDuration"
                    value={agreementData.agreementDuration}
                    onChange={handleInputChange}
                  >
                    <option value="11">11 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Agreement Start Date*</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="startDate"
                    value={agreementData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" onClick={prevStep}>Previous</button>
              <div>
                <button className="btn btn-success me-2" onClick={handleDigitalSignature}>
                  <i className="bi bi-pen"></i> Digital Signature
                </button>
                <button className="btn btn-warning" onClick={handleDoorstepDelivery}>
                  <i className="bi bi-truck"></i> Doorstep Delivery
                </button>
              </div>
            </div>
            <div className="text-center mt-3">Step 3 of 3</div>
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Create Your Rental Agreement Online</h1>
          <p className="lead">Hassle-Free</p>
          <p className="mb-4">Legally Valid Rental Agreement With Doorstep Delivery in Just 3 Easy Steps</p>
          <div className="d-flex justify-content-center flex-wrap mb-4">
            <span className="badge bg-light text-dark me-2 mb-2 p-2"><i className="bi bi-check-circle-fill text-success me-1"></i> Govt Approved</span>
            <span className="badge bg-light text-dark me-2 mb-2 p-2"><i className="bi bi-truck text-primary me-1"></i> Doorstep Delivery</span>
            <span className="badge bg-light text-dark mb-2 p-2"><i className="bi bi-people-fill text-info me-1"></i> Flat & Spouse</span>
          </div>
          <button className="btn btn-light btn-lg px-4 py-2 fw-bold">Create Agreement Now</button>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <p className="text-center text-muted mb-5">Simple Process, Professional Results</p>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="text-white fw-bold">1</span>
                  </div>
                  <h5>Fill Details Online</h5>
                  <p className="text-muted">Tenant/Landlord Details, Property Info</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="text-white fw-bold">2</span>
                  </div>
                  <h5>Choose Plan & Price</h5>
                  <p className="text-muted">State Specific Stamp Duty Included</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="text-white fw-bold">3</span>
                  </div>
                  <h5>Digital Signature & Delivery</h5>
                  <p className="text-muted">E-Sign Legally And Get Doorstep Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Selection Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Choose Your State</h2>
          <p className="text-center text-muted mb-4">Our State-Specific Legal Format</p>
          <div className="d-flex justify-content-center flex-wrap">
            {['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Others'].map(state => (
              <button 
                key={state}
                className={`btn ${selectedState === state ? 'btn-primary' : 'btn-outline-primary'} m-2`}
                onClick={() => handleStateSelect(state)}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agreement Form Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Create Your Agreement</h2>
          <p className="text-center text-muted mb-5">Fill In The Details To Generate Your Rental Agreement</p>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {renderStep()}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Simple Process, Professional Results</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-download display-4 text-primary mb-3"></i>
                  <h5>Instant Download</h5>
                  <p className="text-muted">PDF available immediately after signing</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-house-door display-4 text-primary mb-3"></i>
                  <h5>Doorstep Delivery</h5>
                  <p className="text-muted">Printed copy delivered within 3-5 business days</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0">
                <div className="card-body">
                  <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                  <h5>Legal E-Signature</h5>
                  <p className="text-muted">Digitally sign your agreement with legal validity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Frequently Asked Questions</h2>
          <p className="text-center text-muted mb-5">Get Answers To Common Questions</p>
          
          <div className="accordion" id="faqAccordion">
            {[
                { 
                  question: "Is online rental agreement legally valid?", 
                  answer: "Yes, online rental agreements created through our platform are legally valid as they comply with all the necessary legal requirements and include the appropriate stamp duty as per your state regulations." 
                },
                { 
                  question: "Do I need to pay stamp duty?", 
                  answer: "Yes, stamp duty is mandatory for rental agreements in India. The amount varies by state and is included in our pricing plans." 
                },
                { 
                  question: "How does digital signature work?", 
                  answer: "We use secure, government-approved digital signature platforms that provide legally valid e-signatures for your rental agreement." 
                },
                { 
                  question: "Is my personal information secure?", 
                  answer: "Yes, we use industry-standard encryption and security measures to protect all your personal and property information." 
                },
                { 
                  question: "How long does doorstep delivery take?", 
                  answer: "Doorstep delivery typically takes 3-5 business days after the agreement is signed by all parties." 
                }
              ].map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                      {faq.question}
                    </button>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
        </div>
      </section>

    
    </div>
  );
};

export default RentalAgreementServices;