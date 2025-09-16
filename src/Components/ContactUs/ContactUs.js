import {React,useContext,useState} from 'react'
import "../Assets/Css/style.css"
import {MyContext} from "../../Context/context"
import { toast } from "react-toastify";
const ContactUs = () => {

  const { submitContact, status } = useContext(MyContext);
const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    Phone: "",
    Message: "",
  });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyField = Object.entries(form).find(([_, v]) => !v.trim());
    if (emptyField) {
      toast.error("Please fill out all the details before sending.");
      return;
    }

    // 2️⃣ Submit via context
    const ok = await submitContact(form);
    if (ok) {
      toast.success("Message sent successfully!");
      setForm({ FirstName: "", LastName: "", email: "", Phone: "", Message: "" });
    } else {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };
  return (
    <>
      {/* <!-- Hero Section --> */}
  <div className="container-fluid overflow-x-hidden p-0">
    <div className="row">
      <div className="col-md-12">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active contuct-image1">
              <div className="contuct-black d-flex flex-column justify-content-center">
                <h4 className="text-center text-white display-3 fw-bold ">Contact Us
                </h4>
                <p className="text-center">The Story Of Your Trusted Consultant.</p>
              </div>
            </div>
            <div className="carousel-item contuct-image2">
              <div className="contuct-black d-flex flex-column justify-content-center">
                <h4 className="text-center text-white display-3 fw-bold ">Contact Us
                </h4>
                <p className="text-center">The Story Of Your Trusted Consultant.</p>
              </div>
            </div>
            <div className="carousel-item contuct-image3">
              <div className="contuct-black d-flex flex-column justify-content-center">
                <h4 className="text-center text-white display-3 fw-bold ">Contact Us
                </h4>
                <p className="text-center">The Story Of Your Trusted Consultant.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  {/* <!-- contactus --> */}
  <div className="container-fluid pt-5">
    <div className="container">
      <div className="row">
        <div className="col-md-6 pt-1">
          <img style={{borderRadius:"10px"}} src="https://onexlsoftwaresolutions.com/admin/websiteImages/gjh.jpg"
            width="100%" alt="" />
        </div>
        <div className="col-md-6 pt-4">
          <h1 className="text-dark">Contact Us</h1>
          <p>We're Here To Assist You! For Any Inquiries, Feedback, Or Support, Please Reach Out To Our Dedicated Team. We
            Are Committed To Responding To All Messages Promptly,
            Typically Within 24 Hours. Your Satisfaction Is Our Highest Priority,
            And We Look Forward To Connecting With You.</p>
          <div className="row my-2">
            <div className="col-md-12">
              <h6 className="text-secondary fs-6"><span><i
                    className="fa-solid fa-location-dot text-info fs-4 mx-2"></i></span>Office No G-111111 Ground Floor,Plot
                No E-22253 Phase 10z.mIndustrial Area,
                Goa</h6>
            </div>
          </div>
          <div className="row my-2 ">
            <div className="col-md-12">
              <h6 className="text-secondary fs-6"> <span><i className="fa-solid fa-phone text-info fs-4 mx-2"></i></span>****60
              </h6>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-12">
              <h6 className="text-secondary fs-6"><i className="fa-brands fa-whatsapp text-info fs-4 mx-2"></i>****41</h6>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-md-12">
              <h6 className="text-secondary fs-6 "><span><i className="fa-solid fa-envelope text-info fs-4 mx-2"></i></span>Abc
                @gmail.com</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* <!-- form --> */}
  <div className="container-fluid py-5 contact-form">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Get In Touch</h1>
          <p>Contact us for more information about tour packages.</p>
        </div>

        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              type="text"
              id="FirstName"
              value={form.FirstName}
              onChange={handleChange}
              className="form-control py-2 px-3 mb-3"
              placeholder="First Name"
              required
            />
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              id="LastName"
              value={form.LastName}
              onChange={handleChange}
              className="form-control py-2 px-3"
              placeholder="Last Name"
              required
            />
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="col-md-6">
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="form-control py-2 px-3 mb-3"
              placeholder="Email Address"
              required
            />
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="col-md-6">
            <input
              type="tel"
              id="Phone"
              value={form.Phone}
              onChange={handleChange}
              className="form-control py-2 px-3"
              placeholder="Phone No."
              required
            />
          </div>
          <div className="col-12">
            <textarea
              id="Message"
              value={form.Message}
              onChange={handleChange}
              className="form-control mb-3"
              rows="4"
              placeholder="Your message..."
              required
            />
          </div>
          <div className="col-12 text-center">
            <button className="btn fw-bold px-4 py-2 bg-bluecolor" type="submit">
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default ContactUs