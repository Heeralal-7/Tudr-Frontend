

import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { MyContext } from "../../Context/context"

function PackerMoverServices() {
  const {
    cityFrom,
    cityTo,
    propertySize,
    loading,
    error,
    fetchCityFrom,
    fetchCityTo,
    fetchPropertySize,
    bookMoverServices,
  } = useContext(MyContext)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cityFromId: "", 
    cityToId: "", 
    propertySizeId: "",
    dateField: "", 
  })

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  })

  // Fetch all data when component mounts
  useEffect(() => {
    fetchCityFrom()
    fetchCityTo()
    fetchPropertySize()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const { fullName, email, phone, cityFromId, cityToId, propertySizeId, dateField } = formData

    if (!fullName.trim()) return "Full name is required"
    if (!email.trim()) return "Email is required"
    if (!phone.trim()) return "Phone number is required"
    if (!cityFromId) return "Please select a city to move from"
    if (!cityToId) return "Please select a city to move to"
    if (!propertySizeId) return "Please select property size"
    if (!dateField) return "Please select moving date"

    // Email validation
    const emailRegex = /.+@.+\..+/
    if (!emailRegex.test(email)) return "Please enter a valid email"

    // Date validation
    const selectedDate = new Date(dateField)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) return "Moving date cannot be in the past"

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: validationError,
      })
      return
    }

    setSubmitStatus({ loading: true, success: false, error: null })

    try {
      // Prepare booking data - make sure field names match backend expectations
      const bookingData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        cityFromId: formData.cityFromId,
        cityToId: formData.cityToId,
        propertySizeId: formData.propertySizeId,
        dateField: formData.dateField,
      }

      console.log("Submitting booking data:", bookingData) // Debug log

      const result = await bookMoverServices(bookingData)

      if (result.success) {
        setSubmitStatus({ loading: false, success: true, error: null })
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          cityFromId: "",
          cityToId: "",
          propertySizeId: "",
          dateField: "",
        })

        // Scroll to success message
        setTimeout(() => {
          const successElement = document.querySelector(".alert-success")
          if (successElement) {
            successElement.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          error: result.message || "Booking failed. Please try again.",
        })
      }
    } catch (err) {
      console.error("Submit error:", err)
      setSubmitStatus({
        loading: false,
        success: false,
        error: err.message || "Network error. Please check your connection.",
      })
    }
  }

  return (
    <>
      {/* Packer Mover service header */}
      <div className="container-fluid py-5 bg-packmover-image">
        <div className="container">
          <div className="row text-white">
            <div className="col-md-12">
              <h1 className="text-center fw-bold py-2">
                Professional Packer and <br /> Mover Services
              </h1>
              <h5 className="text-center"> Safe, Reliable and Hassle-free Moving Experience</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Plan your move form */}
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center bg-light">
            <h3 className="text-center py-5">Plan Your Move</h3>
            <div className="col-md-10">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control py-2 shadow-none"
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control py-2 shadow-none"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control py-2 shadow-none"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control py-2 shadow-none"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Moving from *</label>
                      <select
                        name="cityFromId"
                        className="form-select py-2 shadow-none"
                        value={formData.cityFromId}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      >
                        <option value="">Select City</option>
                        {loading ? (
                          <option disabled>Loading cities...</option>
                        ) : error ? (
                          <option disabled>Error loading cities</option>
                        ) : (
                          cityFrom.map((city) => (
                            <option key={city.id || city._id} value={city.id || city._id}>
                              {city.fromCity || city.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Moving Date *</label>
                      <input
                        type="date"
                        name="dateField"
                        className="form-control py-2 shadow-none"
                        value={formData.dateField}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Moving to *</label>
                      <select
                        name="cityToId"
                        className="form-select py-2 shadow-none"
                        value={formData.cityToId}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      >
                        <option value="">Select City</option>
                        {loading ? (
                          <option disabled>Loading cities...</option>
                        ) : error ? (
                          <option disabled>Error loading cities</option>
                        ) : (
                          cityTo.map((city) => (
                            <option key={city.id || city._id} value={city.id || city._id}>
                              {city.toCity || city.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="fw-semibold pb-2 fs-4">Property Size *</label>
                      <select
                        name="propertySizeId"
                        className="form-select py-2 shadow-none"
                        value={formData.propertySizeId}
                        onChange={handleChange}
                        disabled={loading}
                        required
                      >
                        <option value="">Select Property Size</option>
                        {loading ? (
                          <option disabled>Loading sizes...</option>
                        ) : error ? (
                          <option disabled>Error loading sizes</option>
                        ) : (
                          propertySize.map((size) => (
                            <option key={size.id || size._id} value={size.id || size._id}>
                              {size.propertySize || size.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit button and status messages */}
                <div className="text-center py-4">
                  <button type="submit" className="btn btn-primary btn-lg px-5 py-3" disabled={submitStatus.loading}>
                    {submitStatus.loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Booking...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </button>

                  {submitStatus.success && (
                    <div className="alert alert-success mt-4">
                      <i className="fas fa-check-circle me-2"></i>
                      Booking successful! Our team will contact you shortly to confirm details.
                    </div>
                  )}

                  {submitStatus.error && (
                    <div className="alert alert-danger mt-4">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {submitStatus.error}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Partner section */}
      <div className="container-fluid bg-white py-5">
        <div className="container p-3">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center py-5 display-3 fw-semibold text-primary">
                Our Trusted Moving <br /> Partners
              </h1>
              <div className="card-grid d-flex flex-wrap justify-content-center gap-4">
                <Link
                  to="#"
                  className="card border-0 py-3 w-100 shadow card-white text-decoration-none text-dark"
                  style={{ maxWidth: "350px" }}
                >
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1561599514-fb20601d3f76?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="Express Movers"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Express Movers</h5>
                    <div className="text-center">
                      <ul className="list-unstyled fs-6 d-flex justify-content-center text-warning mb-1">
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star-half-stroke"></i>
                        </li>
                      </ul>
                    </div>
                    <p className="card-text text-center">4.5/5 (200+ moves)</p>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="card border-0 py-3 w-100 shadow card-white text-decoration-none text-dark"
                  style={{ maxWidth: "350px" }}
                >
                  <div className="text-center">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1663054457595-99a25ebb4522?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="Safe and Swift"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Safe and Swift</h5>
                    <div className="text-center">
                      <ul className="list-unstyled fs-6 d-flex justify-content-center text-warning mb-1">
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <p className="card-text text-center">5/5 (150+ moves)</p>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="card border-0 py-3 w-100 shadow card-white text-decoration-none text-dark"
                  style={{ maxWidth: "350px" }}
                >
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1700396050880-07754d9adbf9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      width="100px"
                      height="100px"
                      className="mt-2 rounded-circle"
                      alt="Premier Relocations"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Premier Relocations</h5>
                    <div className="text-center">
                      <ul className="list-unstyled fs-6 d-flex justify-content-center text-warning mb-1">
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-solid fa-star"></i>
                        </li>
                        <li>
                          <i className="fa-regular fa-star"></i>
                        </li>
                      </ul>
                    </div>
                    <p className="card-text text-center">4/5 (180+ moves)</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="container py-5 bg-light">
        <h2 className="text-center display-4 fw-bold mb-5">What Our Customers Say</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {/* Testimonial 1 */}
          <div className="testimonial-card p-4 text-center shadow bg-white rounded" style={{ maxWidth: "350px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <img
                src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                style={{ width: "80px", height: "80px" }}
                alt="Customer"
                className="testimonial-img me-3 rounded-circle"
              />
              <div>
                <h5 className="mb-0">John Doe</h5>
                <small className="text-muted">Cape Town</small>
              </div>
            </div>
            <p>
              "Found my dream home through Tudr in just 3 weeks! The filters made it so easy to narrow down exactly what
              I was looking for."
            </p>
            <div className="text-warning">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="testimonial-card p-4 text-center shadow bg-white rounded" style={{ maxWidth: "350px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                style={{ width: "80px", height: "80px" }}
                alt="Customer"
                className="testimonial-img me-3 rounded-circle"
              />
              <div>
                <h5 className="mb-0">Sarah Smith</h5>
                <small className="text-muted">Johannesburg</small>
              </div>
            </div>
            <p>
              "The rental agreement service saved me so much time and hassle. Professional documents ready in minutes!"
            </p>
            <div className="text-warning">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="testimonial-card p-4 text-center shadow bg-white rounded" style={{ maxWidth: "350px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                style={{ width: "80px", height: "80px" }}
                alt="Customer"
                className="testimonial-img me-3 rounded-circle"
              />
              <div>
                <h5 className="mb-0">Michael Brown</h5>
                <small className="text-muted">Durban</small>
              </div>
            </div>
            <p>
              "As a landlord, I've tried several platforms but Tudr gets me quality tenants faster than any other
              service. Highly recommended!"
            </p>
            <div className="text-warning">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PackerMoverServices
