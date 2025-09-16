import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Assets/Css/style.css";
const URL = process.env.REACT_APP_API_URL;
const ImageBaseURL = process.env.REACT_APP_API_URL;
const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${URL}/property/${id}`);

        if (res.data.success) {
          setProperty(res.data.property);
        } else {
          setError(res.data.message || "Unable to load property");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading property…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!property) return null;

  return (
    <>
      {/* <!-- section starts  --> */}
      <div
        className="container-fluid bg-light g-0 position-sticky top-0"
        style={{ zIndex: 999 }}
      >
        <div className="col-md-12 p-1 d-flex justify-content-center shadow-sm ">
          <div className="d-flex justify-content-between col-md-10">
            <div className="">
              <h4>{property.ExpectedPrice?.toLocaleString()}</h4>
              {/* <p>Flat in Mumbai, India, <span>60m<sup>2</sup></span></p> */}
            </div>
            {/* <div className="pt-3">
 
                             <Link className="text-black px-2 py-2 rounded-circle   shadow-sm mx-2 fs-5" to=""><i
                                className=" mx-1 my-2 fa-regular fa-heart"></i></Link> 
                            <Link className="text-black px-2 py-2 rounded-circle   shadow-sm mx-2 fs-5" to=""><i
                                className=" mx-1 my-2 fa-solid fa-share-nodes"></i></Link>
                            <Link className="text-black px-2 py-2 rounded-circle   shadow-sm mx-2 fs-5" to=""><i
                                className=" mx-1 my-2 fa-regular fa-envelope"></i></Link>
                            <Link className="text-black px-2 py-2 rounded-circle   shadow-sm mx-2 fs-5" to=""><i
                                className=" mx-1 my-2 fa-solid fa-print"></i></Link>
                        </div> */}
          </div>
        </div>
      </div>
      <div className="container-fluid bg-white">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 mt-3">
              <div
                id="propertyCarousel"
                className="carousel slide shadow"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {(property.images || property.Photo || []).map(
                    (imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      >
                        <img
                          src={
                            imgUrl.startsWith("http")
                              ? imgUrl
                              : `${URL}/${imgUrl}`
                          }
                          className="d-block w-100 rounded-3"
                          style={{ height: "400px", objectFit: "cover" }}
                          alt={`Slide ${idx + 1}`}
                        />
                      </div>
                    )
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span>Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="next"
                >
                  <span>Next</span>
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="col-md-6 my-3">
              <h3>
                {property.NumberOfBedroom || 0} Bedroom <br></br>
                {property.city || property.location || "Unknown"}
              </h3>
              <h3>₹ {property.ExpectedPrice?.toLocaleString() || "N/A"}</h3>
              <h6>{property.Address || property.address}</h6>
              <div className="mt-3">
                <p className="mb-3 fw-semibold">
                  <i className="fa-regular fa-building fs-4 me-2 text-info"></i>
                  Floor: {property.Floor || "—"}
                </p>
                <p className="mb-3 fw-semibold">
                  <i className="fa-solid fa-bed fs-4 me-2 text-info"></i>
                  Bedrooms: {property.NumberOfBedroom || "—"}
                </p>
                <p className="mb-3 fw-semibold">
                  <i className="fa-solid fa-bath fs-4 me-2 text-info"></i>
                  Bathrooms: {property.Numberofbathrooms || "—"}
                </p>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="col-md-12 my-3">
              <h5 className="fw-bold">Specifications</h5>
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  {[
                    {
                      label: "Sale price",
                      value: `₹ ${
                        property.ExpectedPrice?.toLocaleString() || "—"
                      }`,
                    },
                    { label: "Floor", value: property.Floor || "—" },
                    {
                      label: "Total rooms",
                      value: property.numberOfRoom || "—",
                    },
                    {
                      label: "Bedrooms",
                      value: property.NumberOfBedroom || "—",
                    },
                    {
                      label: "Bathrooms",
                      value: property.Numberofbathrooms || "—",
                    },
              
                    {
                      label: "Address",
                      value: property.Address || property.address || "—",
                    },
                    { label: "Location", value: property.location || "—" },
                 
                    {
                      label: "Description",
                      value: property.Description || "—",
                    },
                  ].map((row, i) => (
                    <div className="row mb-1" key={i}>
                      <div className="col-7">{row.label}</div>
                      <div className="col-5 fw-bold">{row.value}</div>
                    </div>
                  ))}
                </div>

              
                {/* <!-- Right Column --> */}
                <div className="col-md-5 col-sm-12">
                                    <div className="row">
                                        <div className="card shadow pe-5">
                                            <h6 className="mt-2 pb-2">Contact our Real Estate Experts</h6>

                                            <Link to="/sellerdetails" className="card w-100 m-3 mt-1 p-2 " >
                                                <div className="card-header bg-white mt-2 p-0 d-flex ">
                                                    <div className="">
                                                        <img className="rounded-circle"
                                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                            height="50px" width="50px" alt="" />
                                                    </div>
                                                    <div className=" ms-2">
                                                        <h5 className="p-0">Anju Bala</h5>
                                                        <p className=" fs-7 p-0 "><span className="trusted-partners px-2 py-1 rounded-1 text-white fw-bold"><i
                                                            className="fa-solid fa-certificate text-white me-1"></i> trusted
                                                            partner </span> <span className="trusted-partners2 px-2 py-1 rounded-1 text-white fw-bold ms-2"><i
                                                                className="fa-regular fa-user text-white me-1"></i> Pro Agent
                                                            </span></p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-body p-1">
                                                <input type="text" className="form-control mb-1 border-1 rounded-2 w-100  mt-3 p-2" placeholder="Name"
                                                    aria-label="Name" aria-describedby="Name*" />
                                                <input type="email" className="form-control mb-1 border-1 rounded-2 w-100  mt-3 p-2" placeholder="email"
                                                    aria-label="email" aria-describedby="Email" />
                                                <div className="input-group mb-1 border-1 rounded-2 w-100 mt-3 mb-3">
                                                    <span className="input-group-text" id="phoneNo">+91</span>
                                                    <input type="number" className="form-control shadow-none " placeholder="Phone" aria-label="Phone"
                                                        aria-describedby="phoneNo" />
                                                </div>
                                                <button className="btn contact-uss-btn w-100 text-center text-white fw-bold mb-2">Contact
                                                    now</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
              </div>
            </div>
            {/*
                        <div className="col-md-12 my-3">
                            <h5 className="mb-3 mt-2">Additional Services</h5>
                            <ul>
                                <li>
                                    <p>Online viewing is available</p>
                                </li>
                                <li>
                                    <p>Opportunity of Link remote transaction</p>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <div className="col-md-12 my-3 ">
                            <h2 className="mb-3 text-info ">Description</h2>
                            <p className="pb-4"><strong>Designer apartments in the very center of Mumbai.</strong></p>
                            <p className="pb-4"><strong>Payback period:</strong> 6.2 -9.9 years</p>
                            <p className="pb-4"><strong>A boutique apartment complex in one of the most touristic places on the island. </strong>The
                                apartment is fully furnished and has designer finishes. It is made in the style of the movie "The
                                Great Gatsby".</p>
                            <p className="pb-4"><strong>More than 50 popular cafes and restaurants nearby 5 minutes by bike to Berawa beach 6 minutes
                                by bike to the largest and most popular beach clubs:</strong> Atlas beach club and Finns beach
                                club 5 minutes by bike to the water park Supermarkets and pharmacies within walking distance.</p>
                            <p className="pb-4"><strong>Write or call us, we will select the property according to your preferences. We will arrange
                                Link secure deal with the developer!</strong></p>
                        </div>
                        <hr />
                        <div className="col-md-12 my-3">
                            <h5 className="mb-3 ">Contact seller</h5>
                            <div className="">
                                <span className="me-2">I would like to:</span>
                                <input type="checkbox" name="more-details" id="about-property" />
                                <label htmlFor="about-property">Request more details about property </label>
                                <input type="checkbox" className="ms-3 " name="more-details" id="about-appointment" />
                                <label htmlFor="about-appointment">Book an appointment</label>
                                <div className="row mt-3">
                                    <div className="col-md-6 form ">
                                        <input type="text" className="form-control shadow-none py-2 w-100  rounded-2 border-1" name="" id="" placeholder="Your name*" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control shadow-none py-2 w-100  rounded-2 border-1" name="" id=""
                                            placeholder="Your Email*" />
                                    </div>
                                    <div className="row my-3 d-flex align-items-center">
                                        <div className="col">
                                            <input type="number" className="form-control shadow-none py-2 w-100  rounded-2 border-1" name="" id=""
                                                placeholder="Your phone*" />
                                        </div>
                                        <div className="col">
                                            <div className="btn-group w-100">
                                                <button className="form-control shadow-none py-2 dropdown-toggle text-start  w-100  rounded-2 border-1 bg-white "
                                                    type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Choose Language
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                                    <Link className="dropdown-item" to="#">Action</Link>
                                                    <Link className="dropdown-item" to="#">Disabled action</Link>
                                                    <h6 className="dropdown-header">Section header</h6>
                                                    <Link className="dropdown-item" to="#">Action</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <Link className="dropdown-item" to="#">After divider action</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <input type="checkbox" className="btn-check" id="whatsapp" defaultChecked autoComplete="off" />
                                            <label className="btn" htmlFor="whatsapp">whatsapp</label>

                                            <input type="checkbox" className="btn-check" id="viber" autoComplete="off" />
                                            <label className="btn" htmlFor="viber">viber</label>

                                            <input type="checkbox" className="btn-check" id="telegram" autoComplete="off" />
                                            <label className="btn" htmlFor="telegram">telegram</label>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <textarea className="form-control ms-3  p-2 rounded-2 border-1 bg-white"
                                            placeholder="What would you like to know bout this property?" id=""
                                            style={{ height: "150px", width: "100%" }}></textarea>

                                    </div>



                                </div>

                            </div>

                        </div>*/}

            {/* <!-- owl crausel  --> */}

            {/* <!-- owl crausel end --> */}
          </div>
        </div>
      </div>

      <div className="container-fluid more-properties ">
        <div className="owl-carousel owl-theme">
          {/* <!-- Property 1 --> */}
          <div className="item">
            <div className="property-card">
              <div
                className="property-image"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/1454805/pexels-photo-1454805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
              >
                <div className="property-info">
                  <h4 className="fs-5 fw-bold mb-1">Embassy Edge</h4>
                  <p className="mb-1 small">Devanahalli, Bangalore</p>
                  <p className="mb-1">₹ 60.95 Lac to 87.17 Lac</p>
                  <p className="mb-0 small">
                    2, 3 BHK Flats
                    <br />
                    983 Sq. Ft. to 1406 Sq. Ft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Property 2 --> */}
          <div className="item">
            <div className="property-card">
              <div
                className="property-image"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/2188882/pexels-photo-2188882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
              >
                <div className="property-info">
                  <h4 className="fs-5 fw-bold mb-1">Arvind The Park</h4>
                  <p className="mb-1 small">Devanahalli, Bangalore</p>
                  <p className="mb-1">₹ 71.00 Lac to 1.32 Cr</p>
                  <p className="mb-0 small">
                    Plot
                    <br />
                    1291 Sq. Ft. to 2400 Sq. Ft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Property 3 --> */}
          <div className="item">
            <div className="property-card">
              <div
                className="property-image"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/32136085/pexels-photo-32136085/free-photo-of-urban-residential-building-with-trash-bins-and-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
              >
                <div className="property-info">
                  <h4 className="fs-5 fw-bold mb-1">
                    Puravankara Tivoli Hills
                  </h4>
                  <p className="mb-1 small">Devanahalli, Bangalore</p>
                  <p className="mb-1">₹ 84.00 Lac to 2.24 Cr</p>
                  <p className="mb-0 small">
                    Plot
                    <br />
                    1200 Sq. Ft. to 3200 Sq. Ft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Property 4 --> */}
          <div className="item">
            <div className="property-card">
              <div
                className="property-image"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/2556003/pexels-photo-2556003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
              >
                <div className="property-info">
                  <h4 className="fs-5 fw-bold mb-1">Prestige Lake Ridge</h4>
                  <p className="mb-1 small">Electronic City, Bangalore</p>
                  <p className="mb-1">₹ 75.50 Lac to 1.65 Cr</p>
                  <p className="mb-0 small">
                    2, 3, 4 BHK Flats
                    <br />
                    1150 Sq. Ft. to 2200 Sq. Ft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Property 5 --> */}
          <div className="item">
            <div className="property-card">
              <div
                className="property-image"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/3543572/pexels-photo-3543572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                }}
              >
                <div className="property-info">
                  <h4 className="fs-5 fw-bold mb-1">Godrej Eternity</h4>
                  <p className="mb-1 small">Whitefield, Bangalore</p>
                  <p className="mb-1">₹ 95.00 Lac to 1.85 Cr</p>
                  <p className="mb-0 small">
                    3, 4 BHK Villas
                    <br />
                    1800 Sq. Ft. to 3500 Sq. Ft.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal click whatsapp\ and request Link call button --> */}
      {/* <div className="modal fade" id="ContactModal" tabIndex="-1" aria-labelledby="ContactModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-2">
                        <div className="card w-100 pe-5 ">
                            <h6 className="mt-2 ms-2">Contact our Real Estate Experts</h6>

                            <div className="card w-100 m-3 mt-1 p-2 ">
                                <div className="card-header bg-white p-0 d-flex ">
                                    <div className="">
                                        <img className="rounded-circle"
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            height="50px" width="50px" alt="" />
                                    </div>
                                    <div className=" ms-2">
                                        <h5 className="p-0">Anju Bala</h5>
                                        <p className=" fs-7 p-0 "><span className="trusted-partners px-2 py-1 rounded-1 text-white fw-bold"><i
                                            className="fa-solid fa-certificate text-white me-1"></i> trusted partner </span>
                                            <span className="trusted-partners2 px-2 py-1 rounded-1 text-white fw-bold ms-2"><i
                                                className="fa-regular fa-user text-white me-1"></i> Pro Agent </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body p-1">
                                    <input type="text" className="form-control mb-1 border-1 rounded-2 w-100  mt-3 p-2" placeholder="Name"
                                        aria-label="Name" aria-describedby="Name*" />
                                    <input type="email" className="form-control mb-1 border-1 rounded-2 w-100  mt-3 p-2" placeholder="email"
                                        aria-label="email" aria-describedby="Email" />
                                    <div className="input-group mb-1 border-1 rounded-2 w-100 mt-3 mb-3">
                                        <span className="input-group-text" id="phoneNo">+91</span>
                                        <input type="number" className="form-control " placeholder="Phone" aria-label="Phone"
                                            aria-describedby="phoneNo" />
                                    </div>
                                    <button className="contact-uss-btn w-100 py-2 rounded-3 border-0 text-center text-white fw-bold mb-2 ">Contact now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      {/* 
            <div className=" floting-contact">
                <div className="d-flex justify-content-end align-items-center me-3 my-2">
                    <Link
                        type="button"
                        className="btn border-0 bg-transparent"
                        data-bs-toggle="modal"
                        data-bs-target="#ContactModal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 512 512"
                            className=""
                        >
                            <g>
                                <path
                                    d="M256.064 0h-.128C114.784 0 0 114.816 0 256c0 56 18.048 107.904 48.736 150.048l-31.904 95.104 98.4-31.456C155.712 496.512 204 512 256.064 512 397.216 512 512 397.152 512 256S397.216 0 256.064 0z"
                                    fill="#4caf50"
                                />
                                <path
                                    d="M405.024 361.504c-6.176 17.44-30.688 31.904-50.24 36.128-13.376 2.848-30.848 5.12-89.664-19.264-75.232-31.168-123.68-107.616-127.456-112.576-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624 26.176-62.304c6.176-6.304 16.384-9.184 26.176-9.184 3.168 0 6.016.16 8.576.288 7.52.32 11.296.768 16.256 12.64 6.176 14.88 21.216 51.616 23.008 55.392 1.824 3.776 3.648 8.896 1.088 13.856-2.4 5.12-4.512 7.392-8.288 11.744-3.776 4.352-7.36 7.68-11.136 12.352-3.456 4.064-7.36 8.416-3.008 15.936 4.352 7.36 19.392 31.904 41.536 51.616 28.576 25.44 51.744 33.568 60.032 37.024 6.176 2.56 13.536 1.952 18.048-2.848 5.728-6.176 12.8-16.416 20-26.496 5.12-7.232 11.584-8.128 18.368-5.568 6.912 2.4 43.488 20.48 51.008 24.224 7.52 3.776 12.48 5.568 14.304 8.736 1.792 3.168 1.792 18.048-4.384 35.52z"
                                    fill="#fafafa"
                                />
                            </g>
                        </svg>
                    </Link>
                    <Link type="button" className="contact-uss-btn rounded-3 mx-3 py-2 px-3" data-bs-toggle="modal"
                        data-bs-target="#ContactModal">Request Link Call</Link>


                </div>
            </div> */}
    </>
  );
};
export default PropertyDetails;
