import { Link } from "react-router-dom";
import "../Assets/Css/style.css";
import { MyContext } from "../../Context/context";
import { toast } from "react-toastify";
import React, { useEffect, useState, useContext, useRef } from "react";
import "animate.css"; // ADD THIS for animations

const UserProfile = () => {
  const Imagepath = process.env.REACT_APP_API_URL;
  const {
    getuserprofile,
    fetchUserProperties,
    editProfile,
    favorites,
    toggleFavorite,
    notifications1
  } = useContext(MyContext);

  const [animationClass, setAnimationClass] = useState("");

  const triggerAnimation = (animationName) => {
    setAnimationClass(`animate__animated ${animationName}`);
    setTimeout(() => setAnimationClass(""), 1000);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState({});
  const [properties, setProperties] = useState([]);
  const [sellproperty, setsellproperty] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    Address: "",
    profilepicture: null
  });

  const [animatedHearts, setAnimatedHearts] = useState({});
  const heartRefs = useRef({});
  const [selectedContactMessage, setSelectedContactMessage] = useState(null);

  const handleNotificationClick = (notification) => {
    if (notification.type === "contact_reply") {
      setSelectedContactMessage(
        notification.fullMessage || "No message available"
      );
    } else {
      setSelectedContactMessage(null);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some((fav) => fav._id === propertyId);
  };

  const handleFavorite = (item) => {
    toggleFavorite(item);
    setAnimatedHearts((prev) => ({
      ...prev,
      [item._id]: true
    }));
    setTimeout(() => {
      setAnimatedHearts((prev) => ({
        ...prev,
        [item._id]: false
      }));
    }, 800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfileForm((prev) => ({ ...prev, profilepicture: file }));
    }
  };

  const handleSubmitEdit = async () => {
    const formData = new FormData();
    formData.append("name", profileForm.name);
    formData.append("phone", profileForm.phone);
    formData.append("Address", profileForm.Address);

    if (profileForm.profilepicture instanceof File) {
      formData.append("profilepicture", profileForm.profilepicture);
    }

    const res = await editProfile(formData);

    if (res.success) {
      toast.success("Profile updated successfully");
      setShowEditModal(false);
      setUser((prev) => ({
        ...prev,
        name: profileForm.name,
        phone: profileForm.phone,
        Address: profileForm.Address,
        profilepicture:
          profileForm.profilepicture instanceof File
            ? res.data.profilepicture
            : prev.profilepicture
      }));
    } else {
      toast.error(res.message || "Failed to update profile");
    }
  };

  const handleEditClick = () => {
    setProfileForm({
      name: user.name || "",
      phone: user.phone || "",
      Address: user.Address || "",
      profilepicture: null
    });
    setPreviewImage(
      user.profilepicture ? `${Imagepath}/${user.profilepicture}` : null
    );
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getuserprofile();
      if (res.success) {
        setUser(res.user);
      } else {
        console.log("Error:", res.message);
      }
    };
    fetchProfile();
  }, []);

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchUserProperties("Sell");
      setProperties(data);
    };
    getProperties();
  }, []);

  useEffect(() => {
    const getrentProperties = async () => {
      const data = await fetchUserProperties("Rent");
      setsellproperty(data);
    };
    getrentProperties();
  }, []);

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "service_approved",
        message: "Your property listing has been approved",
        date: "2024-01-15",
        status: "unread"
      },
      {
        id: 3,
        type: "legal_consultation_reply",
        message: "Legal consultation response received",
        date: "2024-01-13",
        status: "unread"
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const renderPropertyCard = (item, idx) => (
    <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white" key={idx}>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <div id={`carouselIndicators${idx}`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {item.Photo.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target={`#carouselIndicators${idx}`}
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {item.Photo.map((photo, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                  <div className="position-relative">
                    <img
                      src={`${Imagepath}/${photo}`}
                      width="100%"
                      height="250px"
                      alt="Property"
                    />
                    <div
                      className="position-absolute d-flex justify-content-between p-2 w-100 align-items-center"
                      style={{ top: "5px", right: "5px" }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="rounded-1 px-2 bg-info ms-3 border-0 text-white">
                          {item.category}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselIndicators${idx}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#carouselIndicators${idx}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-8 col-sm-12 px-3 pt-3">
          <div>
            <h5 className="m-0 text-primary">
              {item.propertyTitle} <span className="float-end">
                <div className={`${animatedHearts[item._id] ? 'heart-pulse' : ''}`}>
                  <button 
                    ref={el => heartRefs.current[item._id] = el}
                    className={`text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow ${isFavorite(item._id) ? 'text-danger' : ''} ${animatedHearts[item._id] ? 'heart-animation' : ''}`}
                    onClick={() => handleFavorite(item)}
                  >
                    <i className={isFavorite(item._id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                  </button>
                </div>
              </span>
            </h5>
            <small className="fs-7 text-dark fw-semibold">
              <i className="fa-solid fa-location-dot me-1 text-primary"></i>
              {item.location}, {item.city}
            </small>
            <h5 className="pt-1 text-primary">₹ {item.ExpectedPrice}</h5>
            <h6 className="pt-1 text-primary">Address</h6>
            <p className="pt-1 text-primary"> {item.Address}</p>
          </div>    
          <hr />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-info">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <div className="position-relative d-flex flex-column align-items-center mb-3">
                      <img
                        style={{ height: "120px", width: "120px", objectFit: "cover" }}
                        className="editProfileDP rounded-circle"
                        src={previewImage || "/default.jpg"}
                        alt="Profile"
                      />
                      <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <button
                        className="btn bg-none"
                        type="button"
                        onClick={() => document.getElementById('profileImageInput').click()}
                      >
                        <i className="fa-solid fa-pen-to-square pe-2"></i>
                        <span>Edit Photo</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <form>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={profileForm.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Phone No</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={profileForm.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                          name="Address"
                          className="form-control"
                          rows="2"
                          value={profileForm.Address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-info text-white" onClick={handleSubmitEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* section starts */}
      <div className="container-fluid mt-4">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-4 shadow bg-white ">
              <div className=" text-end">
                <button className="px-2 rounded-1 text-info border-info border bg-white" onClick={handleEditClick}>
                  <span><i className="fa-solid fa-pen-to-square me-2 text-info"></i></span>Edit
                </button>
              </div>
              {user && (
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src={
                        user.profilepicture
                          ? `${Imagepath}/${user.profilepicture}`
                          : "default-avatar.png"
                      }
                      alt="Profile"
                      className="card rounded-circle"
                      style={{
                        height: "120px",
                        width: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h4 className="card-title text-info">
                      {user.name || "No Name"}
                    </h4>
                    <p className="fs-7 p-0">
                      <span className="trusted-partners px-2 py-1 rounded-3 text-white fw-bold">
                        <i className="fa-solid fa-certificate text-white me-1"></i>
                        Trusted Partner
                      </span>
                      <span className="trusted-partners2 px-2 py-1 rounded-3 text-white fw-bold ms-2">
                        <i className="fa-regular fa-user text-white me-1"></i>
                        Pro Agent
                      </span>
                    </p>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  <div className="card d-flex border-0" style={{ width: "100%" }}>
                    <div className="card-body">
                      <div className="row">
                        {user ? (
                          <>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">First Name</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">{user.name}</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">Email</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">{user.email}</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">Phone No</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">{user.phone}</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">Address</h6>
                            </div>
                            <div className="col-md-6 pb-3">
                              <h6 className="text-start">{user.Address}</h6>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            Loading user data...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           <div className="col-md-8 scroll">
      <h5 className="text-info m-0">Your Uploaded Properties</h5>
      <div className="row mt-2">
        <div className="col-md-12">
          <ul
            className="nav nav-pills infoBorderNavAndTab mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-white text-info border-bottom rounded-0 border-3"
                id="pills-rent-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-rent"
                type="button"
                role="tab"
                aria-controls="pills-rent"
                aria-selected="false"
                onClick={() => triggerAnimation("animate__fadeInLeft")}
              >
                Properties
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-white text-info border-bottom rounded-0 border-3"
                id="pills-favorite-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-favorite"
                type="button"
                role="tab"
                aria-controls="pills-favorite"
                aria-selected="false"
                onClick={() => triggerAnimation("animate__fadeInUp")}
              >
                Favorites
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-white text-info border-bottom rounded-0 border-3"
                id="pills-notification-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-notification"
                type="button"
                role="tab"
                aria-controls="pills-notification"
                aria-selected="false"
                onClick={() => triggerAnimation("animate__fadeInRight")}
              >
                Message
              </button>
            </li>
          </ul>

          <div
            className={`tab-content ${animationClass}`}
            id="pills-tabContent"
          >
            {/* Properties Tab */}
            <div
              className="tab-pane fade"
              id="pills-rent"
              role="tabpanel"
              aria-labelledby="pills-rent-tab"
            >
              {[...properties, ...sellproperty].length > 0 ? (
                [...properties, ...sellproperty].map((item, idx) =>
                  renderPropertyCard(item, idx)
                )
              ) : (
                <div className="text-center py-5">
                  <i
                    className="fa-solid fa-key text-muted"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h5 className="text-muted mt-3">No properties found</h5>
                  <p className="text-muted">
                    You haven't listed any properties yet.
                  </p>
                </div>
              )}
            </div>

            {/* Favorites Tab */}
            <div
              className="tab-pane fade"
              id="pills-favorite"
              role="tabpanel"
              aria-labelledby="pills-favorite-tab"
            >
              {favorites.length > 0 ? (
                favorites.map((item, idx) =>
                  renderPropertyCard(item, `fav-${idx}`)
                )
              ) : (
                <div className="text-center py-5">
                  <i
                    className="fa-regular fa-heart text-muted"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h5 className="text-muted mt-3">No favorite properties</h5>
                  <p className="text-muted">
                    You haven't added any properties to your favorites yet.
                  </p>
                </div>
              )}
            </div>

            {/* Notifications Tab */}
            <div
              className="tab-pane fade"
              id="pills-notification"
              role="tabpanel"
              aria-labelledby="pills-notification-tab"
            >
              <div className="row">
                <div className="col-md-12">
                  <h6 className="text-info mb-3">
                    <i className="fa-solid fa-bell me-2"></i>
                    Recent Notifications
                  </h6>

                  {notifications1 && notifications1.length > 0 ? (
                    notifications1.map((notification) => (
                      <div
                        key={notification.id}
                        className={`card mb-3 ${
                          notification.status === "unread"
                            ? "border-info"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          triggerAnimation("animate__zoomIn");
                          handleNotificationClick(notification);
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                {notification.type === "service_approved" && (
                                  <i className="fa-solid fa-check-circle text-success me-2"></i>
                                )}
                                {notification.type === "contact_reply" && (
                                  <i className="fa-solid fa-envelope text-primary me-2"></i>
                                )}
                                {notification.type ===
                                  "legal_consultation_reply" && (
                                  <i className="fa-solid fa-gavel text-warning me-2"></i>
                                )}
                                <h6 className="mb-0">
                                  {notification.type ===
                                    "service_approved" && "Service Approved"}
                                  {notification.type === "contact_reply" &&
                                    "Contact Reply"}
                                  {notification.type ===
                                    "legal_consultation_reply" &&
                                    "Legal Consultation Reply"}
                                </h6>
                                {notification.status === "unread" && (
                                  <span className="badge bg-info ms-2">New</span>
                                )}
                              </div>
                              <p className="mb-1 text-muted">
                                {notification.message}
                              </p>
                              <small className="text-muted">
                                <i className="fa-regular fa-clock me-1"></i>
                                {new Date(
                                  notification.date
                                ).toLocaleDateString()}
                              </small>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Mark as Read
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <i
                        className="fa-regular fa-bell text-muted"
                        style={{ fontSize: "3rem" }}
                      ></i>
                      <h5 className="text-muted mt-3">No notifications</h5>
                      <p className="text-muted">
                        You're all caught up! No new notifications.
                      </p>
                    </div>
                  )}

                  {/* Show API message when contact_reply is clicked */}
                  {selectedContactMessage && (
                    <div className="card mt-3 border-primary">
                      <div className="card-body">
                        <h6 className="text-primary">
                          <i className="fa-solid fa-envelope me-2"></i>Contact
                          Reply Message
                        </h6>
                        <p className="mb-0">{selectedContactMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
      {/* section end */}
    </>
  );
};

export default UserProfile;