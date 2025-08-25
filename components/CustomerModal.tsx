
import React, { useState, useEffect } from 'react';
import { Customer, CustomerStatus } from '../types';
import { CloseIcon } from './Icons';

interface CustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'createdAt'>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Lead',
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSave({
        ...formData,
        id: customer?.id || '',
        createdAt: customer?.createdAt || '',
      });
    } else {
        alert("Name and Email are required fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-8 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
                {customer ? 'Edit Customer' : 'Add New Customer'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <CloseIcon className="h-6 w-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
            <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
              <option value="Lead">Lead</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end pt-4 space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
