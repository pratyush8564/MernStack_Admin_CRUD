import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/icon";
import {
  closedTickets,
  createIcon,
  deleteTickets,
  pendingTickets,
  totalTickets,
} from "../components/icons";
import Sidebar from "../components/Sidebar";
import Table from "../components/table";
import { getUserDetails } from "../formSlice";
import { AppDispatch, RootState } from "../store";
import axios from "axios";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state: RootState) => state.form
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestBy: "",
    subject: "",
    assignee: null, // Assignee will be handled as a file
    priority: "",
    status: "",
    createDate: "",
    dueDate: "",
  });

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      assignee: e.target.files[0], // Handle file input
    }));
  };

  const handleSubmit = async (e: any) => {
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
      await axios.post("http://localhost:3000/api/tickets", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsModalOpen(false);
      // Optionally refresh the data or show a success message
    } catch (error) {
      console.error("Error creating ticket:", error);
      // Handle error
    }
  };

  return (
    <div className="flex h-screen gap-4">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-end mb-4">
          {userDetails && (
            <div className="text-right flex">
              <img
                src="src/assets/flogo.png"
                alt="Dashboard Illustration"
                className="w-12 h-12 rounded-full"
              />
              <p className="text-xl font-semibold mt-2 ml-2">
                {userDetails.fullName}
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-4 ">
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={totalTickets} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">83457</p>
                <p className="text-sm text-gray-600">Total Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={pendingTickets} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">83457</p>
                <p className="text-sm text-gray-600">Pending Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={closedTickets} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">83457</p>
                <p className="text-sm text-gray-600">Closed Tickets</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white text-center rounded-md">
            <div className="flex gap-4">
              <div>
                <Icon styleClass="h-4 w-4 rounded-full" icon={deleteTickets} />
              </div>
              <div className="flex flex-col items-start ">
                <p className="text-lg font-semibold">83457</p>
                <p className="text-sm text-gray-600">Delete Tickets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-4 relative">
          <span className="relative group">
            <button
              className="flex items-center rounded-full bg-[#1F485B] text-white p-2 gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Icon icon={createIcon} />
            </button>
            <span className="hidden group-hover:block transition-opacity duration-300 ease-in-out absolute right-12 bottom-0 transform  bg-[#1F485B] text-[#fff] text-sm font-bold rounded py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100">
              Create Tickets
            </span>
          </span>
        </div>

        {/* Modal with Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white p-4 rounded-lg shadow-lg relative z-10 w-96">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <h3 className="text-lg font-semibold mb-4">Create Ticket</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Request By
                  </label>
                  <input
                    type="text"
                    name="requestBy"
                    value={formData.requestBy}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Assignee (Image)
                  </label>
                  <input
                    type="file"
                    name="assignee"
                    onChange={handleFileChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Priority</label>
                  <input
                    type="text"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Create Date
                  </label>
                  <input
                    type="date"
                    name="createDate"
                    value={formData.createDate}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* table component */}
        <Table />

        <div className="flex-grow">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
