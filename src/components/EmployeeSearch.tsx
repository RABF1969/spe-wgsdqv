import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeSearchProps {
  onSearch: (filters: Partial<Employee>) => void;
}

export function EmployeeSearch({ onSearch }: EmployeeSearchProps) {
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    position: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Buscar por nome..."
            value={filters.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="department"
            placeholder="Filtrar por departamento..."
            value={filters.department}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            name="position"
            placeholder="Filtrar por cargo..."
            value={filters.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </button>
      </div>
    </form>
  );
}