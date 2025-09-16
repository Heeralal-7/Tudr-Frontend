import React, { useEffect, useContext,useState } from 'react';
import { MyContext } from '../../Context/context';
import "../Assets/Css/style.css";

const LegalServices = () => {
  const { consultant, loading, error, getConsultantService, bookConsultation } = useContext(MyContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceId: '',
    message: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    getConsultantService();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookConsultation(formData);
      setBookingSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        serviceId: '',
        message: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      // Error is already handled in the context
    }
  };
  return (
    <>
      {/* Header/Hero Section */}
      <header className="bg-legalservice text-white text-center py-5">
        <div className="container">
          <h1 className="mb-3">Property Legal <br /> Services</h1>
          <p className="lead mb-4">Expert legal assistance for all your property transactions</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Our Legal Services</h2>
          <div className="row g-4">
            {/* Service 1 */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="service-icon mx-auto">
                  <i className="fas fa-home text-primary"></i>
                </div>
                <h3 className="text-primary">Property Transfer</h3>
                <p className="text-muted">Professional assistance with buying, selling, and transferring property ownership</p>
              </div>
            </div>
            {/* Service 2 */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="service-icon mx-auto">
                  <i className="fas fa-file-contract text-primary"></i>
                </div>
                <h3 className="text-primary">Contract Review</h3>
                <p className="text-muted">Expert analysis of lease agreements, purchase contracts, and legal documents</p>
              </div>
            </div>
            {/* Service 3 */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="service-icon mx-auto">
                  <i className="fas fa-balance-scale text-primary"></i>
                </div>
                <h3 className="text-primary">Legal Consultation</h3>
                <p className="text-muted">Get professional advice on property regulations and compliance matters</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4 text-primary">Book a Legal Consultation</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {bookingSuccess && (
                <div className="alert alert-success mb-4">
                  Consultation booked successfully! We'll contact you shortly.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      className="form-control shadow-none mb-3" 
                      placeholder="Full Name" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="email" 
                      className="form-control shadow-none mb-3" 
                      placeholder="Email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <input 
                      type="tel" 
                      className="form-control shadow-none mb-3" 
                      placeholder="Phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <select 
                      className="form-select form-control shadow-none mb-3"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      {loading ? (
                        <option disabled>Loading services...</option>
                      ) : error ? (
                        <option disabled>Error loading services</option>
                      ) : consultant.length > 0 ? (
                        consultant.map((service) => (
                          <option key={service._id || service.id} value={service._id || service.id}>
                            {service.service || "Unknown Service"}
                          </option>
                        ))
                      ) : (
                        <option disabled>No services available</option>
                      )}
                    </select>
                    {error && <p className="text-danger small mt-1">{error}</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <textarea 
                      className="form-control shadow-none" 
                      rows="3" 
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 py-2 w-100"
                    disabled={loading}
                  >
                    {loading ? 'Booking...' : 'Schedule Consultation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Experts */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Our Legal Experts</h2>
          <div className="row g-4 justify-content-center">
            {/* Expert 1 */}
            <div className="col-sm-6 col-md-4 text-center ">
              <div className='card shadow-sm border-0 p-3'>
              <div className='d-flex justify-content-center'>
              <img src="https://img.freepik.com/free-photo/african-american-man-wearing-round-glasses_273609-10062.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740" alt="John Smith" className="expert-img mb-3" />
              </div>
              <h5 className=''>John Smith</h5>
              <p className="text-muted pt-0 fw-semibold">Property Law Specialist</p>
              </div>
            </div>
            {/* Expert 2 */}
            <div className="col-sm-6 col-md-4 text-center ">
              <div className='card shadow-sm border-0 p-3'>
              <div className='d-flex justify-content-center'>
              <img src="https://img.freepik.com/free-photo/african-american-man-wearing-round-glasses_273609-10062.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740" alt="Sarah Johnson" className="expert-img mb-3" />
              </div>
              <h5 className=''>Sarah Johnson</h5>
              <p className="text-muted pt-0 fw-semibold">Contract Law Expert</p>
              </div>
            </div>
            {/* Expert 3 */}
            <div className="col-sm-6 col-md-4 text-center ">
              <div className='card shadow-sm border-0 p-3'>
              <div className='d-flex justify-content-center'>
              <img src="https://img.freepik.com/free-photo/african-american-man-wearing-round-glasses_273609-10062.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740" alt="Michael Brown" className="expert-img mb-3" />
              </div>
              <h5 className=''>Michael Brown</h5>
              <p className="text-muted pt-0 fw-semibold">Real Estate Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 text-primary ">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* FAQ Item 1 */}
              <div className="faq-item">
                <h5>What legal documents do I need when buying or selling a property?</h5>
                <p className="text-muted">Common documents include the property deed, sales agreement, mortgage documentation, tax
                  certificates, insurance records, and inspection reports.</p>
              </div>
              {/* FAQ Item 2 */}
              <div className="faq-item">
                <h5>How long does the property transfer process usually take?</h5>
                <p className="text-muted">Depending on complexity, a standard property transfer can take 30-60 days to complete,
                  including document preparation, financing, inspections, and settlement.</p>
              </div>
              {/* FAQ Item 3 */}
              <div className="faq-item">
                <h5>What are the legal requirements for a valid property transfer?</h5>
                <p className="text-muted">A valid property transfer requires a legal deed, proper identification of the property,
                  competent parties, consideration (payment), and proper execution according to state laws.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalServices;