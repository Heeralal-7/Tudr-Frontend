import React from 'react'
import { Link } from 'react-router-dom'

export const SellerDetails = () => {
  return (
    <>
    
  {/* <!-- section starts  --> */}
  <div className="container-fluid mt-4">
    <div className="container">
      <div className="row mt-2">
        <div className="col-md-4 sticky-filter">
          <div className="card" style={{width: "100%;"}}>
            <div style={{height: "100px;"}} className="img-div bg-dark ">
              <img style={{height: "100px" , width: "100px", marginTop: "40px", marginLeft: "30px;"}}
                src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card rounded-circle " alt="..." />
            </div>
            <div style={{marginTop: "30px;"}} className="card-body bg-white ">
              <h6 className="card-title">Ashok Kumar K B</h6>
              <div>
                <p className=" fs-7 p-0 "><span className="trusted-partners px-2 py-1 rounded-3 text-white fw-bold"><i
                      className="fa-solid fa-certificate text-white me-1"></i>
                    trusted partner </span>
                  <span className="trusted-partners2 px-2 py-1 rounded-3 text-white fw-bold ms-2"><i
                      className="fa-regular fa-user text-white me-1"></i>
                    Pro Agent </span>
                </p>
              </div>
              <hr />
              <div className="row ">
                <div className="col-4">
                  <img src="https://img.squareyards.com/connect/agencypic/agencypic_638784517362952331.jpg" width="100%"
                    alt="" />
                </div>
                <div className="col-8 p-3">
                  <h6 className="fw-bold m-0 ">Ashok Reality
                    Group</h6>
                  <p className="text-secondary">Opening
                    since:2019</p>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div className="text-center">
                    <button type="button " className="border-0 rounded-3 bg-white"><span><i style={{color: "#0E9F6E;"}}
                          className="fa-brands fa-whatsapp fs-1"></i></span></button>
                  </div>

                </div>
                <div className="col-10">
                  <button style={{backgroundColor: "var(--primary)"}} type="button"
                    className=" border-0 rounded-3 w-100 text-center py-2 "><span className="text-white g-0 m-0 ">Get Link call
                      back</span>
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <h6 style={{color: "var(--primary)"}} className="fw-bold">Photos</h6>
                </div>
                <hr />
                <div className="col-6 mt-2">
                  <img className="rounded-3"
                    src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="100%" alt="" />
                </div>
                <div className="col-6 mt-2">
                  <img className="rounded-3"
                    src="https://images.unsplash.com/photo-1747633322335-1790ca959e33?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="100%" alt=""/>
                </div>
                <div className="col-md-12 mt-3 bg-light">
                  <h6 style={{color: "var(--primary)"}} className="fw-bold">Specialization</h6>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 scroll">
          <div className="row">
            <div className="card  rounded-3 ">
              <div className="col-md-12 mt-3">
                <h5>About us</h5>
              </div>
              <hr />
              <div className="col-md-12" my-2>
                <span><i style={{color: "var(--primary)"}} className="fa-solid fa-briefcase  fs-5 "></i><span
                    className="text-dark fw-bold mx-2  ">Experience:</span>15+
                  Years</span>
              </div>
              <div className="col-md-12 my-2">
                <span><i style={{color: "var(--primary)"}} className="fa-solid fa-people-group fs-5"></i><span
                    className="text-dark fw-bold mx-2  ">Team
                    member count:</span>11-12
                  Members</span>
              </div>
              <div className="col-md-12 my-2">
                <span><i style={{color: "var(--primary);"}} className="fa-solid fa-location-dot fs-5"></i><span
                    className="text-dark fw-bold mx-2  ">Office
                    location:</span>Bank employees
                  colony</span>
              </div>
              <div className="col-md-12 my-2">
                <span><i style={{color: "var(--primary)"}} className="fa-regular fa-square-check fs-5"></i><span
                    className="text-dark fw-bold mx-2  ">Rera
                    number:</span>15+ Years</span>
              </div>
              <div className="col-md-12 my-2">
                <span><i style={{color: "var(--primary)"}} className="fa-solid fa-language fs-5"></i><span
                    className="text-dark fw-bold mx-2  ">Languages:</span>English,
                  Hindi,Kannada</span>
              </div>

            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                    type="button" role="tab" aria-controls="pills-home" aria-selected="true">Properties for
                    sale</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
                    type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Properties for
                    rent</button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white ">
                    <div className="row">
                      <div className="col-md-4 col-sm-12  ">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                              className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active  ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px;"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                              </div>
                              <div
                                className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                style={{top:"5px", right:"5px"}}>
                                <div className="d-flex justify-content-center align-items-center ">
                                  <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center rounded-circle"
                                  style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                  <i className="fa-regular fa-heart text-primary"></i>
                                </div>

                              </div>
                            </div>

                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>
                          <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8 col-sm-12 px-3  pt-3">
                        <div className="">
                          <h5 className="m-0 text-primary">2 BHK Flat for Sale in Santacruz East, Mumbai <span
                              className="float-end"><Link className="text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow"
                               to=""><i className="fa-regular fa-heart  "></i></Link></span></h5>
                          <small className="fs-7 text-dark fw-semibold"><span><i
                                className="fa-solid fa-location-dot me-1 text-primary"></i></span>Santacruz East,
                            Mumbai</small>
                          <h5 className="pt-1 text-primary">₹ 2.28 cr</h5>
                        </div>
                        <hr />
                        <div className="bg-light rounded-3 d-flex justify-content-between rounded-3 " style={{width: "100%;"}}>
                          <div className=" px-3 d-flex gap-2 align-items-center">
                            <i className="fa-solid text-primary fa-city">
                            </i>
                            <Link to="" style={{textDecoration: "none;"}}>
                              <p className="text-muted fs-7" style={{borderBottom: "1px dotted gray;"}}>Under Construction</p>
                            </Link>
                          </div>
                          <div className=" px-1 align-items-center d-flex ">
                            <div className="">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" x="0" y="0"
                                viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                className="me-2">
                                <g>
                                  <g fill="" fill-rule="nonzero">
                                    <path
                                      d="M56 15H19a4 4 0 0 0-4 4v37a4 4 0 0 0 4 4h37a4 4 0 0 0 4-4V19a4 4 0 0 0-4-4zm2 4v37a2 2 0 0 1-.074.511L38.914 37.5l19.012-19.011A2 2 0 0 1 58 19zm-2-2c.173.002.345.028.511.075L37.5 36.086 18.489 17.075A1.96 1.96 0 0 1 19 17zM17.074 56.511A2 2 0 0 1 17 56V19a2 2 0 0 1 .074-.511L36.086 37.5zM19 58a1.96 1.96 0 0 1-.511-.075L37.5 38.914l19.011 19.011A1.96 1.96 0 0 1 56 58zM1 17h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM1 60h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM10.231 26.64a1 1 0 0 0 1.538-1.28l-5-6a1.036 1.036 0 0 0-1.538 0l-5 6a1 1 0 1 0 1.538 1.28L5 22.762v29.476L1.769 48.36a1 1 0 0 0-1.538 1.28l5 6a1 1 0 0 0 1.538 0l5-6a1 1 0 1 0-1.538-1.28L7 52.238V22.762zM59 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM16 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM26.769.36a1 1 0 0 0-1.41-.128l-6 5a1 1 0 0 0 0 1.536l6 5a1 1 0 1 0 1.282-1.536L22.762 7h29.476l-3.879 3.232a1 1 0 1 0 1.282 1.536l6-5a1 1 0 0 0 0-1.536l-6-5a1 1 0 1 0-1.282 1.536L52.238 5H22.762l3.879-3.232A1 1 0 0 0 26.769.36z"
                                      fill="#0dcaf0" opacity="1" data-original="#000000" className=""></path>
                                  </g>
                                </g>
                              </svg> */}
                            </div>
                            <div className="flex-column ">
                              <h6 className="m-0  fs-7">950 sq.ft</h6>
                              <p className="text-muted fs-7">Buildup area</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p className="fs-8">Highlights: Metro Station Proximity <span className="fw-bold">*</span> Close to
                          Mall <span className="fw-bold">*</span> Gymnasium <span className="fw-bold">*</span> Swimming Pool</p>
                        <hr />

                      </div>
                    </div>

                  </div>
                  <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white ">
                    <div className="row">
                      <div className="col-md-4 col-sm-12  ">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                              className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active  ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                              </div>
                              <div
                                className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                style={{top:"5px", right:"5px"}}>
                                <div className="d-flex justify-content-center align-items-center ">
                                  <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center rounded-circle"
                                  style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                  <i className="fa-regular fa-heart text-primary"></i>
                                </div>

                              </div>
                            </div>

                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>
                          
                          <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8 col-sm-12 px-3  pt-3">
                        <div className="">
                          <h5 className="m-0 text-primary">2 BHK Flat for Sale in Santacruz East, Mumbai <span
                              className="float-end"><Link className="text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow"
                               to=""><i className="fa-regular fa-heart  "></i></Link></span></h5>
                          <small className="fs-7 text-dark fw-semibold"><span><i
                                className="fa-solid fa-location-dot me-1 text-primary"></i></span>Santacruz East,
                            Mumbai</small>
                          <h5 className="pt-1 text-primary">₹ 2.28 cr</h5>
                        </div>
                        <hr />
                        <div className="bg-light rounded-3 d-flex justify-content-between rounded-3 " style={{width: "100%;"}}>
                          <div className=" px-3 d-flex gap-2 align-items-center">
                            <i className="fa-solid text-primary fa-city">
                            </i>
                            <Link to="" style={{textDecoration: "none;"}}>
                              <p className="text-muted fs-7" style={{borderBottom: "1px dotted gray;"}}>Under Construction</p>
                            </Link>
                          </div>
                          <div className=" px-1 align-items-center d-flex ">
                            <div className="">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" x="0" y="0"
                                viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                className="me-2">
                                <g>
                                  <g fill="" fill-rule="nonzero">
                                    <path
                                      d="M56 15H19a4 4 0 0 0-4 4v37a4 4 0 0 0 4 4h37a4 4 0 0 0 4-4V19a4 4 0 0 0-4-4zm2 4v37a2 2 0 0 1-.074.511L38.914 37.5l19.012-19.011A2 2 0 0 1 58 19zm-2-2c.173.002.345.028.511.075L37.5 36.086 18.489 17.075A1.96 1.96 0 0 1 19 17zM17.074 56.511A2 2 0 0 1 17 56V19a2 2 0 0 1 .074-.511L36.086 37.5zM19 58a1.96 1.96 0 0 1-.511-.075L37.5 38.914l19.011 19.011A1.96 1.96 0 0 1 56 58zM1 17h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM1 60h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM10.231 26.64a1 1 0 0 0 1.538-1.28l-5-6a1.036 1.036 0 0 0-1.538 0l-5 6a1 1 0 1 0 1.538 1.28L5 22.762v29.476L1.769 48.36a1 1 0 0 0-1.538 1.28l5 6a1 1 0 0 0 1.538 0l5-6a1 1 0 1 0-1.538-1.28L7 52.238V22.762zM59 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM16 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM26.769.36a1 1 0 0 0-1.41-.128l-6 5a1 1 0 0 0 0 1.536l6 5a1 1 0 1 0 1.282-1.536L22.762 7h29.476l-3.879 3.232a1 1 0 1 0 1.282 1.536l6-5a1 1 0 0 0 0-1.536l-6-5a1 1 0 1 0-1.282 1.536L52.238 5H22.762l3.879-3.232A1 1 0 0 0 26.769.36z"
                                      fill="#0dcaf0" opacity="1" data-original="#000000" className=""></path>
                                  </g>
                                </g>
                              </svg> */}
                            </div>
                            <div className="flex-column ">
                              <h6 className="m-0  fs-7">950 sq.ft</h6>
                              <p className="text-muted fs-7">Buildup area</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p className="fs-8">Highlights: Metro Station Proximity <span className="fw-bold">*</span> Close to
                          Mall <span className="fw-bold">*</span> Gymnasium <span className="fw-bold">*</span> Swimming Pool</p>
                        <hr />

                      </div>
                    </div>

                  </div>
                  <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white ">
                    <div className="row">
                      <div className="col-md-4 col-sm-12  ">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                              className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active  ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                              </div>
                              <div
                                className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                style={{top:"5px", right:"5px"}}>
                                <div className="d-flex justify-content-center align-items-center ">
                                  <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center rounded-circle"
                                  style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                  <i className="fa-regular fa-heart text-primary"></i>
                                </div>

                              </div>
                            </div>

                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>
                          <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8 col-sm-12 px-3  pt-3">
                        <div className="">
                          <h5 className="m-0 text-primary">2 BHK Flat for Sale in Santacruz East, Mumbai <span
                              className="float-end"><Link className="text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow"
                               to=""><i className="fa-regular fa-heart  "></i></Link></span></h5>
                          <small className="fs-7 text-dark fw-semibold"><span><i
                                className="fa-solid fa-location-dot me-1 text-primary"></i></span>Santacruz East,
                            Mumbai</small>
                          <h5 className="pt-1 text-primary">₹ 2.28 cr</h5>
                        </div>
                        <hr />
                        <div className="bg-light rounded-3 d-flex justify-content-between rounded-3 " style={{width: "100%;"}}>
                          <div className=" px-3 d-flex gap-2 align-items-center">
                            <i className="fa-solid text-primary fa-city">
                            </i>
                            <Link to="" style={{textDecoration: "none;"}}>
                              <p className="text-muted fs-7" style={{borderBottom: "1px dotted gray;"}}>Under Construction</p>
                            </Link>
                          </div>
                          <div className=" px-1 align-items-center d-flex ">
                            <div className="">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" x="0" y="0"
                                viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                className="me-2">
                                <g>
                                  <g fill="" fill-rule="nonzero">
                                    <path
                                      d="M56 15H19a4 4 0 0 0-4 4v37a4 4 0 0 0 4 4h37a4 4 0 0 0 4-4V19a4 4 0 0 0-4-4zm2 4v37a2 2 0 0 1-.074.511L38.914 37.5l19.012-19.011A2 2 0 0 1 58 19zm-2-2c.173.002.345.028.511.075L37.5 36.086 18.489 17.075A1.96 1.96 0 0 1 19 17zM17.074 56.511A2 2 0 0 1 17 56V19a2 2 0 0 1 .074-.511L36.086 37.5zM19 58a1.96 1.96 0 0 1-.511-.075L37.5 38.914l19.011 19.011A1.96 1.96 0 0 1 56 58zM1 17h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM1 60h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM10.231 26.64a1 1 0 0 0 1.538-1.28l-5-6a1.036 1.036 0 0 0-1.538 0l-5 6a1 1 0 1 0 1.538 1.28L5 22.762v29.476L1.769 48.36a1 1 0 0 0-1.538 1.28l5 6a1 1 0 0 0 1.538 0l5-6a1 1 0 1 0-1.538-1.28L7 52.238V22.762zM59 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM16 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM26.769.36a1 1 0 0 0-1.41-.128l-6 5a1 1 0 0 0 0 1.536l6 5a1 1 0 1 0 1.282-1.536L22.762 7h29.476l-3.879 3.232a1 1 0 1 0 1.282 1.536l6-5a1 1 0 0 0 0-1.536l-6-5a1 1 0 1 0-1.282 1.536L52.238 5H22.762l3.879-3.232A1 1 0 0 0 26.769.36z"
                                      fill="#0dcaf0" opacity="1" data-original="#000000" className=""></path>
                                  </g>
                                </g>
                              </svg> */}
                            </div>
                            <div className="flex-column ">
                              <h6 className="m-0  fs-7">950 sq.ft</h6>
                              <p className="text-muted fs-7">Buildup area</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p className="fs-8">Highlights: Metro Station Proximity <span className="fw-bold">*</span> Close to
                          Mall <span className="fw-bold">*</span> Gymnasium <span className="fw-bold">*</span> Swimming Pool</p>
                        <hr />

                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                  <div className="card searchCard my-3 shadow overflow-hidden w-100 bg-white ">
                    <div className="row">
                      <div className="col-md-4 col-sm-12  ">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                          <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                              className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active  ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                              </div>
                              <div
                                className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                style={{top:"5px", right:"5px"}}>
                                <div className="d-flex justify-content-center align-items-center ">
                                  <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center rounded-circle"
                                  style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                  <i className="fa-regular fa-heart text-primary"></i>
                                </div>

                              </div>
                            </div>

                            <div className="carousel-item ">
                              <div className="position-relative  ">
                                <div className="">
                                  <img
                                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className=" m-2 w-" width="100%" height="250px" alt="..." />
                                </div>
                                <div
                                  className="position-absolute d-flex  justify-content-between p-2 w-100 align-items-center rounded-circle"
                                  style={{top:"5px", right:"5px"}}>
                                  <div className="d-flex justify-content-center align-items-center ">
                                    <button className="rounded-1 px-2 bg-info  ms-3 border-0 text-white">For sale</button>
                                  </div>
                                  <div className="d-flex justify-content-center align-items-center rounded-circle"
                                    style={{ zIndex:99 ,backgroundColor:"white",width:"30px",height:"30px"}}>
                                    <i className="fa-regular fa-heart text-primary"></i>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>
                          <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8 col-sm-12 px-3  pt-3">
                        <div className="">
                          <h5 className="m-0 text-primary">2 BHK Flat for Sale in Santacruz East, Mumbai <span
                              className="float-end"><Link className="text-dark me-3 fs-5 px-2 py-1 border rounded-circle shadow"
                               to=""><i className="fa-regular fa-heart  "></i></Link></span></h5>
                          <small className="fs-7 text-dark fw-semibold"><span><i
                                className="fa-solid fa-location-dot me-1 text-primary"></i></span>Santacruz East,
                            Mumbai</small>
                          <h5 className="pt-1 text-primary">₹ 2.28 cr</h5>
                        </div>
                        <hr />
                        <div className="bg-light rounded-3 d-flex justify-content-between rounded-3 " style={{width: "100%;"}}>
                          <div className=" px-3 d-flex gap-2 align-items-center">
                            <i className="fa-solid text-primary fa-city">
                            </i>
                            <Link to="" style={{textDecoration: "none;"}}>
                              <p className="text-muted fs-7" style={{borderBottom: "1px dotted gray;"}}>Under Construction</p>
                            </Link>
                          </div>
                          <div className=" px-1 align-items-center d-flex ">
                            <div className="">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" x="0" y="0"
                                viewBox="0 0 60 60" style="enable-background:new 0 0 512 512" xml:space="preserve"
                                className="me-2">
                                <g>
                                  <g fill="" fill-rule="nonzero">
                                    <path
                                      d="M56 15H19a4 4 0 0 0-4 4v37a4 4 0 0 0 4 4h37a4 4 0 0 0 4-4V19a4 4 0 0 0-4-4zm2 4v37a2 2 0 0 1-.074.511L38.914 37.5l19.012-19.011A2 2 0 0 1 58 19zm-2-2c.173.002.345.028.511.075L37.5 36.086 18.489 17.075A1.96 1.96 0 0 1 19 17zM17.074 56.511A2 2 0 0 1 17 56V19a2 2 0 0 1 .074-.511L36.086 37.5zM19 58a1.96 1.96 0 0 1-.511-.075L37.5 38.914l19.011 19.011A1.96 1.96 0 0 1 56 58zM1 17h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM1 60h10a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2zM10.231 26.64a1 1 0 0 0 1.538-1.28l-5-6a1.036 1.036 0 0 0-1.538 0l-5 6a1 1 0 1 0 1.538 1.28L5 22.762v29.476L1.769 48.36a1 1 0 0 0-1.538 1.28l5 6a1 1 0 0 0 1.538 0l5-6a1 1 0 1 0-1.538-1.28L7 52.238V22.762zM59 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM16 0a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zM26.769.36a1 1 0 0 0-1.41-.128l-6 5a1 1 0 0 0 0 1.536l6 5a1 1 0 1 0 1.282-1.536L22.762 7h29.476l-3.879 3.232a1 1 0 1 0 1.282 1.536l6-5a1 1 0 0 0 0-1.536l-6-5a1 1 0 1 0-1.282 1.536L52.238 5H22.762l3.879-3.232A1 1 0 0 0 26.769.36z"
                                      fill="#0dcaf0" opacity="1" data-original="#000000" className=""></path>
                                  </g>
                                </g>
                              </svg> */}
                            </div>
                            <div className="flex-column ">
                              <h6 className="m-0  fs-7">950 sq.ft</h6>
                              <p className="text-muted fs-7">Buildup area</p>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <p className="fs-8">Highlights: Metro Station Proximity <span className="fw-bold">*</span> Close to
                          Mall <span className="fw-bold">*</span> Gymnasium <span className="fw-bold">*</span> Swimming Pool</p>
                        <hr />
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
  </div>
  {/* <!-- section end  --> */}
  
 </>
  )
}
