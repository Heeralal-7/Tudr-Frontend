import { Route, Routes, useLocation } from "react-router-dom";
import RentAgreement from "./Components/RentAgreement/RentAgreement";
import HomeLoan from "./Components/Home-Loan/HomeLoan";
import HomeLoanBond from "./Components/HomeLoanBond/HomeLoanBond";
import BondOrientation from "./Components/bondOrientation/BondOrientation";
import Signup from "./Components/signup/Signup";
import Login from "./Components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home-Loan/Home";
import Footer from "./Components/Footer";
import GuidlineSeller from "./Components/guidlineSeller/GuidlineSeller";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/aboutUs/AboutUs";
import AiMatchProperty from "./Components/AiMatchProperty/AiMatchProperty";
import PackerMoverServices from "./Components/packerMoverServices/PackerMoverServices";
import { PropertyInsurence } from "./Components/propertyInsurence/PropertyInsurence";
import  PropertyDetails  from "./Components/propertyDetails/PropertyDetails";
import { SellerDetails } from "./Components/sellerDetails/SellerDetails";
import PropertySearch from "./Components/PropertySearch/PropertySearch";
import LegalServices from "./Components/legal-services/LegalServices";
import UserProfile from "./Components/userProfile/UserProfile";
import ListingPackages from "./Components/prizePackage/ListingPackages";
import PostProperty from "./Components/post-property/PostProperty";
function App() {

  const location = useLocation();

  // Hide Navbar and Footer on login/signup
  const hideNavAndFooter = location.pathname === '/' || location.pathname === '/login';

  return (
    <div>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* App Routes */}
        <Route path="/home" element={<Home />} />
        {/* Rent Agreement */}
        <Route path="/rentAgreement" element={<RentAgreement />} />
        {/* HomeLoan */}
        <Route path="/homeloan" element={<HomeLoan />} />
          {/* Home Loan Bond */}
        <Route path="/homeloanBond" element={<HomeLoanBond />} />
        {/* Bond Orientation */}
        <Route path="/bondOrientation" element={<BondOrientation />} />
        {/* Guidline Seller */}
        <Route path="/guidlineseller" element={< GuidlineSeller />} />
        {/* contact us */}
        <Route path="/contactus" element={< ContactUs/>} />
        {/* About us */}
        <Route path="/aboutus" element={< AboutUs/>} />
        {/* Ai Matches */}
        <Route path="/Ai-match-property" element={< AiMatchProperty/>} />
        {/* Packer Mover Services */}
        <Route path="/packermoverservices" element={< PackerMoverServices/>} />
        {/* Property Insurence */}
        <Route path="/propertyInsurence" element={< PropertyInsurence/>} />
        {/* Property Details */}
        <Route path="/propertydetails/:id" element={< PropertyDetails/>} />
        {/* Seller Details */}
        <Route path="/sellerdetails" element={< SellerDetails/>} />
        <Route path="/list-package" element={< ListingPackages/>} />
        {/* Property Search */}
        <Route path="/propertySearch" element={< PropertySearch/>} />
        {/* Ligal Services */}
        <Route path="/legalservices" element={< LegalServices/>} />
        {/* User Profile */}
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/post-property" element={<PostProperty />} />

        
      </Routes>

      {!hideNavAndFooter && <Footer />}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
