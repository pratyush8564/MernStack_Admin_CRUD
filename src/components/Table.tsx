// src/components/Table.tsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Icon from "./icon";
import { deleteIcon, editIcon } from "./icons";
import TicketModal from "./TicketModal";
import ConfirmModal from "./ConfirmModal";
import { fetchTickets, updateTicket, deleteTicket } from "../formSlice";
import { RootState, AppDispatch } from "../store";

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets,totalCount, loading, error }:any = useSelector(
    (state: RootState) => state.form
  );
  console.log(tickets, "ticketss")
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState(""); 
const [currentPage, setCurrentPage] = useState(1); // Current page number
const [limit, setLimit] = useState(10);

  const [formData, setFormData] = useState({
    requestBy: "",
    subject: "",
    assignee: null,
    priority: "",
    status: "",
    createDate: "",
    dueDate: "",
  });

  useEffect(() => {
    dispatch(fetchTickets({ page: currentPage, limit, search: searchQuery }));
  }, [dispatch, currentPage, limit, searchQuery]);
  

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setFormData({
      requestBy: row.requestBy,
      subject: row.subject,
      assignee: row.assignee,
      priority: row.priority,
      status: row.status,
      createDate: row.createDate,
      dueDate: row.dueDate,
    });
    setIsTicketModalOpen(true);
  };


  const handleDeleteClick = (row: any) => {
    setSelectedRow(row);
    setIsConfirmModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState:any) => ({
      ...prevState,
      assignee: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRow) {
      await dispatch(
        updateTicket({ id: selectedRow._id, ticketData: formData })
      );
      setIsTicketModalOpen(false);
      dispatch(fetchTickets({ page: currentPage, limit: 10, search: searchQuery }));
    }
  };

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRow) {
      await dispatch(deleteTicket(selectedRow._id));
      setIsConfirmModalOpen(false);
      dispatch(fetchTickets({ page: currentPage, limit: 10, search: searchQuery } ));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };    


  const getPriorityClasses = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-light-cyan text-teal';
      case 'medium':
        return 'bg-light-pink text-orange';
      case 'high':
        return 'bg-light-peach text-red';
      default:
        return 'bg-transparent text-black'; // Fallback for unknown priorities
    }
  };

  const   getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-[#F3FCF7] text-[#61D48A]'; // Light green background and green text
      case 'closed':
        return 'bg-[#FAFAFB] text-[#414258]'; // Light gray background and dark text
      default:
        return 'bg-transparent text-black'; // Fallback for unknown statuses
    }
  };
  

  const columns = [
    {
      name: "ID",
      selector: (row: any, index: any) => index + 1,
      sortable: true,
    },
    {
      name: "Request by",
      selector: (row: any) => row.requestBy,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row: any) => row.subject,
      sortable: true,
    },
    {
      name: "Assignee",
      selector: (row: any) => (
        <img src={row.assignee} className="rounded-full h-[50px] w-[50px]" />
      ),
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row: any) => row.priority,
      sortable: true,
      cell: (row: any) => {
        const priorityClasses = getPriorityClasses(row.priority);
  
        return (
          <div
            className={`p-2 w-[80px] text-center rounded-full font-bold ${priorityClasses}`}
          >
            {row.priority}
          </div>
        );
      },
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => {
        const statusClasses = getStatusClasses(row.status);
  
        return (
          <div
            className={`p-2 w-[80px] text-center rounded-full font-bold ${statusClasses}`}
          >
            {row.status}
          </div>
        );
      },
    },
    {
      name: "Create Date",
      selector: (row: any) => new Date(row.createDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row: any) => new Date(row.dueDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: any) => (
        <div className="flex">  
          <Icon icon={editIcon} action={() => handleEditClick(row)} />
          <Icon icon={deleteIcon} action={() => handleDeleteClick(row)} />
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="mt-8">
       <input
        type="text"
        placeholder="Search by subject..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border rounded px-2 py-1 mb-4"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <DataTable
        columns={columns}
        data={tickets}
        className="min-w-full"
        pagination
        paginationServer
        paginationRowsPerPageOptions={[5, 10, 25, 50]}
        onChangePage={handlePageChange}
        paginationPerPage={limit}
        onChangeRowsPerPage={handleLimitChange}
        paginationTotalRows={totalCount}
      />
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={handleCloseTicketModal}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        isEditMode
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Table;
