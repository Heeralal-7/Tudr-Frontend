// src/Components/PostProperty.js

import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../Context/context"; // Adjust path as needed
import { toast } from "react-toastify";
import "../Assets/Css/style.css"; // Ensure this path is correct for the new component

const PostProperty = () => {
  const {
    createProperty,
    propertyTp,
    fetchPropertyType,
    loading, 
    error, 
   
  } = useContext(MyContext);

  // Property listing state
  const [formData, setFormData] = useState({
    category: "Rent",
    location: "",
    city: "",
    squareFit: "",
    propertyTitle: "",
    propertyTypeId: "",
    Description: "",
    ExpectedPrice: "",
    MaintenanceCharges: "",
    Photos: [],
    Floor: "",
    numberOfRoom: "",
    NumberOfBedroom: "",
    Numberofbathrooms: "",
    ConstructionPhaseId: "",
    DateOfconstruction: "",
    Address: "",
    RentalPeriod: "",
    Occupacy: "",
    CommercialType: "",
  });



  // UI state
  const [step, setStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Rent");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Fetch Property Types and Construction Phases on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        await fetchPropertyType();
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch property types:", err);
          toast.error("Failed to load property data for listing");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); // Depend on the context functions

  // AOS Init (for styling, keep it here or in a global useEffect if more pervasive)
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init();
    });

    // Property form steps UI logic (moved here for encapsulation)
    const propertyTypes = document.querySelectorAll(".property-type-option");
    propertyTypes.forEach((type) => {
      type.addEventListener("click", function () {
        propertyTypes.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      });
    });

    const steps = document.querySelectorAll(".step");
    const indicators = document.querySelectorAll(".step-indicator");

    let currentStep = 0; // Initialize currentStep for local UI logic

    const updateStepUI = (newStep) => {
      steps[currentStep]?.classList.remove("active");
      indicators[currentStep]?.classList.remove("active");
      steps[newStep]?.classList.add("active");
      indicators[newStep]?.classList.add("active");

      if (newStep > currentStep) {
        indicators[currentStep]?.classList.add("completed");
      }

      currentStep = newStep;
    };

    // Note: The original code used event listeners for next/prev buttons.
    // For React, it's generally better to let React manage state and updates.
    // I'll keep the `updateStep` logic tied to the `step` state.
    // The `property-type-option` class logic is fine as is if it's purely visual.

    // Cleanup for event listeners (if any were added here for next/prev)
    return () => {
      // Remove any event listeners if they were added dynamically to DOM outside React's lifecycle
    };
  }, []); // Empty dependency array means this runs once on mount

  // Update UI when `step` state changes
  useEffect(() => {
    const stepsElements = document.querySelectorAll(".step");
    const indicatorsElements = document.querySelectorAll(".step-indicator");

    stepsElements.forEach((el, index) => {
      el.classList.toggle("active", index + 1 === step);
    });

    indicatorsElements.forEach((el, index) => {
      el.classList.toggle("active", index + 1 === step);
      el.classList.toggle("completed", index + 1 < step);
    });
  }, [step]); // Re-run when step changes

  // Property listing handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, Photos: files }));
    if (errors.Photos) {
      setErrors((prev) => ({ ...prev, Photos: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.location.trim())
        newErrors.location = "Location is required";
      if (!formData.city.trim()) newErrors.city = "City/District is required";
    } else if (step === 2) {
      if (!formData.propertyTitle.trim())
        newErrors.propertyTitle = "Property title is required";
      if (!formData.propertyTypeId)
        newErrors.propertyTypeId = "Property type is required";
      if (!formData.Description.trim())
        newErrors.Description = "Description is required";
    } else if (step === 3) {
      if (!formData.ExpectedPrice)
        newErrors.ExpectedPrice = "Expected price is required";
      else if (isNaN(formData.ExpectedPrice))
        newErrors.ExpectedPrice = "Must be a valid number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.Photos || formData.Photos.length === 0) {
      newErrors.Photos = "At least one photo is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    const fd = new FormData();

    fd.append("category", formData.category);
    fd.append("location", formData.location);
    fd.append("city", formData.city);
    fd.append("squareFit", formData.squareFit);
    fd.append("propertyTitle", formData.propertyTitle);
    fd.append("propertyTypeId", formData.propertyTypeId);
    fd.append("Description", formData.Description);
    fd.append("ExpectedPrice", formData.ExpectedPrice);
    fd.append("Floor", formData.Floor);
    fd.append("numberOfRoom", formData.numberOfRoom);
    fd.append("NumberOfBedroom", formData.NumberOfBedroom);
    fd.append("Numberofbathrooms", formData.Numberofbathrooms);
    fd.append("DateOfconstruction", formData.DateOfconstruction);
    fd.append("Address", formData.Address);
    fd.append("RentalPeriod", formData.RentalPeriod);
    fd.append("Occupacy", formData.Occupacy);
    fd.append("CommercialType", formData.CommercialType);

    if (formData.MaintenanceCharges) {
      fd.append("MaintenanceCharges", formData.MaintenanceCharges);
    }

    formData.Photos.forEach((photo) => {
      fd.append("Photo", photo);
    });

    try {
      const res = await createProperty(fd);

      if (res.success) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);

        // Reset form
        setFormData({
          category: "Rent",
          location: "",
          city: "",
          squareFit: "",
          propertyTitle: "",
          propertyTypeId: "",
          Description: "",
          ExpectedPrice: "",
          MaintenanceCharges: "",
          Photos: [],
          Floor: "",
          numberOfRoom: "",
          NumberOfBedroom: "",
          Numberofbathrooms: "",
          DateOfconstruction: "",
          Address: "",
          RentalPeriod: "",
          Occupacy: "",
          CommercialType: "",
        });
        setStep(1);
        setActiveCategory("Rent"); // Reset active category as well
      } else {
        setSubmitMessage({
          type: "error",
          text: res.message || "Failed to list property",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitMessage({
        type: "error",
        text: err.message || "An error occurred during submission",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
    

  return (
    <div className="property-sell" >
      <div className="form-card-card">
        <div className="form-header">
          <h2 className="text-primary">
            <i className="fas fa-home text-primary"></i> List Your Property
          </h2>
          <p className="text-black">
            Get your property in front of thousands of potential buyers and
            tenants
          </p>
        </div>

        <div className="form-content">
          <div className="property-types">
            <div
              className={`property-type-option ${
                activeCategory === "Rent" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("Rent")}
            >
              <i className="fas fa-building"></i>
              <span>Rent</span>
            </div>
            <div
              className={`property-type-option ${
                activeCategory === "Sell" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("Sell")}
            >
              <i className="fas fa-home"></i>
              <span>Sell</span>
            </div>
            <div
              className={`property-type-option ${
                activeCategory === "Commercial" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("Commercial")}
            >
              <i className="fas fa-store"></i>
              <span>Commercial</span>
            </div>
            <div
              className={`property-type-option ${
                activeCategory === "PG" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("PG")}
            >
              <i className="fas fa-bed"></i>
              <span>PG</span>
            </div>
          </div>

          <div className="progress-wrapper">
            <div className="step-indicators">
              <div
                className={`step-indicator ${step >= 1 ? "active" : ""}`}
              >
                <div className="step-number">1</div>
                <div className="step-label">Location</div>
              </div>
              <div
                className={`step-indicator ${step >= 2 ? "active" : ""}`}
              >
                <div className="step-number">2</div>
                <div className="step-label">Details</div>
              </div>
              <div
                className={`step-indicator ${step >= 3 ? "active" : ""}`}
              >
                <div className="step-number">3</div>
                <div className="step-label">Pricing</div>
              </div>
              <div
                className={`step-indicator ${step >= 4 ? "active" : ""}`}
              >
                <div className="step-number">4</div>
                <div className="step-label">Photos</div>
              </div>
            </div>
          </div>

          <form id="propertyForm" onSubmit={handleSubmit}>
            <div className="form-steps">
              <div className={`step ${step === 1 ? "active" : ""}`}>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className={`form-control shadow-none ${
                      errors.location ? "is-invalid" : ""
                    }`}
                    placeholder="Enter exact property location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">City/District</label>
                  <input
                    type="text"
                    name="city"
                    className={`form-control shadow-none ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    placeholder="Enter city or district"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                <div className="form-actions">
                  <div></div>
                  <button
                    type="button"
                    className="btn btn-primary next-step"
                    onClick={handleNext}
                  >
                    Continue <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className={`step ${step === 2 ? "active" : ""}`}>
                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className={`form-control shadow-none ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Rent">Rent</option>
                    <option value="Sell">Sell</option>
                    <option value="Commercial">Commercial</option>
                    <option value="PG">PG</option>
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Property Title</label>
                  <input
                    type="text"
                    name="propertyTitle"
                    className={`form-control shadow-none ${
                      errors.propertyTitle ? "is-invalid" : ""
                    }`}
                    placeholder="E.g., Spacious 2 BHK Apartment with Balcony"
                    value={formData.propertyTitle}
                    onChange={handleChange}
                  />
                  {errors.propertyTitle && (
                    <div className="invalid-feedback">
                      {errors.propertyTitle}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select
                    name="propertyTypeId"
                    className={`form-select py-2 shadow-none ${
                      errors.propertyTypeId ? "is-invalid" : ""
                    }`}
                    value={formData.propertyTypeId}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Select Property Type</option>

                    {loading ? (
                      <option disabled>Loading property types...</option>
                    ) : error ? (
                      <option disabled>Error loading property types</option>
                    ) : (
                      propertyTp.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.propertyType}
                        </option>
                      ))
                    )}
                  </select>

                  {errors.propertyTypeId && (
                    <div className="invalid-feedback">
                      {errors.propertyTypeId}
                    </div>
                  )}
                </div>
                <div className="col-12 mb-3 form-group">
                  <label className="form-label fw-semibold">
                    Square Fit (optional)
                  </label>
                  <input
                    name="squareFit"
                    className={`form-control shadow-none ${
                      errors.squareFit ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Property Size..."
                    rows="1"
                    value={formData.squareFit}
                    onChange={handleChange}
                  />
                  {errors.squareFit && (
                    <div className="invalid-feedback">{errors.squareFit}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 form-group">
                  <label className="form-label fw-semibold">Floor</label>
                  <input
                    type="text"
                    name="Floor"
                    className={`form-control shadow-none ${
                      errors.Floor ? "is-invalid" : ""
                    }`}
                    placeholder="Enter floor number"
                    value={formData.Floor}
                    onChange={handleNumberChange}
                  />
                  {errors.Floor && (
                    <div className="invalid-feedback">{errors.Floor}</div>
                  )}
                </div>

                <div className="col-md-12 mb-3 form-group">
                  <label className="form-label fw-semibold">
                    Total number of rooms
                  </label>
                  <input
                    type="text"
                    name="numberOfRoom"
                    className={`form-control shadow-none ${
                      errors.numberOfRoom ? "is-invalid" : ""
                    }`}
                    placeholder="Enter total rooms"
                    value={formData.numberOfRoom}
                    onChange={handleNumberChange}
                  />
                  {errors.numberOfRoom && (
                    <div className="invalid-feedback">
                      {errors.numberOfRoom}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3 form-group">
                  <label className="form-label fw-semibold">
                    Number of bedrooms
                  </label>
                  <input
                    type="text"
                    name="NumberOfBedroom"
                    className={`form-control shadow-none ${
                      errors.NumberOfBedroom ? "is-invalid" : ""
                    }`}
                    placeholder="Enter number of bedrooms"
                    value={formData.NumberOfBedroom}
                    onChange={handleNumberChange}
                  />
                  {errors.NumberOfBedroom && (
                    <div className="invalid-feedback">
                      {errors.NumberOfBedroom}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3 form-group">
                  <label className="form-label fw-semibold">
                    Number of bathrooms
                  </label>
                  <input
                    type="text"
                    name="Numberofbathrooms"
                    className={`form-control shadow-none ${
                      errors.Numberofbathrooms ? "is-invalid" : ""
                    }`}
                    placeholder="Enter number of bathrooms"
                    value={formData.Numberofbathrooms}
                    onChange={handleNumberChange}
                  />
                  {errors.Numberofbathrooms && (
                    <div className="invalid-feedback">
                      {errors.Numberofbathrooms}
                    </div>
                  )}
                </div>

                <div className="col-md-12 mb-3 form-group">
                  <label className="form-label fw-semibold">
                    Date of construction
                  </label>
                  <input
                    type="text"
                    name="DateOfconstruction"
                    className={`form-control shadow-none ${
                      errors.DateOfconstruction ? "is-invalid" : "" // Corrected error key
                    }`}
                    placeholder="Enter year (e.g., 2024)"
                    value={formData.DateOfconstruction}
                    onChange={handleNumberChange}
                  />
                  {errors.DateOfconstruction && ( // Corrected error key
                    <div className="invalid-feedback">
                      {errors.DateOfconstruction}
                    </div>
                  )}
                </div>
                {/* Rental Period */}
                {formData.category === "Rent" && (
                  <div className="form-group">
                    <label className="form-label">Rental Period</label>
                    <input
                      type="text"
                      name="RentalPeriod"
                      className={`form-control shadow-none ${
                        errors.RentalPeriod ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Rental Period (e.g., Monthly, Yearly)"
                      value={formData.RentalPeriod}
                      onChange={handleChange}
                    />
                    {errors.RentalPeriod && (
                      <div className="invalid-feedback">
                        {errors.RentalPeriod}
                      </div>
                    )}
                  </div>
                )}

                {/* Occupacy */}
                {formData.category === "PG" && (
                  <div className="form-group">
                    <label className="form-label">Occupancy</label>
                    <input
                      type="text"
                      name="Occupacy"
                      className={`form-control shadow-none ${
                        errors.Occupacy ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Occupancy type (e.g., Single, Shared)"
                      value={formData.Occupacy}
                      onChange={handleChange}
                    />
                    {errors.Occupacy && (
                      <div className="invalid-feedback">{errors.Occupacy}</div>
                    )}
                  </div>
                )}

                {/* Commercial Type */}
                {formData.category === "Commercial" && (
                  <div className="form-group">
                    <label className="form-label">Commercial Type</label>
                    <input
                      type="text"
                      name="CommercialType"
                      className={`form-control shadow-none ${
                        errors.CommercialType ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Commercial Type (e.g., Office Space, Retail)"
                      value={formData.CommercialType}
                      onChange={handleChange}
                    />
                    {errors.CommercialType && (
                      <div className="invalid-feedback">
                        {errors.CommercialType}
                      </div>
                    )}
                  </div>
                )}
                <div className="col-12 mb-3 form-group">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="Address"
                    className={`form-control shadow-none ${
                      errors.Address ? "is-invalid" : "" // Corrected error key
                    }`}
                    placeholder="Enter complete address (e.g., Indonesia, Kerobokan, Jalan Bumbak Dauh, 26a)"
                    rows="3"
                    value={formData.Address}
                    onChange={handleChange}
                  />
                  {errors.Address && ( // Corrected error key
                    <div className="invalid-feedback">{errors.Address}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control shadow-none ${
                      errors.Description ? "is-invalid" : ""
                    }`}
                    name="Description"
                    rows="4"
                    placeholder="Describe your property features, amenities, and neighborhood"
                    value={formData.Description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.Description && (
                    <div className="invalid-feedback">
                      {errors.Description}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary prev-step"
                    onClick={handlePrev}
                  >
                    <i className="fas fa-arrow-left"></i> Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary next-step"
                    onClick={handleNext}
                  >
                    Continue <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className={`step ${step === 3 ? "active" : ""}`}>
                <div className="form-group">
                  <label className="form-label">Expected Price</label>
                  <input
                    type="text"
                    name="ExpectedPrice"
                    className={`form-control shadow-none ${
                      errors.ExpectedPrice ? "is-invalid" : ""
                    }`}
                    placeholder="Enter expected price"
                    value={formData.ExpectedPrice}
                    onChange={handleChange}
                  />
                  {errors.ExpectedPrice && (
                    <div className="invalid-feedback">
                      {errors.ExpectedPrice}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Maintenance Charges (if any)
                  </label>
                  <input
                    type="text"
                    name="MaintenanceCharges"
                    className="form-control shadow-none"
                    placeholder="Enter maintenance charges"
                    value={formData.MaintenanceCharges}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary prev-step"
                    onClick={handlePrev}
                  >
                    <i className="fas fa-arrow-left"></i> Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary next-step"
                    onClick={handleNext}
                  >
                    Continue <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div className={`step ${step === 4 ? "active" : ""}`}>
                <div className="form-group">
                  <label className="form-label">Upload Photos</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*"
                      id="property-photos-upload"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="property-photos-upload"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: "20px",
                        border: "2px dashed #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                      }}
                    >
                      <i
                        className="fas fa-upload"
                        style={{
                          fontSize: "24px",
                          marginBottom: "10px",
                        }}
                      ></i>
                      <p style={{ margin: 0 }}>
                        Click to upload property photos
                      </p>
                    </label>
                  </div>
                  {errors.Photos && (
                    <div className="text-danger mt-2">{errors.Photos}</div>
                  )}
                  {formData.Photos.length > 0 && (
                    <div className="mt-2">
                      Selected:{" "}
                      {formData.Photos.map((photo, index) => (
                        <div key={index}>{photo.name}</div>
                      ))}
                    </div>
                  )}
                </div>

                {submitMessage.text && (
                  <div
                    className={`alert alert-${
                      submitMessage.type === "success" ? "success" : "danger"
                    } mt-3`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary prev-step"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-arrow-left"></i> Back
                  </button>
                  <button
                    type="submit"
                    className="btn bg-success text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit <i className="fas fa-check-circle"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {showSuccessPopup && (
              <div
                className="modal fade show"
                tabIndex="-1"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
                aria-modal="true"
                role="dialog"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Success</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowSuccessPopup(false)}
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      <i
                        className="fas fa-check-circle text-success"
                        style={{ fontSize: "3rem" }}
                      ></i>
                      <h4 className="mt-3">
                        Your property has been uploaded successfully!
                      </h4>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setShowSuccessPopup(false)}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;