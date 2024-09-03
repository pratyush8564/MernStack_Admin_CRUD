

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onEdit, onDelete }:any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-lg shadow-lg relative z-10 w-80">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <button className="w-full p-2 mb-2 text-white bg-blue-500 rounded" onClick={onEdit}>Edit</button>
        <button className="w-full p-2 text-white bg-red-500 rounded" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
