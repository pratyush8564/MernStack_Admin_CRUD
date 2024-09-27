import { useDispatch, useSelector } from "react-redux";
import { loginUser, setFormData } from "../formSlice";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
// import {jwtDecode} from 'jwt-decode';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, loading, error } = useSelector(
    (state: RootState) => state.form
  );

  // Local state for validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));

    // Clear specific error messages on input change
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailPattern.test(email);
  };

  // const isTokenExpired:any = (token:any) => {
  //   if (!token) return true;
  //   try {
  //     const decodedToken:any = jwtDecode(token);
  //     const currentTime = Date.now() / 1000;
  //     return decodedToken.exp < currentTime;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return true;
  //   }
  // };


  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     if (isTokenExpired(token)) {
  //       localStorage.clear();
  //       toast.error("Token Expired, Please Login Again");
  //       navigate("/login");
  //     } 
  //   }
  // }, []);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate email
    if (!formData.email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      setEmailError("Invalid email address.");
      hasError = true;
    }

    // Validate password
    if (!formData.password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    // If there's an error, prevent submission
    if (hasError) return;

    // Dispatch login action
    await dispatch(loginUser(formData)).then((x: any) => {
      if (x?.payload?.statusCode === 200 && x?.payload?.token) {
        localStorage.setItem("token", x.payload.token);
        toast.success("Login successful!");
  
        // Optionally store user data in local storage or state
        const userData = { email: formData.email }; // Adjust based on your user data structure
        localStorage.setItem("user", JSON.stringify(userData));
  
        navigate("/dashboard");
      } else if (x.payload?.statusCode === 401) {
        localStorage.clear();
        toast.error("Your Token is Expired, Please Login Again");
        navigate("/login");
      } else {
        toast.error("Please check your email and password.");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen p-5 bg-[#44697B]">
      {loading ? <Loader/> : null}
      <div className="relative h-[40rem] w-[60rem] rounded-lg bg-white shadow-lg p-5">
        <div className="absolute top-0 left-0 h-full w-[20rem] bg-[#1F485B] rounded-s-lg p-3 flex flex-col">
          <img src="src/assets/flogo.png" className="w-24 mb-4" alt="logo" />
          <p className="text-white text-2xl">
            Getting
            <br /> Started With
            <br /> VR Creation
          </p>
          <img
            src="src/assets/abstraction.png"
            className="mt-auto w-[50rem] h-[50rem] ml-20"
            alt="image"
          />
        </div>
        <div className="ml-[25rem] p-4">
          <p className="text-black text-lg font-bold mt-20">Log In</p>
          <form onSubmit={handleSubmit}>
            <input
              className="border border-t-0 border-l-0 border-r-0 w-full mt-8"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"   
            />
            {emailError && <p className="text-red">{emailError}</p>}{" "}
            {/* Email error message */}
            <input
              className="border border-t-0 border-l-0 border-r-0 w-full mt-8"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="off"
            />
            {passwordError && <p className="text-red">{passwordError}</p>}{" "}
            {/* Password error message */}
            <button
              type="submit"
              className="bg-[#1F485B] w-full rounded-lg p-3 text-white mt-8 mb-4"
              disabled={loading}
            >
             Log In
            </button>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* API error message */}
            <span className="mt-8">
              Don’t have an Account?{" "}
              <a href="/signup" className="text-[#1F485B]">
                Sign Up
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
