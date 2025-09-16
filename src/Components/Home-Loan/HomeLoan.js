import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Assets/Css/style.css";

const HomeLoan = () => {
  // Affordability Calculator State
  const [affordIncome, setAffordIncome] = useState('');
  const [affordExpenses, setAffordExpenses] = useState('');
  const [affordInterest, setAffordInterest] = useState('');
  const [affordTerm, setAffordTerm] = useState('');
  const [borrowingPower, setBorrowingPower] = useState(0);

  // Repayment Calculator State
  const [repayLoanAmount, setRepayLoanAmount] = useState('');
  const [repayInterest, setRepayInterest] = useState('');
  const [repayTerm, setRepayTerm] = useState('');
  const [repayFrequency, setRepayFrequency] = useState('Monthly');
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  // Transfer Cost Calculator State
  const [transferPrice, setTransferPrice] = useState('');
  const [propertyType, setPropertyType] = useState('House');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [stampDuty, setStampDuty] = useState(0);
  const [legalFees, setLegalFees] = useState(0);
  const [transferDuty, setTransferDuty] = useState(0);

  // Extra Payment Calculator State
  const [extraLoanAmount, setExtraLoanAmount] = useState('');
  const [extraInterest, setExtraInterest] = useState('');
  const [extraTerm, setExtraTerm] = useState('');
  const [extraAmount, setExtraAmount] = useState('');
  const [extraFrequency, setExtraFrequency] = useState('Monthly');
  const [timeSaved, setTimeSaved] = useState(0);
  const [interestSaved, setInterestSaved] = useState(0);

  // Deposit Savings Calculator State
  const [depositTarget, setDepositTarget] = useState('');
  const [depositPercent, setDepositPercent] = useState('');
  const [depositMonthly, setDepositMonthly] = useState('');
  const [depositCurrent, setDepositCurrent] = useState('');
  const [totalSaving, setTotalSaving] = useState(0);
  const [depositTime, setDepositTime] = useState(0);

  // Amortisation Calculator State
  const [amortLoanAmount, setAmortLoanAmount] = useState('');
  const [amortInterest, setAmortInterest] = useState('');
  const [amortTerm, setAmortTerm] = useState('');
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);

  // Handle input changes with validation
  const handleInputChange = (setter, value) => {
    if (value === '') {
      setter('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setter(Math.abs(numValue).toString());
    }
  };

  // Affordability Calculator
  const calculateAffordability = () => {
    const monthlyIncome = parseFloat(affordIncome) || 0;
    const monthlyExpenses = parseFloat(affordExpenses) || 0;
    const annualRate = parseFloat(affordInterest) || 0;
    const years = parseFloat(affordTerm) || 0;

    if (monthlyIncome <= 0 || years <= 0 || annualRate <= 0) {
      setBorrowingPower(0);
      return;
    }

    const availableMonthly = (monthlyIncome - monthlyExpenses) * 0.3;
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) {
      setBorrowingPower(availableMonthly * months);
    } else {
      const loanAmount = availableMonthly * (
        (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate
      );
      setBorrowingPower(loanAmount);
    }
  };

  // Repayment Calculator
  const calculateRepayment = () => {
    const loanAmount = parseFloat(repayLoanAmount) || 0;
    const annualRate = parseFloat(repayInterest) || 0;
    const years = parseFloat(repayTerm) || 0;

    if (loanAmount <= 0 || years <= 0 || annualRate <= 0) {
      setMonthlyRepayment(0);
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    const payment = (loanAmount * monthlyRate) / 
                    (1 - Math.pow(1 + monthlyRate, -months));
    
    setMonthlyRepayment(payment);
  };

  // Transfer Cost Calculator
  const calculateTransferCost = () => {
    const price = parseFloat(transferPrice) || 0;
    
    // Calculate transfer costs (example formulas)
    let stamp = 0;
    if (!isFirstTime) {
      if (propertyType === 'House') stamp = price * 0.05;
      else if (propertyType === 'Apartment') stamp = price * 0.04;
      else if (propertyType === 'Office Space') stamp = price * 0.07;
    }
    
    const legal = price * 0.01;
    const transfer = price * 0.02;
    
    setStampDuty(stamp);
    setLegalFees(legal);
    setTransferDuty(transfer);
  };

  // Extra Payment Calculator
  const calculateExtraPayment = () => {
    const loanAmount = parseFloat(extraLoanAmount) || 0;
    const annualRate = parseFloat(extraInterest) || 0;
    const years = parseFloat(extraTerm) || 0;
    const extra = parseFloat(extraAmount) || 0;

    if (loanAmount <= 0 || years <= 0 || annualRate <= 0) {
      setTimeSaved(0);
      setInterestSaved(0);
      return;
    }

    // Simplified calculation for time saved
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    
    // Without extra payments
    const monthlyPayment = (loanAmount * monthlyRate) / 
                          (1 - Math.pow(1 + monthlyRate, -months));
    
    // With extra payments
    const effectivePayment = monthlyPayment + extra;
    const newMonths = Math.ceil(
      Math.log(effectivePayment / (effectivePayment - loanAmount * monthlyRate)) / 
      Math.log(1 + monthlyRate)
    );
    
    const timeSavedYears = (months - newMonths) / 12;
    setTimeSaved(timeSavedYears > 0 ? timeSavedYears : 0);
    
    // Calculate interest savings
    const totalInterestOriginal = monthlyPayment * months - loanAmount;
    const totalInterestNew = effectivePayment * newMonths - loanAmount;
    setInterestSaved(totalInterestOriginal - totalInterestNew);
  };

  // Deposit Savings Calculator
  const calculateDepositSavings = () => {
    const target = parseFloat(depositTarget) || 0;
    const percent = parseFloat(depositPercent) || 0;
    const monthly = parseFloat(depositMonthly) || 0;
    const current = parseFloat(depositCurrent) || 0;

    if (target <= 0 || percent <= 0 || monthly <= 0) {
      setTotalSaving(0);
      setDepositTime(0);
      return;
    }

    const needed = target * (percent / 100);
    const toSave = needed - current;
    
    if (toSave <= 0) {
      setTotalSaving(current);
      setDepositTime(0);
      return;
    }

    const months = Math.ceil(toSave / monthly);
    setTotalSaving(current + monthly * months);
    setDepositTime(months / 12);
  };

  // Amortisation Calculator
  const calculateAmortisation = () => {
    const loanAmount = parseFloat(amortLoanAmount) || 0;
    const annualRate = parseFloat(amortInterest) || 0;
    const years = parseFloat(amortTerm) || 0;

    if (loanAmount <= 0 || years <= 0 || annualRate <= 0) {
      setPrincipalPaid(0);
      setInterestPaid(0);
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = (loanAmount * monthlyRate) / 
                          (1 - Math.pow(1 + monthlyRate, -months));
    
    // Calculate first year totals
    let balance = loanAmount;
    let yearInterest = 0;
    
    for (let i = 0; i < 12; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      
      yearInterest += interest;
      balance -= principal;
    }
    
    setInterestPaid(yearInterest);
    setPrincipalPaid(monthlyPayment * 12 - yearInterest);
  };

  // Reset calculators when modal is closed
  useEffect(() => {
    const resetCalculator = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.addEventListener('hidden.bs.modal', () => {
          switch (modalId) {
            case 'AffordabilityCalculatorModal':
              setAffordIncome('');
              setAffordExpenses('');
              setAffordInterest('');
              setAffordTerm('');
              setBorrowingPower(0);
              break;
            // Add cases for other calculators similarly
            default:
              break;
          }
        });
      }
    };

    const modals = [
      'AffordabilityCalculatorModal',
      'RepaymentCalculatorModal',
      'TransferCostCalculatorModal',
      'ExtraPaymentModal',
      'DepositSaving',
      'Amortisation'
    ];
    
    modals.forEach(modalId => resetCalculator(modalId));
  }, []);

  return (
    <>
      {/* Hero section */}
      <div className="container-fluid p-0 overflow-x-hidden">
        <div className="bg-loan-image d-flex justify-content-center align-items-center">
          <div>
            <h1 className="text-white fw-bold">Your Complete Home Loan &<br /> Property Solution</h1>
            <p className="text-white">Compare Rates, Calculate affordability, and apply for home loans in one place</p>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="container">
        <div className="row mt-4 py-4">
          <div className="col-md-12">
            <div className="card-loan-grid d-flex justify-content-center mx-3">
              <div className="card py-3 rounded-3 text-decoration-none mx-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-retweet fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Multiple Bank Applications</h5>
                  <p className="card-text">Apply to Multiple Banks Simultaneously</p>
                </div>
              </div>
              <div className="card py-3 rounded-3 text-decoration-none mx-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-file-lines fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Quick Pre-Approved</h5>
                  <p className="card-text">Get Pre-Approved in minutes</p>
                </div>
              </div>
              <div className="card py-3 rounded-3 text-decoration-none mx-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-user-plus fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Easy Application Process</h5>
                  <p className="card-text">Simple Online Process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Calculators */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center text-dark my-4 fw-bold">Financial Calculators</h1>
            <div className="grid-loan-card2">
              {/* Affordability Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fas fa-home fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Affordability Calculator</h5>
                  <p className="card-text">Estimates how much one can <br />afford to borrow</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-primary me-3 mt-2" data-bs-toggle="modal"
                      data-bs-target="#AffordabilityCalculatorModal">Calculate Now</button>
                  </div>
                </div>
              </div>
              
              {/* Repayment Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-calendar-days fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Repayment Calculator</h5>
                  <p className="card-text">Calculates monthly repayments based <br />on loan amount and interest rate</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-primary mt-2 me-3" data-bs-toggle="modal"
                      data-bs-target="#RepaymentCalculatorModal">Calculate Now</button>
                  </div>
                </div>
              </div>
              
              {/* Transfer Cost Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-regular fa-file fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Transfer Cost Calculator</h5>
                  <p className="card-text">Estimates legal and transfer fees <br /> associated with property purchase.</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-primary me-3 mt-2" data-bs-toggle="modal"
                      data-bs-target="#TransferCostCalculatorModal">Calculate Now</button>
                  </div>
                </div>
              </div>
              
              {/* Extra Payments Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-plus fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Extra Payments Calculator</h5>
                  <p className="card-text">Shows savings from making <br /> additional payments</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-primary mt-2 me-3" data-bs-toggle="modal"
                      data-bs-target="#ExtraPaymentModal">Calculate Now</button>
                  </div>
                </div>
              </div>
              
              {/* Deposit Savings Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-piggy-bank fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Deposit Savings Calculator</h5>
                  <p className="card-text">Assists in planning for <br /> a deposit</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn mt-2 btn-primary me-3" data-bs-toggle="modal"
                      data-bs-target="#DepositSaving">Calculate Now</button>
                  </div>
                </div>
              </div>
              
              {/* Amortisation Calculator */}
              <div className="card py-1 shadow rounded-3 text-decoration-none ps-4" style={{ width: "98%" }}>
                <div className="card-body">
                  <i className="text-blue fa-solid fa-arrow-trend-up fs-2"></i>
                  <h5 className="text-blue card-text pt-1">Amortisation Calculator</h5>
                  <p className="card-text"> Provides a detailed loan <br />repayment schedule</p>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn mt-2 btn-primary me-3" data-bs-toggle="modal"
                      data-bs-target="#Amortisation">Calculate Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ and Property Marketplace */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="card p-3 mb-4 mt-5 shadow py-4 rounded-3">
              <i className="fa-solid fa-circle-question text-blue py-1 fs-3"></i>
              <h4 className="text-blue">FAQ</h4>
              <p className="m-0">Find answer to common question about Home loans and property</p>
              <Link to="/aboutus">View More<i className="fa-solid fa-arrow-right ps-2"></i></Link>
            </div>
            <div className="card p-3 shadow py-4 rounded-3">
              <i className="fa-solid fa-circle-question text-blue py-1 fs-3"></i>
              <h4 className="text-blue">Access bond Information</h4>
              <p className="m-0">Find answer to common question about Home loans and property</p>
              <Link to="/bondOrientation">View More<i className="fa-solid fa-arrow-right ps-2"></i></Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 mt-1 p-0">
                <div className="card p-2 border-0 rounded-3">
                  <img className="rounded-3"
                    src="https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy_1258-169741.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    alt="Modern villa" />
                </div>
              </div>
              <div className="col-md-6 mt-1 p-0">
                <div className="card p-2 border-0 rounded-3">
                  <img className="rounded-3"
                    src="https://img.freepik.com/free-photo/facade-modern-house_1268-24725.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    alt="Modern house facade" />
                </div>
              </div>
              <div className="col-md-6 mt-1 p-0">
                <div className="card p-2 border-0 rounded-3">
                  <img className="rounded-3"
                    src="https://img.freepik.com/free-photo/facade-modern-house_1268-24725.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    alt="Modern house" />
                </div>
              </div>
              <div className="col-md-6 mt-1 p-0">
                <div className="card p-2 border-0 rounded-3">
                  <img className="rounded-3"
                    src="https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living-private-bedroom-wing-large-terrace-with-privacy_1258-169741.jpg?ga=GA1.1.187921789.1729142995&semt=ais_hybrid&w=740"
                    alt="Villa design" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals section */}
      <div>
        {/* Affordability Calculator Modal */}
        <div className="modal modal-lg fade" id="AffordabilityCalculatorModal" tabIndex="-1"
          aria-labelledby="AffordabilityCalculatorModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AffordabilityCalculatorModalLabel">
                  <i className="fas fa-home me-2"></i>Affordability Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="income" className="form-label fw-semibold">Monthly Income</label>
                    <input 
                      type="number"
                      min="0"
                      value={affordIncome}
                      onChange={(e) => handleInputChange(setAffordIncome, e.target.value)}
                      className="form-control py-1 shadow-none"
                      id="income"
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="expenses" className="form-label fw-semibold">Monthly Expenses</label>
                    <input 
                      type="number" 
                      min="0"
                      value={affordExpenses}
                      onChange={(e) => handleInputChange(setAffordExpenses, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="expenses" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="interest" className="form-label fw-semibold">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={affordInterest}
                      onChange={(e) => handleInputChange(setAffordInterest, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="interest" 
                      placeholder="Enter rate" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="term" className="form-label fw-semibold">Loan Term (years)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={affordTerm}
                      onChange={(e) => handleInputChange(setAffordTerm, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="term" 
                      placeholder="Enter years" 
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateAffordability}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer justify-content-center">
                <div className="text-center bg-light py-3 rounded-3 w-100">
                  <div className="fw-bold">Maximum Borrowing Power</div>
                  <div className="fs-4 fw-bold">${borrowingPower.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Repayment Calculator Modal */}
        <div className="modal modal-lg fade" id="RepaymentCalculatorModal" tabIndex="-1"
          aria-labelledby="RepaymentCalculatorModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="RepaymentCalculatorModalLabel">
                  <i className="fa-solid fa-calendar-days me-2"></i>Repayment Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="repayLoanAmount" className="form-label fw-semibold">Loan Amount</label>
                    <input 
                      type="number" 
                      min="0"
                      value={repayLoanAmount}
                      onChange={(e) => handleInputChange(setRepayLoanAmount, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="repayLoanAmount" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repayInterest" className="form-label fw-semibold">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={repayInterest}
                      onChange={(e) => handleInputChange(setRepayInterest, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="repayInterest" 
                      placeholder="Enter rate" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="repayTerm" className="form-label fw-semibold">Loan Term (years)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={repayTerm}
                      onChange={(e) => handleInputChange(setRepayTerm, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="repayTerm" 
                      placeholder="Enter years" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serviceScope" className="form-label fw-semibold">Payment Frequency</label>
                    <select 
                      className="form-select bg-light shadow-none" 
                      id="serviceScope"
                      value={repayFrequency}
                      onChange={(e) => setRepayFrequency(e.target.value)}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annually">Semi-Annually</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateRepayment}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer justify-content-center">
                <div className="text-center bg-light py-3 rounded-3 w-100">
                  <div className="fw-bold">Monthly Repayment</div>
                  <div className="fs-4 fw-bold">${monthlyRepayment.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Cost Calculator Modal */}
        <div className="modal modal-lg fade" id="TransferCostCalculatorModal" tabIndex="-1"
          aria-labelledby="TransferCostCalculatorModalLabelLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="TransferCostCalculatorModalLabelLabel">
                  <i className="fa-regular fa-file me-2"></i>Transfer Cost Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="transferPrice" className="form-label fw-semibold">Property Purchase Price</label>
                    <input 
                      type="number" 
                      min="0"
                      value={transferPrice}
                      onChange={(e) => handleInputChange(setTransferPrice, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="transferPrice" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="propertyType" className="form-label fw-semibold">Property Type</label>
                    <select 
                      className="form-select shadow-none" 
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Office Space">Office Space</option>
                    </select>
                  </div>
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input shadow-none" 
                      type="checkbox" 
                      checked={isFirstTime}
                      onChange={(e) => setIsFirstTime(e.target.checked)}
                      id="FirtTime" 
                    />
                    <label className="form-check-label" htmlFor="FirtTime">
                      First Time Buyer
                    </label>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateTransferCost}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <div className="bg-light py-3 px-3 rounded-3 w-100">
                  <p className="ms-1 mb-1 fw-bold">Estimated Transfer Cost</p>
                  <div className="d-flex justify-content-between">
                    <span>Stamp Duty</span>
                    <span>${stampDuty.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Legal Fees</span>
                    <span>${legalFees.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tranfer Duty</span>
                    <span>${transferDuty.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Payment Calculator Modal */}
        <div className="modal modal-lg fade" id="ExtraPaymentModal" tabIndex="-1" aria-labelledby="ExtraPaymentModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ExtraPaymentModalLabel">
                  <i className="fa-solid fa-plus me-2"></i>Extra Payment Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="extraLoanAmount" className="form-label fw-semibold">Loan Amount</label>
                    <input 
                      type="number"
                      min="0"
                      value={extraLoanAmount}
                      onChange={(e) => handleInputChange(setExtraLoanAmount, e.target.value)}
                      className="form-control py-1 shadow-none"
                      id="extraLoanAmount"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="extraInterest" className="form-label fw-semibold">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={extraInterest}
                      onChange={(e) => handleInputChange(setExtraInterest, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="extraInterest" 
                      placeholder="Enter rate" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="extraTerm" className="form-label fw-semibold">Loan Term (years)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={extraTerm}
                      onChange={(e) => handleInputChange(setExtraTerm, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="extraTerm" 
                      placeholder="Enter years" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="extraAmount" className="form-label fw-semibold">Extra Payment Amount</label>
                    <input 
                      type="number" 
                      min="0"
                      value={extraAmount}
                      onChange={(e) => handleInputChange(setExtraAmount, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="extraAmount" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="extraFrequency" className="form-label fw-semibold">Payment Frequency</label>
                    <select 
                      className="form-select bg-light shadow-none" 
                      id="extraFrequency"
                      value={extraFrequency}
                      onChange={(e) => setExtraFrequency(e.target.value)}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annually">Semi-Annually</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateExtraPayment}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <div className="bg-light py-3 px-3 rounded-3 w-100">
                  <p className="ms-1 mb-1 fw-bold">Savings Projection</p>
                  <div className="d-flex justify-content-between">
                    <span>Interest Saved</span>
                    <span>${interestSaved.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Time Saved</span>
                    <span>{timeSaved.toFixed(1)} years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Saving Calculator Modal */}
        <div className="modal modal-lg fade" id="DepositSaving" tabIndex="-1" aria-labelledby="DepositSavingLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="DepositSavingLabel">
                  <i className="fa-solid fa-piggy-bank me-2"></i>Deposit Saving Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="depositTarget" className="form-label fw-semibold">Target Property Price</label>
                    <input 
                      type="number" 
                      min="0"
                      value={depositTarget}
                      onChange={(e) => handleInputChange(setDepositTarget, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="depositTarget" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="depositPercent" className="form-label fw-semibold">Desired Deposit (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={depositPercent}
                      onChange={(e) => handleInputChange(setDepositPercent, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="depositPercent" 
                      placeholder="Enter percentage" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="depositMonthly" className="form-label fw-semibold">Monthly Saving Amount</label>
                    <input 
                      type="number" 
                      min="0"
                      value={depositMonthly}
                      onChange={(e) => handleInputChange(setDepositMonthly, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="depositMonthly" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="depositCurrent" className="form-label fw-semibold">Current Savings</label>
                    <input 
                      type="number" 
                      min="0"
                      value={depositCurrent}
                      onChange={(e) => handleInputChange(setDepositCurrent, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="depositCurrent" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateDepositSavings}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <div className="bg-light py-3 px-3 rounded-3 w-100">
                  <p className="ms-1 mb-1 fw-bold">Saving Plan</p>
                  <div className="d-flex justify-content-between">
                    <span>Total Saving</span>
                    <span>${totalSaving.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Time to Save</span>
                    <span>{depositTime.toFixed(1)} years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortisation Calculator Modal */}
        <div className="modal modal-lg fade" id="Amortisation" tabIndex="-1" aria-labelledby="AmortisationLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AmortisationLabel">
                  <i className="fa-solid fa-arrow-trend-up me-2"></i>Amortisation Calculator
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-2">
                    <label htmlFor="amortLoanAmount" className="form-label fw-semibold">Loan Amount</label>
                    <input 
                      type="number" 
                      min="0"
                      value={amortLoanAmount}
                      onChange={(e) => handleInputChange(setAmortLoanAmount, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="amortLoanAmount" 
                      placeholder="Enter amount" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="amortInterest" className="form-label fw-semibold">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={amortInterest}
                      onChange={(e) => handleInputChange(setAmortInterest, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="amortInterest" 
                      placeholder="Enter rate" 
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="amortTerm" className="form-label fw-semibold">Loan Term (years)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={amortTerm}
                      onChange={(e) => handleInputChange(setAmortTerm, e.target.value)}
                      className="form-control py-1 shadow-none" 
                      id="amortTerm" 
                      placeholder="Enter years" 
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 shadow-none"
                    onClick={calculateAmortisation}
                  >
                    Calculate
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <div className="bg-light py-3 px-3 rounded-3 w-100">
                  <p className="ms-1 mb-1 fw-bold">First Year Summary</p>
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Year</span>
                    <span>1</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small>Principal Paid</small>
                    <span>${principalPaid.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small>Interest Paid</small>
                    <span>${interestPaid.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <small>Total</small>
                    <span>${(principalPaid + interestPaid).toFixed(2)}</span>
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

export default HomeLoan;