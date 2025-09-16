import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AiMatchProperty = () => {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);

    // 1. Refined state to hold filter values, similar to the 'Home' component's structure.
    const [filters, setFilters] = useState({
        city: '',
        propertyType: 'Any',
        minPrice: '',
        maxPrice: '',
        // The 'budget' key is kept to manage the dropdown's own state
        budget: '',
    });

    // Property types for the dropdown
    const propertyTypes = ['Any', 'Apartment', 'House', 'Townhouse', 'Condo', 'Villa', 'Land'];

    useEffect(() => {
        // This is a placeholder for fetching your city data from an API.
        const fetchCities = () => {
            const mockCities = [
                { _id: 'Johannesburg', name: 'Johannesburg' },
                { _id: 'Cape Town', name: 'Cape Town' },
                { _id: 'Durban', name: 'Durban' },
                { _id: 'Pretoria', name: 'Pretoria' },
            ];
            setCities(mockCities);
        };

        fetchCities();
    }, []);

    // 2. Generic handler for simple inputs like city and property type.
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. Specific handler for the budget dropdown to set min and max prices.
    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        let minPrice = '';
        let maxPrice = '';

        if (value === 'under500k') {
            minPrice = 0;
            maxPrice = 500000;
        } else if (value === '500k-1M') {
            minPrice = 500000;
            maxPrice = 1000000;
        } else if (value === '1M-2M') {
            minPrice = 1000000;
            maxPrice = 2000000;
        } else if (value === '2Mplus') {
            minPrice = 2000000;
            maxPrice = ''; // No upper limit
        }

        setFilters(prev => ({
            ...prev,
            minPrice,
            maxPrice,
            [name]: value, // Update the 'budget' key itself
        }));
    };

    // 4. Builds the search query from the 'filters' state and navigates.
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (filters.city) {
            params.append('city', filters.city);
        }
        if (filters.propertyType && filters.propertyType !== 'Any') {
            params.append('propertyType', filters.propertyType);
        }
        if (filters.minPrice) {
            params.append('minPrice', filters.minPrice);
        }
        if (filters.maxPrice) {
            params.append('maxPrice', filters.maxPrice);
        }
        
        // Always add the category 'Sell' as this component is for buying properties
        params.append('category', 'Sell');

        // Navigate to the property search page with the constructed query string
        navigate(`/propertySearch?${params.toString()}`);
    };

    return (
        <>
            {/* <!-- Form Section --> */}
            <section className="form-section bg-white py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Tell Us Your Preferences</h2>
                    <form onSubmit={handleSearch}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="propertyType" className="form-label">Property Type</label>
                                <select
                                    className="form-select"
                                    id="propertyType"
                                    name="propertyType"
                                    value={filters.propertyType}
                                    onChange={handleFilterChange}
                                >
                                    {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="budgetRange" className="form-label">Budget Range</label>
                                <select
                                    className="form-select"
                                    id="budgetRange"
                                    name="budget"
                                    value={filters.budget}
                                    onChange={handleBudgetChange}
                                >
                                    <option value="">Any Budget</option>
                                    <option value="under500k">Under R500,000</option>
                                    <option value="500k-1M">R500,000 - R1,000,000</option>
                                    <option value="1M-2M">R1,000,000 - R2,000,000</option>
                                    <option value="2Mplus">R2,000,000+</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="city" className="form-label">Location (City)</label>
                                <select
                                    className="form-select"
                                    id="city"
                                    name="city"
                                    value={filters.city}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Select City</option>
                                    {cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary submit-button px-5">Find My Matches</button>
                        </div>
                    </form>
                </div>
            </section>

            {/* <!-- Featured Properties Section --> */}
            <section
                className="py-5 bg-light"
                data-aos="zoom-out-right"
                data-aos-duration="2000"
            >
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <h2 className="fw-bold">Featured Properties</h2>
                            <p className="text-muted">
                                Handpicked properties across South Africa
                            </p>
                        </div>
                    </div>
                    <div className="row g-4">
                        {/* Property Card 1 */}
                        <div className="col-md-4">
                            <Link to="/propertySearch?category=Sell&city=Johannesburg" className="card property-card shadow-sm h-100">
                                <div className="property-image">
                                    <img
                                        src="https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg"
                                        className="img-fluid"
                                        alt="Modern Family Home in Sandton"
                                    />
                                    <span className="property-tag">For Sale</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Modern Family Home</h5>
                                    <div className="property-price mb-2">R2,500,000</div>
                                    <div className="property-address mb-3">
                                        <i className="bi bi-geo-alt"></i> Sandton, Johannesburg
                                    </div>
                                    <div className="property-features d-flex justify-content-between border-top pt-3">
                                        <span><i className="bi bi-door-closed"></i> 3 Bed</span>
                                        <span><i className="bi bi-droplet"></i> 2 Bath</span>
                                        <span><i className="bi bi-square"></i> 240 m²</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Property Card 2 */}
                        <div className="col-md-4">
                            <Link to="/propertySearch?category=Rent&city=Cape+Town" className="card property-card shadow-sm h-100">
                                <div className="property-image">
                                    <img
                                        src="https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg"
                                        className="img-fluid"
                                        alt="Luxury Apartment in Cape Town"
                                    />
                                    <span className="property-tag">For Rent</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Luxury Apartment</h5>
                                    <div className="property-price mb-2">R15,000/month</div>
                                    <div className="property-address mb-3">
                                        <i className="bi bi-geo-alt"></i> Sea Point, Cape Town
                                    </div>
                                    <div className="property-features d-flex justify-content-between border-top pt-3">
                                        <span><i className="bi bi-door-closed"></i> 2 Bed</span>
                                        <span><i className="bi bi-droplet"></i> 2 Bath</span>
                                        <span><i className="bi bi-square"></i> 120 m²</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Property Card 3 */}
                        <div className="col-md-4">
                             <Link to="/propertySearch?category=Commercial&city=Durban" className="card property-card shadow-sm h-100">
                                <div className="property-image">
                                    <img
                                        src="https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg"
                                        className="img-fluid"
                                        alt="Commercial Office Space in Durban"
                                    />
                                    <span className="property-tag">Commercial</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Office Space</h5>
                                    <div className="property-price mb-2">R22,000/month</div>
                                    <div className="property-address mb-3">
                                        <i className="bi bi-geo-alt"></i> Umhlanga, Durban
                                    </div>
                                    <div className="property-features d-flex justify-content-between border-top pt-3">
                                        <span><i className="bi bi-building"></i> Open Plan</span>
                                        <span><i className="bi bi-square"></i> 200 m²</span>
                                        <span><i className="bi bi-p-square"></i> Parking</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <Link to="/propertySearch" className="btn btn-outline-primary">
                            View All Properties
                        </Link>
                    </div>
                </div>
            </section>

            {/* <!-- How It Works Section --> */}
            <section className="how-it-works bg-white py-5">
                <div className="container">
                    <h2 className="text-center mb-5">How Our AI Matching Works</h2>
                    <div className="row text-center">
                        <div className="col-md-3">
                            <div className="step-icon mb-3"><i className="fas fa-user-edit fs-1 text-primary"></i></div>
                            <h5>Profile Creation</h5>
                            <p className="text-muted">Tell us your preferences and what matters most to you.</p>
                        </div>
                        <div className="col-md-3">
                            <div className="step-icon mb-3"><i className="fas fa-chart-bar fs-1 text-primary"></i></div>
                            <h5>AI Analysis</h5>
                            <p className="text-muted">Our AI analyzes thousands of properties in seconds.</p>
                        </div>
                        <div className="col-md-3">
                            <div className="step-icon mb-3"><i className="fas fa-percentage fs-1 text-primary"></i></div>
                            <h5>Compatibility Score</h5>
                            <p className="text-muted">Properties are ranked by their compatibility with your needs.</p>
                        </div>
                        <div className="col-md-3">
                            <div className="step-icon mb-3"><i className="fas fa-brain fs-1 text-primary"></i></div>
                            <h5>Continuous Learning</h5>
                            <p className="text-muted">Our system learns from your feedback to improve over time.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AiMatchProperty;