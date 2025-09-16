import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../../src/App.css";
import { useEffect, useContext } from 'react';
import { MyContext } from "../../Context/context";

const PropertySearch = () => {
  const ImageBaseURL = process.env.REACT_APP_API_URL;
  const { getFilteredProperties, favorites, toggleFavorite } = useContext(MyContext);
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const [animatedHearts, setAnimatedHearts] = useState({});
  const heartRefs = useRef({});

  // Check if a property is favorited
  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav._id === propertyId);
  };

  // Handle favorite with animation
  const handleFavorite = (item) => {
    toggleFavorite(item);
    
    // Trigger animation
    setAnimatedHearts(prev => ({
      ...prev,
      [item._id]: true
    }));
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setAnimatedHearts(prev => ({
        ...prev,
        [item._id]: false
      }));
    }, 800);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters = {
      city: searchParams.get("city") || "",
      propertyType: searchParams.get("propertyType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    };

    (async () => {
      const res = await getFilteredProperties(filters);
      if (res.success) {
        setProperties(res.details);
      }
    })();
  }, [location.search, getFilteredProperties]);

  return (
    <>   
      <div className="container-fluid pt-2">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-lg-8 searchCard-scroll">
              <div className="shadow pb-3 p-2 bg-white">
                <div className="d-flex justify-content-between text-muted">
                  <p className="m-0">
                    <Link to="#" className="text-secondary fw-semibold text-decoration-none">home </Link>
                    / Flats for Rent in Mumbai
                  </p>
                  {/* <p className="m-0">Last Updated: May 14, 2025</p> */}
                </div>
                <div className="">
                  <p className="pb-2 m-0 pt-1 text-secondary">
                    <strong>Showing 1 - {properties.length}</strong> of {properties.length} properties
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="m-0">Flats for Rent in Mumbai</h4>
                  <div className="d-flex align-items-center" style={{ width: "300px" }}>
                    <div className="">
                      {/* <p className="m-0" style={{ width: "70px" }}>Sort by:</p> */}
                    </div>
                    {/* <select className="form-select p-1 shadow-none border border-2 py-2" aria-label="Default select example">
                      <option value="relevance">Relevance</option>
                      <option value="price_asc">Price (Low to High)</option>
                      <option value="price_desc">Price (High to Low)</option>
                      <option value="date">Date Added</option>
                    </select> */}
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                {properties.map((item, index) => (
                  <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white" key={index}>
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div id={`carouselIndicators${index}`} className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            {item.Photo.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                data-bs-target={`#carouselIndicators${index}`}
                                data-bs-slide-to={idx}
                                className={idx === 0 ? "active" : ""}
                                aria-current={idx === 0 ? "true" : undefined}
                                aria-label={`Slide ${idx + 1}`}
                              ></button>
                            ))}
                          </div>
                          <div className="carousel-inner">
                            {item.Photo.map((img, i) => (
                              <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                <div className="position-relative">
                                  <img
                                    src={`${ImageBaseURL}${img}`}
                                    width="100%"
                                    height="250px"
                                    alt="property"
                                  />
                                  <div
                                    className="position-absolute d-flex justify-content-between p-2 w-100 align-items-center rounded-circle"
                                    style={{ top: "5px", right: "5px" }}
                                  >
                                    <button className="rounded-1 px-2 bg-info ms-3 border-0 text-white">
                                      For {item.category}
                                    </button>
                                    <div
                                      className={`d-flex justify-content-center align-items-center rounded-circle ${animatedHearts[item._id] ? 'heart-pulse' : ''}`}
                                      style={{ zIndex: 99, backgroundColor: "white", width: "30px", height: "30px" }}
                                    >
                                      <button 
                                        className={`${animatedHearts[item._id] ? 'heart-animation' : ''}`}
                                        onClick={() => handleFavorite(item)}
                                      >
                                        <i className={
                                          isFavorite(item._id) 
                                            ? "fa-solid fa-heart text-danger" 
                                            : "fa-regular fa-heart text-primary"
                                        }></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselIndicators${index}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselIndicators${index}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>

                      <div className="col-md-8 col-sm-12 px-3 pt-3">
                        <h5 className="m-0 text-primary">
                          {item.propertyTitle} in {item.city}
                          <span className="float-end">
                            <div className={`${animatedHearts[item._id] ? 'heart-pulse' : ''}`}>
                              <button 
                                ref={el => heartRefs.current[item._id] = el}
                                className={`text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow ${
                                  isFavorite(item._id) ? "text-danger" : ""
                                } ${animatedHearts[item._id] ? 'heart-animation' : ''}`}
                                onClick={() => handleFavorite(item)}
                              >
                                <i className={
                                  isFavorite(item._id) 
                                    ? "fa-solid fa-heart" 
                                    : "fa-regular fa-heart"
                                }></i>
                              </button>
                            </div>
                          </span>
                        </h5>
                        <small className="fs-7 text-dark fw-semibold">
                          <i className="fa-solid fa-location-dot me-1 text-primary"></i>
                          {item.Address}
                        </small>
                        <h5 className="pt-1 text-primary">₹ {item.ExpectedPrice}</h5>
                        <hr />
                        <div className="bg-light rounded-3 d-flex justify-content-between" style={{ width: "100%" }}>
                          <div className="px-3 d-flex gap-2 align-items-center">
                            <i className="fa-solid text-primary fa-city"></i>
                            <Link to="#" style={{ textDecoration: "none" }}>
                              <p className="text-muted fs-7" style={{ borderBottom: "1px dotted gray" }}>
                                {item.ConstructionPhase}
                              </p>
                            </Link>
                          </div>
                          <div className="px-1 align-items-center d-flex me-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25px"
                              height="25px"
                              viewBox="0 0 60 60"
                              className="me-2"
                            >
                              <g><g fillRule="nonzero"><path d="M56 15H19a4 4 …" fill="#0dcaf0"></path></g></g>
                            </svg>
                            <div className="flex-column">
                              <h6 className="m-0 fs-6 py-1">{item.squareFit } (square meter)</h6>
                              <p className="text-muted m-0 fs-7">Buildup area</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p className="fs-8">{item.Description}</p>
                        <hr />
                        <div className="d-flex justify-content-end gap-3 align-items-center mt-2">
                          <span><i className="fa-solid fa-phone-volume text-primary fs-2 me-2"></i></span>
                          <Link to={`/propertydetails/${item._id}`} className="btn contact-uss-btn me-3 mb-2">
                            View More Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertySearch;