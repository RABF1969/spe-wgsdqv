import React from 'react';
import { Save, X } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeFormProps {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

export function EmployeeForm({ onSubmit, onCancel }: EmployeeFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      department: formData.get('department') as string,
      email: formData.get('email') as string,
      startDate: formData.get('startDate') as string,
      active: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Novo Funcionário</h2>
        <p className="mt-1 text-sm text-gray-500">
          Preencha os dados do novo funcionário para cadastro no sistema.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="block w-full h-12 px-4 rounded-lg border-2 border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-150 ease-in-out"
            placeholder="Digite o nome completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="block w-full h-12 px-4 rounded-lg border-2 border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-150 ease-in-out"
            placeholder="email@empresa.com"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
          </label>
          <input
            type="text"
            name="position"
            id="position"
            required
            className="block w-full h-12 px-4 rounded-lg border-2 border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-150 ease-in-out"
            placeholder="Digite o cargo"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
            Departamento
          </label>
          <input
            type="text"
            name="department"
            id="department"
            required
            className="block w-full h-12 px-4 rounded-lg border-2 border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-150 ease-in-out"
            placeholder="Digite o departamento"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Data de Admissão
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            className="block w-full h-12 px-4 rounded-lg border-2 border-gray-200 shadow-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition duration-150 ease-in-out"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-6 py-3 border-2 border-gray-300 shadow-sm text-base font-medium rounded-lg 
                   text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   transition duration-150 ease-in-out"
        >
          <X className="h-5 w-5 mr-2" />
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg 
                   text-white bg-blue-600 hover:bg-blue-700
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   transition duration-150 ease-in-out"
        >
          <Save className="h-5 w-5 mr-2" />
          Salvar Funcionário
        </button>
      </div>
    </form>
  );
}