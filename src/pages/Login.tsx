import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setFormData } from "../formSlice";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, loading, success, error } = useSelector(
    (state: RootState) => state.form
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   await dispatch(loginUser(formData));
    navigate("/dashboard");

  };

  return (
    <div className="flex justify-center items-center h-screen p-5 bg-[#44697B]">
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
            <input
              className="border border-t-0 border-l-0 border-r-0 w-full mt-8"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-[#1F485B] w-full rounded-lg p-3 text-white mt-8 mb-4"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
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
