import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, Save } from 'lucide-react';
import type { TimeEntry } from '../types';

interface TimeSheetFormProps {
  date: Date;
  onSubmit: (entry: Omit<TimeEntry, 'id' | 'employeeId'>) => void;
}

export function TimeSheetForm({ date, onSubmit }: TimeSheetFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      date: format(date, 'yyyy-MM-dd'),
      clockIn: formData.get('clockIn') as string,
      clockOut: formData.get('clockOut') as string,
      breakStart: formData.get('breakStart') as string,
      breakEnd: formData.get('breakEnd') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Registro de Ponto - {format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="clockIn" className="block text-sm font-medium text-gray-700">
            Entrada
          </label>
          <input
            type="time"
            name="clockIn"
            id="clockIn"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="clockOut" className="block text-sm font-medium text-gray-700">
            Saída
          </label>
          <input
            type="time"
            name="clockOut"
            id="clockOut"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="breakStart" className="block text-sm font-medium text-gray-700">
            Início do Intervalo
          </label>
          <input
            type="time"
            name="breakStart"
            id="breakStart"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="breakEnd" className="block text-sm font-medium text-gray-700">
            Fim do Intervalo
          </label>
          <input
            type="time"
            name="breakEnd"
            id="breakEnd"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Registro
        </button>
      </div>
    </form>
  );
}