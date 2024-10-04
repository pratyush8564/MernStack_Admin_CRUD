// src/pages/Dashboard.tsx

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/icon";
import {
  closedTicketsIcon,
  createIcon,
  deleteTicketsIcon,
  dropdownIcon,
  pendingTicketsIcon,
  totalTicketsIcon,
} from "../components/icons";
import Sidebar from "../components/Sidebar";
import Table from "../components/table";
import {
  createTicket,
  fetchTicketCounts,
  fetchTickets,
  getUserDetails,
  logoutUser,
  updateUserDetails,
} from "../formSlice";
import { AppDispatch, RootState } from "../store";
import TicketModal from "../components/TicketModal";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    userDetails,
    deletedCount,
    closedCount,
    pendingCount,
    openCount,
    // loading,
    // error,
  }: any = useSelector((state: RootState) => state.form);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [formData, setFormData] = useState({
    requestBy: "",
    subject: "",
    assignee: null, // Assignee will be handled as a file
    priority: "",
    status: "",
    createDate: "",
    dueDate: "",
  });
  const [formData1, setFormData1] = useState<{
    fullName: string;
    profileImage: File | null;
  }>({
    fullName: "",
    profileImage: null,
  });

  const [profileImageURL, setProfileImageURL] = useState<string>(
    "src/assets/flogo.png"
  ); // Default image

  const isTokenExpired: any = (token: any) => {
    if (!token) return true;
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };
  const isToastShown = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (token && !isToastShown.current) {
        if (isTokenExpired(token)) {
          try {
            await dispatch(logoutUser()).unwrap();
            localStorage.clear();
            navigate("/login");

            if (!isToastShown.current) {
              toast.error("Token Expired, Please Login Again");
              isToastShown.current = true; // Set the flag to prevent future toasts
            }
          } catch (error) {
            console.error("Logout failed:", error);
          }
        }
      }
    };

    checkToken();
  }, [dispatch, navigate]);

  // Effect to set initial values
  useEffect(() => {
    if (userDetails) {
      setFormData1({
        fullName: userDetails.fullName,
        profileImage: null, // Reset to null, we'll handle URL separately
      });

      // Set the profile image URL
      if (userDetails.profileImage) {
        setProfileImageURL(userDetails.profileImage); // Ensure this is a string URL
      } else {
        setProfileImageURL("src/assets/flogo.png"); // Default image if no profileImage
      }
    }
  }, [userDetails]);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTicketCounts());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: any) => ({
      ...prevState,
      assignee: e.target.files ? e.target.files[0] : null, // Handle file input
    }));
  };

  const resetForm = () => {
    setFormData({
      requestBy: "",
      subject: "",
      assignee: null,
      priority: "",
      status: "",
      createDate: "",
      dueDate: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("requestBy", formData.requestBy);
    form.append("subject", formData.subject);
    form.append("priority", formData.priority);
    form.append("status", formData.status);
    form.append("createDate", formData.createDate);
    form.append("dueDate", formData.dueDate);
    if (formData.assignee) {
      form.append("assigneeImage", formData.assignee); // Append file
    }

    try {
      await dispatch(createTicket(formData));
      resetForm();
      setIsModalOpen(false);
      dispatch(fetchTickets({ page: currentPage, limit, search: searchQuery }));
      dispatch(fetchTicketCounts());
      // Optionally refresh the data or show a success message
    } catch (error) {
      console.error("Error creating ticket:", error);
      // Handle error
    }
  };

  const toggleModal = () => {
    setProfileModal(!profileModal);
  };

  // Close modal
  const closeModal = () => {
    setProfileModal(false);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.clear();
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      closeModal();
    }
  };
  const handleProfile = () => {
    // Open edit modal
    setEditModal(true);
    closeModal();
  };

  // Your handleEditProfile function
  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, profileImage } = formData1;
    const updatedData: any = new FormData();
    updatedData.append("fullName", fullName);
    if (profileImage) {
      updatedData.append("profileImage", profileImage);
    }

    try {
      const response = await dispatch(updateUserDetails(updatedData)).unwrap();
      console.log("Updated user:", response.user);

      // Update local state with new user data
      setFormData1({
        fullName: response.user.fullName,
        profileImage: response.user.profileImage || null,
      });
      setProfileImageURL(response.user.profileImage || "src/assets/flogo.png"); // Update image URL
      closeEditModal();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <div className="flex-1 p-4 ml-2 mr-2 flex flex-col ">
        {/* Header */}
        <div className="flex  mb-4 justify-between  bg-white p-1">
          <div className="flex justify-center items-center font-bold text-2xl ml-4 text-[#1F485B]">Ticket Generator</div>
          <div>
          {userDetails && (
            <div className="text-right flex">
              <img
                src={profileImageURL}
                alt="Dashboard Illustration"
                className="w-12 h-12 rounded-full"
              />
              <p className="text-xl text-[#1F485B] font-semibold mt-2 ml-2">
                {userDetails.fullName}
              </p>
              <Icon
                styleClass="mt-4 ml-2 cursor-pointer"
                icon={dropdownIcon}
                action={toggleModal}
              />
              {profileModal && (
                <div
                  className="absolute right-2 mt-10 w-32 bg-white shadow-lg rounded-lg border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleProfile}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
        {editModal && userDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleEditProfile}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData1.fullName}
                    onChange={(e) =>
                      setFormData1({ ...formData1, fullName: e.target.value })
                    }
                    className="border rounded w-full px-2 py-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        setFormData1({ ...formData1, profileImage: file });
                        const imageURL = URL.createObjectURL(file); // Create URL for preview
                        setProfileImageURL(imageURL); // Update profile image URL
                      }
                    }}
                    className="border rounded w-full px-2 py-1"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-4 ">
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon
                  styleClass="h-4 w-4 rounded-full"
                  icon={totalTicketsIcon}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">{openCount}</p>
                <p className="text-sm text-gray-600">Open Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon
                  styleClass="h-4 w-4 rounded-full"
                  icon={pendingTicketsIcon}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon
                  styleClass="h-4 w-4 rounded-full"
                  icon={closedTicketsIcon}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">{closedCount}</p>
                <p className="text-sm text-gray-600">Closed Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon
                  styleClass="h-4 w-4 rounded-full"
                  icon={deleteTicketsIcon}
                />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">{deletedCount}</p>
                <p className="text-sm text-gray-600">Delete Tickets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Component */}
        <TicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          isEditMode={false}
        />
        {/* Table Component */}
        <Table
          icon={
            <div className="flex items-center mt-4  relative">
              <span className="relative group">
                <div className="flex justify-between">
                  <button
                    className="flex items-center rounded-full bg-[#1F485B] text-white p-2 gap-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Icon icon={createIcon} action={() => {}} />
                  </button>
                </div>
                <span className="hidden group-hover:block transition-opacity duration-300 ease-in-out absolute right-12 bottom-0 transform  bg-[#1F485B] text-[#fff] text-sm font-bold rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100">
                  Create Tickets
                </span>
              </span>
            </div>
          }
          searchQuery={searchQuery} // Pass searchQuery to the Table component
          setSearchQuery={setSearchQuery} // Pass setSearchQuery to handle input changes
          setCurrentPage={setCurrentPage}
        />
        <div className="pt-8"></div>

        {/* <div className="flex-grow">
          {loading ? <Loader /> : null}
          {error && <p className="text-red-500">{error}</p>}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
