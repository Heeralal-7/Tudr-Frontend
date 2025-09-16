import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../Context/context';
// import "../Assets/Css/style.css"
const GuidlineSeller = () => {
  const { guidelines, loading, error, fetchGuidelines } = useContext(MyContext);

  useEffect(() => {
    fetchGuidelines();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5">
        <h4>Error Loading Guidelines</h4>
        <p>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={fetchGuidelines}
        >
          Try Again
        </button>
      </div>
    );
  }

  const guideline = guidelines.length > 0 ? guidelines[0] : null;

  return (
    <>
      <div className="container-fluid bg-white bg-guideline-image">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="w-100 mb-5">
              <h1 className="text-center py-2">Guidelines for Seller</h1>
              
              {guideline ? (
                <>
                  {/* INTRODUCTION Section */}
                  <div className="guideline-section">
                    <h4>INTRODUCTION</h4>
                    {guideline.INTRODUCTION.map((text, i) => (
                      <p key={i} className="mb-3 text-muted">{text}</p>
                    ))}
                  </div>
                  <hr/>

                  {/* DISCLOSURE Section */}
                  <div className="guideline-section">
                    <h4>DISCLOSURE</h4>
                    {guideline.DISCLOSURE.map((text, i) => (
                      <p key={i} className="mb-3 text-muted">{text}</p>
                    ))}
                  </div>
                  <hr/>

                  {/* Property Type Sections */}
                  <div className="guideline-section">
                    <h4>SECTIONAL TITLE PROPERTY</h4>
                    {guideline.SECTIONALTITLEPROPERTY.map((text, i) => (
                      <p key={i} className="mb-3 text-muted">{text}</p>
                    ))}
                  </div>
                  <hr/>

                  <div className="guideline-section">
                    <h4>FREEHOLD PROPERTY</h4>
                    {guideline.FREEHOLDPROPERTY.map((text, i) => (
                      <p key={i} className="mb-3 text-muted">{text}</p>
                    ))}
                  </div>
                  <hr/>

                  <div className="guideline-section">
                    <h4>CLUSTER PROPERTY</h4>
                    {guideline.CLUSTERPROPERTY.map((text, i) => (
                      <p key={i} className="mb-3 text-muted">{text}</p>
                    ))}
                  </div>
                  <hr/>

                  {/* GENERAL DOCUMENTS Section */}
                  <div className="guideline-section">
                    <h4>GENERAL DOCUMENTS</h4>
                    <p className="mb-3 text-muted">Additional documents to be made available:</p>
                    <ul className="guideline-list">
                      {guideline.GENERALDOCUMENTS.map((item, i) => (
                        <li key={i} className="text-muted">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <hr/>

                  {/* All Other Sections */}
                  {renderSection("ISSUES TO CONSIDER", guideline.ISSUESTOCONSIDER)}
                  {renderSection("VAT Registration", guideline.VATRegistration)}
                  {renderSection("Approved Building Plans", guideline.ApprovedBuildingPlans)}
                  {renderSection("Sectional Title / Home Owners Association Special Levies", guideline.HomeOwnersAssociation)}
                  {renderSection("Fixtures and Fittings", guideline.FixturesandFittings)}
                  {renderSection("Special Power of Attorney", guideline.SpecialPowerofAttorney)}
                  {renderSection("National Credit Act (NCA): Banks 90 Day Interest Provisions", guideline.NationalCreditActNCA)}
                  {renderSection("Consequences of Calling for Cancellation Figures on a Mortgage Bond", guideline.CancellationFiguresMortgageBond)}
                  {renderSection("No Existing Mortgage Bond", guideline.NoExistingMortgageBond)}
                  {renderSection("Rates Clearance Certificates", guideline.RatesClearanceCertificates)}
                  {renderSection("Eskom", guideline.Eskom)}
                  {renderSection("Compliance Certificates", guideline.ComplianceCertificates)}
                  {renderSection("Risk and Insurance", guideline.RiskandInsurance)}
                  {renderSection("Alterations / Maintenance", guideline.Maintenance)}
                  
                  {/* COSTS Section (special formatting) */}
                  <div className="guideline-section">
                    <h4>COSTS</h4>
                    <p className="mb-3 text-muted">The following are costs/disbursements:</p>
                    <ul className="guideline-list">
                      {guideline.COSTS.map((item, i) => (
                        <li key={i} className="text-muted">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <hr/>

                  {/* Final Sections */}
                  {renderSection("CONVEYANCER", guideline.CONVEYANCER)}
                  {renderSection("CAPITAL GAINS TAX", guideline.CAPITALGAINSTAX)}
                </>
              ) : (
                <div className="alert alert-info">
                  No guidelines available. Please check back later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr/>
    </>
  );

  // Helper function to render consistent sections
  function renderSection(title, contentArray) {
    return (
      <>
        <div className="guideline-section">
          <h4>{title}</h4>
          {contentArray.map((text, i) => (
            <p key={i} className="mb-3 text-muted">{text}</p>
          ))}
        </div>
        <hr/>
      </>
    );
  }
};

export default GuidlineSeller;