import React from 'react'
import { Link } from 'react-router-dom'
import "../Assets/Css/style.css"

const HomeLoanBond = () => {
    return (
        <>
            {/* <!-- Top Bar --> */}
         {/* <!-- Header HOME_LOAN-Section --> */}

           


            {/* <!-- Calculator Section --> */}
            <section className="calculator-section bg-white">
                <div className="container text-center">
                    <h2 className="text-primary">Home Loan Calculator</h2>
                    <div className="calculator-card">
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="loan-input-group">
                                    <label className="input-label">Purchase Price</label>
                                    <div className="currency-input">
                                        <span>R</span>
                                        <input type="number" className="form-control shadow-none" id="purchasePrice" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="loan-input-group">
                                    <label className="input-label">Deposit Amount</label>
                                    <div className="currency-input">
                                        <span>R</span>
                                        <input type="number" className="form-control shadow-none" id="depositAmount" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="loan-input-group">
                                    <label className="input-label">Interest Rate</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control shadow-none" id="interestRate" placeholder="0.00" />
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="loan-input-group">
                                    <label className="input-label">Loan Term</label>
                                    <select className="form-select" id="loanTerm">
                                        <option value="2">2 Years</option>
                                        <option value="5">5 Years</option>
                                        <option value="10">10 Years</option>
                                        <option value="15">15 Years</option>
                                        <option value="20">20 Years</option>
                                        <option value="25">25 Years</option>
                                        <option value="30">30 Years</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className="calc-btn text-white" id="calculateBtn ">Calculate</button>

                        <div className="row mt-4">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="result-box">
                                    <div className="result-label">Monthly Payment</div>
                                    <div className="result-value" id="monthlyPayment">R 5,500</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="result-box">
                                    <div className="result-label">Total Loan Amount (Principal + Interest)</div>
                                    <div className="result-value" id="loanAmount">R 450,000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Banking Partners --> */}
            <section className="partners-section">
                <div className="container">
                    <h2 className="text-white">Our Banking Partners</h2>
                    <div className="row text-center">
                        <div className="col-6 col-md-3 mb-4 mb-md-0">
                            <div className="partner-icon">
                                <i className="fas fa-university text-white fs-1"></i>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4 mb-md-0">
                            <div className="partner-icon">
                                <i className="fas fa-landmark text-white fs-1"></i>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="partner-icon">
                                <i className="far fa-credit-card text-white fs-1"></i>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="partner-icon">
                                <i className="fas fa-piggy-bank text-white fs-1"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Application Form --> */}
            <section className="application-section  shadow bg-white">
                <div className="container">
                    <h1 className="text-primary text-center">Apply for Link Home Loan</h1>
                    <div className="calculator-card">
                        <form id="loanApplicationForm">
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <div className="loan-input-group">
                                        <label className="input-label">First Name</label>
                                        <input type="text" className="form-control shadow-none" id="firstName" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="loan-input-group">
                                        <label className="input-label">Last Name</label>
                                        <input type="text" className="form-control shadow-none" id="lastName" required />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <div className="loan-input-group">
                                        <label className="input-label">Email</label>
                                        <input type="email" className="form-control shadow-none" id="email" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="loan-input-group">
                                        <label className="input-label">Phone</label>
                                        <input type="tel" className="form-control shadow-none" id="phone" required />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <div className="loan-input-group">
                                        <label className="input-label">Employment Type</label>
                                        <select className="form-select" id="employmentType" required>
                                            <option value="">Select</option>
                                            <option value="Full-Time">Full Time</option>
                                            <option value="Part-Time">Part Time</option>
                                            <option value="Self-Employed">Self-Employed</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="loan-input-group">
                                        <label className="input-label">Monthly Income</label>
                                        <div className="currency-input">
                                            <span>R</span>
                                            <input type="number" className="form-control shadow-none" id="monthlyIncome" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="submit-btn text-white">Submit Application</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* <!-- Interest Rates --> */}
            <section className="rates-section bg-white ">
                <div className="container ">
                    <h2 className="text-white">Current Interest Rates</h2>
                    <div className="table-responsive rates-table shadow">
                        <table className="table  table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Rate</th>
                                    <th>Base Rate</th>
                                    <th>Prime Rate</th>
                                    <th>Max LTV</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Rank A</td>
                                    <td>7.25%</td>
                                    <td className="prime-rate">10.50%</td>
                                    <td>80%</td>
                                </tr>
                                <tr>
                                    <td>Rank B</td>
                                    <td>7.55%</td>
                                    <td className="prime-rate">10.80%</td>
                                    <td>85%</td>
                                </tr>
                                <tr>
                                    <td>Rank C</td>
                                    <td>7.85%</td>
                                    <td className="prime-rate">11.25%</td>
                                    <td>90%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>



          

        </>
    )
}

export default HomeLoanBond
