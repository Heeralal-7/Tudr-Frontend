import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/Images/logo-removebg-preview.png';
import "../Assets/Css/style.css"

const BondOrientation = () => {
  const [formData, setFormData] = useState({
    purchasePrice: '',
    depositAmount: '',
    interestRate: '',
    term: 20
  });
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!formData.purchasePrice || !formData.depositAmount || !formData.interestRate) {
      setError('Please fill in all fields');
      return;
    }
    
    const purchasePrice = parseFloat(formData.purchasePrice.replace(/[^0-9.]/g, ''));
    const depositAmount = parseFloat(formData.depositAmount.replace(/[^0-9.]/g, ''));
    const interestRate = parseFloat(formData.interestRate.replace(/[^0-9.]/g, ''));
    const term = parseInt(formData.term);
    
    if (depositAmount >= purchasePrice) {
      setError('Deposit amount must be less than purchase price');
      return;
    }
    
    // Calculate monthly bond repayment
    const loanAmount = purchasePrice - depositAmount;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = term * 12;
    
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepayment: (monthlyPayment * numberOfPayments).toFixed(2),
      totalInterest: ((monthlyPayment * numberOfPayments) - loanAmount).toFixed(2)
    });
  };

  const formatCurrency = (value) => {
    return value ? `R${parseFloat(value.replace(/[^0-9.]/g, '')).toLocaleString('en-ZA')}` : '';
  };
  return (
    <>

{/* <!-- Header Section --> */}
<header className="bond-orientalation text-white py-5">
  <div className="container text-center d-flex justify-content-center">
    <div className="row align-items-center">
      <div className="col-md-12 text-center">
        <h1 className="mb-2">Bond Origination Services</h1>
        <p className="mb-4">Get the best mortgage deals from multiple banks with our expert application service</p>
        {/* <button className="btn btn-light px-4 text-primary">Apply Now</button> */}
      </div>
    </div>
  </div>
</header>

{/* <!-- Stats Section --> */}
<section className="py-5 bg-light">
  <div className="container">
    <div className="row text-center">
      <div className="col-md-3 col-6 mb-3">
        <h3 className="fw-bold text-primary">98%</h3>
        <p className="text-muted small">Approval Rate</p>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <h3 className="fw-bold text-primary">5M+</h3>
        <p className="text-muted small">Clients We've Helped</p>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <h3 className="fw-bold text-primary">24hrs</h3>
        <p className="text-muted small">Average Response Time</p>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <h3 className="fw-bold text-primary">8</h3>
        <p className="text-muted small">Banking Partners</p>
      </div>
    </div>
  </div>
</section>

{/* <!-- Services Section --> */}
<section className="py-5">
  <div className="container">
    <h2 className="text-center text-primary mb-4">Our Bond Services</h2>
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card h-100 service-card shadow-sm">
          <div className="card-body text-center p-4">
            <div className="icon-circle bg-primary-custom text-white mb-3">
              <i className="fas fa-check-circle fa-2x"></i>
            </div>
            <h4 className="text-primary">Pre-Approval</h4>
            <p className="text-muted">Know exactly what you qualify for before house hunting.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card h-100 service-card shadow-sm">
          <div className="card-body text-center p-4">
            <div className="icon-circle bg-primary-custom text-white mb-3">
              <i className="fas fa-file-alt fa-2x"></i>
            </div>
            <h4 className="text-primary">Multiple Bank Application</h4>
            <p className="text-muted">We submit to all major banks to get you the best rate.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <Link to="/homeloan">
        <div className="card h-100 service-card shadow-sm">
          <div className="card-body text-center p-4">
            <div className="icon-circle bg-primary-custom text-white mb-3">
              <i className="fas fa-calculator fa-2x"></i>
            </div>
            <h4 className="text-primary">Bond Calculator</h4>
            <p className="text-muted">Calculate your monthly repayments and affordability.</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  </div>
</section>

<section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-primary mb-4">Bond Repayment Calculator</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="purchasePrice" className="form-label">Purchase Price</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="purchasePrice" 
                        placeholder="R" 
                        value={formData.purchasePrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="depositAmount" className="form-label">Deposit Amount</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="depositAmount" 
                        placeholder="R" 
                        value={formData.depositAmount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="interestRate" className="form-label">Interest Rate</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="interestRate" 
                        placeholder="%" 
                        value={formData.interestRate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="term" className="form-label">Term</label>
                      <select 
                        className="form-select" 
                        id="term"
                        value={formData.term}
                        onChange={handleChange}
                      >
                        <option value={20}>3 Years</option>
                        <option value={25}>5 Years</option>
                        <option value={30}>7 Years</option>
                        <option value={20}>10 Years</option>
                        <option value={25}>15 Years</option>
                        <option value={30}>20 Years</option>
                      </select>
                    </div>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary bg-primary-custom">Calculate</button>
                  </div>
                  
                  {result && (
                    <div className="results mt-4 p-3 bg-light rounded">
                      <h4 className="text-center mb-3">Calculation Results</h4>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="text-center">
                            <h5>Monthly Payment</h5>
                            <p className="h4 text-primary">R{result.monthlyPayment}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <h5>Total Repayment</h5>
                            <p className="h4 text-primary">R{result.totalRepayment}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <h5>Total Interest</h5>
                            <p className="h4 text-primary">R{result.totalInterest}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* <!-- How It Works Section --> */}
<section className="py-5 bg-white">
  <div className="container">
    <h2 className="text-center text-primary mb-4">How It Works</h2>
    <div className="row">
      <div className="col-md-3 col-6 mb-4 text-center">
        <div className="step-circle">
          <span>1</span>
        </div>
        <h5>Apply Online</h5>
        <p className="small text-muted">Complete our simple application form</p>
      </div>
      <div className="col-md-3 col-6 mb-4 text-center">
        <div className="step-circle">
          <span>2</span>
        </div>
        <h5>Document Upload</h5>
        <p className="small text-muted">Submit required documentation</p>
      </div>
      <div className="col-md-3 col-6 mb-4 text-center">
        <div className="step-circle">
          <span>3</span>
        </div>
        <h5>Bank Application</h5>
        <p className="small text-muted">We apply to multiple banks</p>
      </div>
      <div className="col-md-3 col-6 mb-4 text-center">
        <div className="step-circle">
          <span>4</span>
        </div>
        <h5>Best Offer</h5>
        <p className="small text-muted">Choose the best offer from banks</p>
      </div>
    </div>
  </div>
</section>

{/* <!-- Testimonials Section --> */}
<section className="container py-5">
  <div className="owl-carousel owl-theme">
    {/* <!-- Testimonial 1 --> */}
    <div className="testimonial-card p-4 text-center  shadow bg-light rounded">
      <div className="d-flex  flex-column justify-content-center align-items-center mb-3">
        <img
          src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          style={{width:"80px" ,height:"80px"}} alt="Customer" className="testimonial-img me-3 rounded-circle" />
        <div>
          <h5 className="mb-0">John Doe</h5>
          <small className="text-muted">Cape Town</small>
        </div>
      </div>
      <p>"Found my dream home through Tudr in just 3 weeks! The filters made it so easy to narrow down exactly what I
        was looking for."</p>
      <div className="text-warning">
        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
        <i className="fas fa-star"></i><i className="fas fa-star"></i>
      </div>
    </div>

    {/* <!-- Testimonial 2 --> */}
    <div className="testimonial-card p-4 text-center  shadow bg-light rounded">
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        <img
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          style={{width:"80px", height:"80px"}} alt="Customer" className="testimonial-img me-3 rounded-circle" />
        <div>
          <h5 className="mb-0">Sarah Smith</h5>
          <small className="text-muted">Johannesburg</small>
        </div>
      </div>
      <p>"The rental agreement service saved me so much time and hassle. Professional documents <br/> ready in minutes!"</p>
      <div className="text-warning">
        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
        <i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
      </div>
    </div>

    {/* <!-- Testimonial 3 --> */}
    <div className="testimonial-card p-4 text-center  shadow bg-light rounded">
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        <img
          src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          style={{width:"80px" ,height:"80px"}} alt="Customer" className="testimonial-img me-3 rounded-circle" />
        <div>
          <h5 className="mb-0">Michael Brown</h5>
          <small className="text-muted">Durban</small>
        </div>
      </div>
      <p>"As Link landlord, I've tried several platforms but Tudr gets me quality tenants faster than any other service.
        Highly recommended!"</p>
      <div className="text-warning">
        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
        <i className="fas fa-star"></i><i className="fas fa-star"></i>
      </div>
    </div>
  </div>
</section>



  {/* <!-- Footer --> */}
  

    </>
  )
}

export default BondOrientation
