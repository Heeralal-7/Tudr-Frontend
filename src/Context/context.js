import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const MyContext = createContext();
// const URL = process.env.REACT_APP_API_URL; // e.g., http://localhost:5000
const URL = process.env.REACT_APP_API_URL;

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post(`${URL}/togouser/signin`, {
        name,
        email,
        password,
      });
      if (res.data.success) {
        setUser(res.data.deatils);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.log("not working", error.message);
      return { success: false, message: error.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${URL}/togouser/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setUser(res.data.details); // save user globally
        return {
          success: true,
          message: res.data.message,
          token: res.data.token, // ✅ include token here
        };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.log("Login error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const getuserprofile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/togouser/getuser`, {
        headers: {
          token: token,
        },
      });

      if (res.data.success) {
        return {
          success: true,
          user: res.data.data,
        };
      } else {
        return {
          success: false,
          message: res.data.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // context.js or API utility

  const createProperty = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${URL}/property/property`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Property creation error:", error.message);
      return { success: 0, message: error.message };
    }
  };

  const fetchUserProperties = async (category) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${URL}/togouser/userproperty`,
        { category }, // ✅ body
        {
          headers: {
            token, // ✅ header
          },
        }
      );

      if (res.data.success) {
        console.log("Properties:", res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch user properties:", error.message);
      return [];
    }
  };

  const editProfile = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${URL}/togouser/editProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Edit profile error:", error.message);
      return { success: 0, message: error.message };
    }
  };

  const getFilteredProperties = async (filters = {}) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/property/getproperty`, {
        headers: { token },
        params: {
          ...filters,
          // Ensure minPrice/maxPrice are numbers and empty strings are removed
          ...(filters.minPrice !== undefined && { minPrice: filters.minPrice }),
          ...(filters.maxPrice !== undefined && { maxPrice: filters.maxPrice }),
        },
      });
      return res.data;
    } catch (error) {
      console.error("Filter error:", error.response?.data || error.message);
      return { success: 0, message: error.message };
    }
  };

  const getServiceTypes = async () => {
    try {
      const res = await axios.get(`${URL}/property/getservice`);
      return res.data;
    } catch (error) {
      console.error("getServiceTypes error:", error.message);
      return { success: 0, message: error.message };
    }
  };

  const getServiceScope = async () => {
    try {
      const res = await axios.get(`${URL}/property/getServiceScope`);
      return res.data;
    } catch (error) {
      console.error("getServiceTypes error:", error.message);
      return { success: 0, message: error.message };
    }
  };

  const fetchBookService = async (bookingDetails) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${URL}/property/bookService`,
        bookingDetails,
        { headers: { token: token } }
      );
      return res.data;
    } catch (error) {
      console.error("fetchBookService error:", error.message);
      return { success: 0, message: error.message };
    }
  };

  const [status, setStatus] = useState(null);
  /**
   * submitContact()
   * @param {{ FirstName, LastName, email, Phone, Message }} form
   * @returns {Promise<boolean>} success flag
   */

  const submitContact = async (form) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${URL}/contact/contact`, form, {
        headers: { token: token },
      });
      if (res.data.success) {
        setStatus({ type: "success", msg: res.data.message });
        return true;
      } else {
        setStatus({ type: "error", msg: res.data.message });
        return false;
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || err.message,
      });
      return false;
    }
  };
  // -----------------Guideline get api ----------
  // State to store guidelines
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch guidelines function
  const fetchGuidelines = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/userguidline/getAllGuidelines`);

      if (response.data.success) {
        setGuidelines(response.data.data);
      }
    } catch (err) {
      setError("Failed to load guidelines");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  //-------------------End----------------------

  //----------------  About Us  ----------------------
  // Get api
  const [aboutUs, setAboutUs] = useState([]);

  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/about/getAboutUs`);
      if (response.data.success && response.data.data.length > 0) {
        setAboutUs(response.data.data); // Store the entire array
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // post api

  //------------------- About Us End----------------------

  //-------------------Legal-Services Start---------------
  const [consultant, setConsultant] = useState([]);

  // Fetch consultant services function
  const getConsultantService = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${URL}/consult-service/getConsultservice`
      );

      if (response.data.success) {
        setConsultant(response.data.data || []);
      } else {
        setError("Failed to fetch services");
      }
    } catch (err) {
      console.error("fetch error:", err);
      setError("Error fetching services");
    } finally {
      setLoading(false);
    }
  }, []);

  const bookConsultation = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${URL}/consultation-booking/createlegalService`,
        bookingData
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book consultation");
      setLoading(false);
      throw err;
    }
  }, []);

  //-------------------Legal-Services End-----------------
  // Digital signature

  // Upload digital signature function
  const uploadDigitalSignature = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file); // 'file' is the field name expected by multer

      const response = await axios.post(
        `${URL}/digital-signature/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to upload signature");
      throw err;
    }
  };

  //  ------digital signature End -----
  // ------Packer mover sevieces Start --------
  // Get api moving from
  const [cityFrom, setCityFrom] = useState([]);

  const fetchCityFrom = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/mover-service/getfromcity`);
      if (response.data.success && response.data.data.length > 0) {
        setCityFrom(response.data.data);
        console.log("data city from:", response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get api moving to
  const [cityTo, setCityTo] = useState([]);

  const fetchCityTo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/mover-service/gettocity`);
      if (response.data.success && response.data.data.length > 0) {
        setCityTo(response.data.data);
        console.log("data city to:", response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  // Get api Property size
  const [propertySize, setPropertySize] = useState([]);

  const fetchPropertySize = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/mover-service/getProperty-size`);
      if (response.data.success && response.data.data.length > 0) {
        setPropertySize(response.data.data);
        console.log("data Property Size:", response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Packer mover service post api
  const bookMoverServices = async (bookingData) => {
    try {
      console.log("Sending booking data:", bookingData); // Debug log

      const response = await axios.post(
        `${URL}/mover-service/create-mover-services`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Response received:", response.data); // Debug log

      if (response.data.success) {
        console.log("Packer mover services created:", response.data.data);
        return response.data;
      } else {
        console.log("Backend error:", response.data.message);
        return response.data;
      }
    } catch (error) {
      console.error("Full error object:", error); // Debug log

      if (error.response) {
        console.error("Server error:", error.response.data);
        return {
          success: 0,
          message: error.response.data.message || "Server error occurred",
          errors: error.response.data.errors || [],
        };
      } else if (error.request) {
        console.error("Network error - no response:", error.request);
        return {
          success: 0,
          message: "Network error. Please check your connection and try again.",
        };
      } else {
        console.error("Request setup error:", error.message);
        return {
          success: 0,
          message: error.message || "An unexpected error occurred",
        };
      }
    }
  };
  // ------Packer mover sevieces End --------

  // ------ property type and construction phase --------
  const [propertyTp, setPropertyType] = useState([]);

  const fetchPropertyType = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/property/getPropertyType`);
      console.log("Property Types Response:", res.data);
      if (res.data.data?.length > 0) {
        setPropertyType(res.data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyType();
  }, []);

  const [constructionP, setConstructionP] = useState([]);

  const fetchConstructionPhase = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/property/get-construction-phase`);
      console.log("Construction Phase Response:", res.data);
      if (res.data.data?.length > 0) {
        setConstructionP(res.data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConstructionPhase();
  }, []);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteProperties");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteProperties", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const existingIndex = prev.findIndex((p) => p._id === property._id);
      let newFavorites;

      if (existingIndex >= 0) {
        // Remove from favorites
        newFavorites = [...prev];
        newFavorites.splice(existingIndex, 1);
        toast.info("Property removed from favorites");
      } else {
        // Add to favorites
        newFavorites = [...prev, property];
        toast.success("Property added to favorites");
      }

      return newFavorites;
    });
  };

  const [notifications1, setNotifications] = useState([]);

  const getadminmassage = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/contactus/getAdminMessage`, {
        headers: { token },
      });

      if (res.data.success === 1) {
        const adminMessage = res.data.AdminMassage;

        const displayMessage =
          adminMessage && adminMessage.trim() !== "" ? "Received" : "Pending";

        const contactNotification = {
          id: "contact_reply",
          type: "contact_reply",
          message: displayMessage,
          fullMessage: adminMessage || "",
          date: new Date(),
          status: "unread",
        };

        setNotifications((prev) => {
          const existsIndex = prev.findIndex((n) => n.type === "contact_reply");
          if (existsIndex !== -1) {
            const updated = [...prev];
            updated[existsIndex] = contactNotification;
            return updated;
          } else {
            return [...prev, contactNotification];
          }
        });
      } else {
        const contactNotification = {
          id: "contact_reply",
          type: "contact_reply",
          message: "Pending",
          fullMessage: "",
          date: new Date(),
          status: "unread",
        };
        setNotifications((prev) => {
          const existsIndex = prev.findIndex((n) => n.type === "contact_reply");
          if (existsIndex !== -1) {
            const updated = [...prev];
            updated[existsIndex] = contactNotification;
            return updated;
          } else {
            return [...prev, contactNotification];
          }
        });
      }
    } catch (error) {
      console.error("Error fetching admin message:", error);
    }
  };

  // Auto refresh every 1 hour
  useEffect(() => {
    getadminmassage(); // run immediately
    const interval = setInterval(() => {
      getadminmassage();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // ------ Property type and construction phase End-------

  const [agreement, setAgreement] = useState(null);
  const [agreements, setAgreements] = useState([]);

  // Create new rental agreement
  // src/Context/context.js
  const createAgreement = async (formData) => {
    try {
      console.log("Creating agreement with data:", formData);
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(`${URL}/api/rental-agreements`, formData, {
        headers: {
          "Content-Type": "application/json",
          token: token, // Changed from Authorization header to token header
        },
      });

      console.log("Agreement created:", res.data);
      setAgreement(res.data.data);
      return res.data;
    } catch (err) {
      console.error("Error creating agreement:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create agreement"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get user's agreements
  const getUserAgreements = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/api/rental-agreements`, {
        headers: {
          token: token,
        },
      });

      setAgreements(res.data.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update payment status
  const updatePayment = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${URL}/api/rental-agreements/${id}/payment`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      setAgreement(res.data.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };
// --------------------Cityname -------------
const[cityName,setCityName] = useState([])
   const getCityName = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/cities/get-cities`, {
        headers: {
          token: token,
        },
      });
         console.log( "cityname",res.data)
      setCityName(res.data.data);
      return res.data;
      
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
const[propertyName,setPropertyName] = useState([])
   const getPropertyName = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/property/getPropertyType`, {
        headers: {
          token: token,
        },
      });
         console.log( "cityname",res.data)
      setPropertyName(res.data.data);
      return res.data;
      
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --------------Testimonial  fetch get api -----------------
  const[testimonials,setTestimonials] = useState([])
   const getTestimonials = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`${URL}/testimonial/getAll`, {
        headers: {
          token: token,
        },
      });
      console.log("testimonials", res.data)
      setTestimonials(res.data);
      return res.data;

    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --------------Testimonial End-----------------

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const valData = {
    user,
    register,
    login,
    logout,
    clearError,
    createProperty,
    getuserprofile,
    fetchUserProperties,
    editProfile,
    getFilteredProperties,
    getServiceTypes,
    getServiceScope,
    fetchBookService,
    submitContact,
    status,
    setStatus,
    guidelines,
    loading,
    error,
    fetchGuidelines,
    fetchAboutUs,
    aboutUs,
    getConsultantService,
    consultant,
    uploadDigitalSignature,
    bookConsultation,
    fetchCityFrom,
    cityFrom,
    cityTo,
    fetchCityTo,
    propertySize,
    fetchPropertySize,
    bookMoverServices,
    propertyTp,
    fetchPropertyType,
    constructionP,
    fetchConstructionPhase,
    favorites,
    toggleFavorite,
    notifications1,
    setNotifications,
    getadminmassage,

    // rental agreement
    agreement,
    agreements,
    createAgreement,
    getUserAgreements,
    updatePayment,
    getCityName,
    cityName,
    getPropertyName,
    propertyName,
    testimonials,
    getTestimonials,
  };

  return <MyContext.Provider value={valData}>{children}</MyContext.Provider>;
};

export default Context;
