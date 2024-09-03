import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setFormData } from '../formSlice';
import { AppDispatch, RootState } from '../store';


const Signup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { formData, loading } = useSelector(
    (state: RootState) => state.form
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
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
          <p className="text-black text-lg font-bold mt-20">Create Account</p>
          <form onSubmit={handleSubmit}>
            <input
              className="border border-t-0 border-l-0 border-r-0 w-full mt-8"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <span className="mt-8">
              Already have an Account?{' '}
              <a href="/login" className="text-[#1F485B]">Log In</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
