import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Components/Assets/Images/logo-removebg-preview.png"
const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row my-2">
          <div className="col-md-6 d-flex align-items-center">
            <h5 className="text-white">Download the Tudr App</h5>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <Link to="#" className="app-btn bg-white border-class">
              <i className="fab fa-apple text-black"></i>
              <div className="text-start">
                <div className="text-black" style={{ fontSize: '0.7rem' }}>Download on the</div>
                <div className="text-black">App Store</div>
              </div>
            </Link>
            <Link to="#" className="app-btn bg-white border-class">
              <i className="fab fa-google-play text-black"></i>
              <div className="text-start">
                <div className="text-black" style={{ fontSize: '0.7rem' }}>GET IT ON</div>
                <div className="text-black">Google Play</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="row border-top border-bottom">
          <div className="col-lg-3 my-2 col-md-6 mb-4 mb-md-0">
            <h5 className="footer-heading pb-3 d-flex justify-content-center">
              <img src={logo} height="100px" alt="" />
            </h5>
            <p className="">Finding your perfect property match in South Africa.</p>
            <div className="">
              <Link to="#" className="me-2"><i className="fab fa-facebook-f"></i></Link>
              <Link to="#" className="me-2"><i className="fab fa-twitter"></i></Link>
              <Link to="#" className="me-2"><i className="fab fa-instagram"></i></Link>
              <Link to="#" className="me-2"><i className="fab fa-linkedin-in"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 my-2 text-start col-md-6 mb-2 mb-md-0">
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/aboutus">About Us</Link></li>
              <li className="mb-2"><Link to="/contactus">Contact Us</Link></li>
              <li className="mb-2"><Link to="/careers">Careers</Link></li>
              <li className="mb-2"><Link to="/blog">Blog</Link></li>
              <li className="mb-2"><Link to="/home">Testimonials</Link></li>
              <li className="mb-2"><Link to="/aboutus">FAQ</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 my-2 text-start col-md-6 mb-2 mb-md-0">
            <h5 className="footer-heading mb-2">Property Options</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/propertySearch">Buy Property</Link></li>
              <li className="mb-2"><Link to="/rent">Rent Property</Link></li>
              <li className="mb-2"><Link to="/rent/short-term">Short Term Rental</Link></li>
              <li className="mb-2"><Link to="/rent/medium-term">Medium Term Rental</Link></li>
              <li className="mb-2"><Link to="/rent/long-term">Long Term Rental</Link></li>
              <li className="mb-2"><Link to="/commercial">Commercial Property</Link></li>
              <li className="mb-2"><Link to="/pg">PG Accommodation</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 my-2 text-start col-md-6 mb-2 mb-md-0">
            <h5 className="footer-heading mb-2">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/post-property">Post Property</Link></li>
              <li className="mb-2"><Link to="/rentAgreement">Rent Agreement</Link></li>
              <li className="mb-2"><Link to="/packermoverservices">Packers & Movers</Link></li>
              <li className="mb-2"><Link to="/home-services">Home Services</Link></li>
              <li className="mb-2"><Link to="/legalservices">Legal Services</Link></li>
              <li className="mb-2"><Link to="/conveyancers">Conveyancers</Link></li>
              <li className="mb-2"><Link to="/bondOrientation">Bond Originators</Link></li>
              <li className="mb-2"><Link to="/propertyInsurence">Insurance</Link></li>
            </ul>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="small mb-0 text-light">© 2025 Tudr.co.za. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline small text-muted mb-0">
              <li className="list-inline-item"><Link to="/terms">Terms of Use</Link></li>
              <li className="list-inline-item">|</li>
              <li className="list-inline-item"><Link to="/privacy">Privacy Policy</Link></li>
              <li className="list-inline-item">|</li>
              <li className="list-inline-item"><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
