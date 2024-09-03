import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Icon from './icon';
import { actionIcon } from './icons';
import Modal from './Modal';
import { fetchTickets } from '../formSlice';
import { RootState, AppDispatch } from '../store';

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state: RootState) => state.form);
  console.log(tickets?.[0]?.assignee,"ticketData")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const columns = [
    {
      name: 'ID',
      selector: (row: any, index:any) => index,
      sortable: true,
    },
    {
      name: 'Request by',
      selector: (row: any) => row.requestBy,
      sortable: true,
    },
    {
      name: 'Subject',
      selector: (row: any) => row.subject,
      sortable: true,
    },
    {
      name: 'Assignee',
      selector: (row: any) => <img src={row.assignee} className="rounded-full h-[50px] w-[50px]" />,
      sortable: true,
    },
    {
      name: 'Priority',
      selector: (row: any) => row.priority,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Create Date',
      selector: (row: any) => new Date(row.createDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: (row: any) => new Date(row.dueDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: any) => (
        <div>
          <Icon
            icon={actionIcon}
            action={() => {
              setSelectedRow(row);
              setIsModalOpen(true);
            }}
          />
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div className="mt-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={tickets}
          className="min-w-full" // Ensure table takes full width of the container
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={() => console.log('Edit clicked for row:', selectedRow)}
        onDelete={() => console.log('Delete clicked for row:', selectedRow)}
      />
    </div>
  );
};

export default Table;
