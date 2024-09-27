interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    requestBy: string;
    subject: string;
    assignee: File | null;
    priority: string;
    status: string;
    createDate: string;
    dueDate: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
}

const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleChange,
  handleFileChange,
  isEditMode,
}: any) => {
  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty values (backspacing)
    if (value === "" || /^[a-zA-Z\s]*$/.test(value)) {
      handleChange(e); // Call the original change handler
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded-lg shadow-lg relative z-10 w-96">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
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
        <h3 className="text-lg font-semibold mb-4 text-[#1F485B]">
          {isEditMode ? "Edit Ticket" : "Create Ticket"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Request By</label>
            <input
              type="text"
              name="requestBy"
              value={formData.requestBy}
              onChange={handleTextChange}
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
              onChange={handleTextChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          {formData.assignee && (
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Current Assignee
              </label>
              <img
                src={formData.assignee}
                alt="Current Assignee"
                className="rounded-full h-12 w-12 mt-1"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">
              Assignee (Image)
            </label>
            <input
              type="file"
              name="assignee"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png" // Restrict to jpg and png files
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Create Date</label>
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
              className="bg-[#1F485B] text-white px-4 py-2 rounded"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
