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
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Home Routes - Fixed to match navbar navigation */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {/* App Routes */}
        <Route path="/rentAgreement" element={<RentAgreement />} />
        <Route path="/homeloan" element={<HomeLoan />} />
        <Route path="/homeloanBond" element={<HomeLoanBond />} />
        <Route path="/bondOrientation" element={<BondOrientation />} />
        
        {/* Fixed case sensitivity issues */}
        <Route path="/GuidlineSeller" element={<GuidlineSeller />} />
        <Route path="/guidlineseller" element={<GuidlineSeller />} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        
        <Route path="/Ai-match-property" element={<AiMatchProperty/>} />
        <Route path="/packermoverservices" element={<PackerMoverServices/>} />
        <Route path="/propertyInsurence" element={<PropertyInsurence/>} />
        <Route path="/propertydetails/:id" element={<PropertyDetails/>} />
        <Route path="/sellerdetails" element={<SellerDetails/>} />
        <Route path="/list-package" element={<ListingPackages/>} />
        <Route path="/propertySearch" element={<PropertySearch/>} />
        <Route path="/legalservices" element={<LegalServices/>} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/post-property" element={<PostProperty />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;