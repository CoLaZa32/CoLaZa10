
import React from 'react';
import { Customer, CustomerStatus } from '../types';
import { EditIcon, DeleteIcon } from './Icons';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const statusColorMap: Record<CustomerStatus, string> = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-200 text-gray-800',
  Lead: 'bg-blue-100 text-blue-800',
};

const StatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => (
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[status]}`}>
    {status}
  </span>
);

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onEdit, onDelete }) => {
  if (customers.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">No Customers Found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new customer.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-4">
                      <button onClick={() => onEdit(customer)} className="text-primary hover:text-primary-hover transition duration-150 ease-in-out">
                        <EditIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onDelete(customer.id)} className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out">
                        <DeleteIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
