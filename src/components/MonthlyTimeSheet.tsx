import React from 'react';
import { format, getDaysInMonth, startOfMonth, addDays, isSunday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import type { TimeEntry } from '../types';

interface MonthlyTimeSheetProps {
  year: number;
  month: number;
  onSave: (entries: TimeEntry[]) => void;
}

export function MonthlyTimeSheet({ year, month, onSave }: MonthlyTimeSheetProps) {
  const startDate = startOfMonth(new Date(year, month - 1));
  const daysInMonth = getDaysInMonth(startDate);
  
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      date,
      dayOfWeek: format(date, 'EEEE', { locale: ptBR }),
      isSunday: isSunday(date)
    };
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Folha de Ponto - {format(startDate, "MMMM 'de' yyyy", { locale: ptBR })}
          </h2>
          <Clock className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dia
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entrada
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saída Almoço
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retorno Almoço
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saída
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {days.map(({ date, dayOfWeek, isSunday }) => (
              <tr key={format(date, 'yyyy-MM-dd')} className={isSunday ? 'bg-red-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={isSunday ? 'text-red-600 font-medium' : ''}>
                    {format(date, 'dd/MM/yyyy')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={isSunday ? 'text-red-600 font-medium' : ''}>
                    {dayOfWeek}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="time"
                    name={`entry-${format(date, 'yyyy-MM-dd')}`}
                    className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSunday}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="time"
                    name={`break-start-${format(date, 'yyyy-MM-dd')}`}
                    className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSunday}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="time"
                    name={`break-end-${format(date, 'yyyy-MM-dd')}`}
                    className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSunday}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="time"
                    name={`exit-${format(date, 'yyyy-MM-dd')}`}
                    className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSunday}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!isSunday && '--:--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}