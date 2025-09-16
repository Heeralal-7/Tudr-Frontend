// AboutUs.js
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Context/context';
import logo from "../Assets/Images/logo-removebg-preview.png";

const AboutUs = () => {
  const { fetchAboutUs, aboutUs, loading } = useContext(MyContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeData, setActiveData] = useState({}); // Store selected document

  // Fetch once on mount
  useEffect(() => {
    if (aboutUs.length === 0) {
      fetchAboutUs();
    } else {
      // Default to first document
      setActiveData(aboutUs[0]);
    }
  }, [aboutUs, fetchAboutUs]);

  // Update active data when aboutUs changes
  useEffect(() => {
    if (aboutUs.length > 0) {
      setActiveData(aboutUs[0]);
    }
  }, [aboutUs]);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <p className='text-center p-5'>Loading...</p>;
  if (aboutUs.length === 0) return <p className='text-center p-5'>Data not available</p>;

  // Prepare FAQ data from various fields
  const faqData = [
    { 
      question: "What payment methods do you accept?", 
      answer: activeData.WhatPaymentMethod?.[0] || "Payment information not available" 
    },
    { 
      question: "Can I modify or cancel my order?", 
      answer: activeData.ModifiCancelOrder?.[0] || "Order modification info not available" 
    },
    { 
      question: "How do I track my order?", 
      answer: activeData.HowTrackOrder?.[0] || "Tracking information not available" 
    },
    { 
      question: "What is your return policy?", 
      answer: activeData.WhatYourPolicy?.[0] || "Policy information not available" 
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid about-image">
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-6 bg-whitecolor d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60% !important" }}>
              <img src={logo} width="40%" alt="Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Who is Trust */}
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-6 p-0 Trustsection"></div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5">
            <h1 className="text-blue d-flex w-100">Who is Trust ?</h1>
            {activeData.WhoisTrust?.map((text, index) => (
              <p className="text-gray" key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5">
            <h1 className="text-blue">What we do ?</h1>
            {activeData.Whatwedo?.map((text, index) => (
              <p className="text-gray" key={index}>{text}</p>
            ))}
          </div>
          <div className="col-md-6 p-0 What-we-do-section"></div>
        </div>
      </div>

      {/* How to Place Order Timeline */}
     
      {/* FAQ Section */}
      <div className="container-fluid py-5 mt-5">
        <div className="container">
          <div className="display-2 d-flex pb-3 align-items-center fw-semibold justify-content-center text-blue">
            <span>
              <img className='me-3' src={logo} width="90%" height="50px" alt="Logo" />
            </span>
            FAQ
          </div>

          <div className="faq_main_container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq_container">
                <div className="faq_question" onClick={() => toggleFaq(index)}>
                  <div className="faq_question-text">
                    <h3>{faq.question}</h3>
                  </div>
                  <div className="icon">
                    <div className={`icon-shape ${activeIndex === index ? 'active' : ''}`}></div>
                  </div>
                </div>
                <div className={`answercont ${activeIndex === index ? 'active' : ''}`}>
                  <div className="answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;