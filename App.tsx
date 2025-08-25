
import React, { useState, useMemo } from 'react';
import { Customer } from './types';
import { INITIAL_CUSTOMERS } from './constants';
import CustomerTable from './components/CustomerTable';
import CustomerModal from './components/CustomerModal';
import { PlusIcon, UserGroupIcon, SearchIcon } from './components/Icons';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenAddModal = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = (customer: Customer) => {
    if (editingCustomer) {
      setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)));
    } else {
      setCustomers([{ ...customer, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...customers]);
    }
    handleCloseModal();
  };
  
  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      setCustomers(customers.filter((c) => c.id !== customerId));
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) {
      return customers;
    }
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">
              WorkPass Customer Hub
            </h1>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="h-5 w-5" />
            Add Customer
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Customer Database</h2>
            <p className="text-sm text-gray-500">
              Manage your customer information here. Data is stored in-browser and will be reset on page refresh.
            </p>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <CustomerTable
            customers={filteredCustomers}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteCustomer}
          />
        </div>
      </main>

      {isModalOpen && (
        <CustomerModal
          customer={editingCustomer}
          onClose={handleCloseModal}
          onSave={handleSaveCustomer}
        />
      )}
    </div>
  );
};

export default App;
