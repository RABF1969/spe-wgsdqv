import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { UserPlus, FileText, Download, Printer } from 'lucide-react';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeSearch } from './components/EmployeeSearch';
import { MonthlyTimeSheet } from './components/MonthlyTimeSheet';
import { TimeSheetPDF } from './components/TimeSheetPDF';
import type { Employee, TimeSheet } from './types';

function App() {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timesheet, setTimesheet] = useState<TimeSheet | null>(null);
  const currentDate = new Date();

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee]);
    setShowEmployeeForm(false);
  };

  const handleSearch = (filters: Partial<Employee>) => {
    console.log('Buscando com filtros:', filters);
  };

  const handleSaveTimeEntries = (entries: TimeSheet['entries']) => {
    if (selectedEmployee) {
      const newTimesheet: TimeSheet = {
        id: Date.now().toString(),
        employeeId: selectedEmployee.id,
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        entries,
        totalHours: 0,
        status: 'rascunho'
      };
      setTimesheet(newTimesheet);
    }
  };

  const createDefaultTimesheet = (employee: Employee) => {
    return {
      id: Date.now().toString(),
      employeeId: employee.id,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      entries: [],
      totalHours: 0,
      status: 'rascunho'
    };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Ponto Eletrônico</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Seção de Gerenciamento de Funcionários */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
            <button
              onClick={() => setShowEmployeeForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Funcionário
            </button>
          </div>

          {showEmployeeForm ? (
            <EmployeeForm
              onSubmit={handleAddEmployee}
              onCancel={() => setShowEmployeeForm(false)}
            />
          ) : (
            <EmployeeSearch onSearch={handleSearch} />
          )}

          {/* Lista de Funcionários */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <li key={employee.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-500">
                        {employee.position} • {employee.department}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Folha de Ponto
                      </button>
                      <PDFDownloadLink
                        document={
                          <TimeSheetPDF
                            timesheet={timesheet || createDefaultTimesheet(employee)}
                            employee={employee}
                          />
                        }
                        fileName={`ponto-${employee.name}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}.pdf`}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir PDF
                      </PDFDownloadLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Seção da Folha de Ponto */}
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Folha de Ponto - {selectedEmployee.name}
              </h2>
              {timesheet && (
                <PDFDownloadLink
                  document={<TimeSheetPDF timesheet={timesheet} employee={selectedEmployee} />}
                  fileName={`ponto-${selectedEmployee.name}-${timesheet.month}-${timesheet.year}.pdf`}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </PDFDownloadLink>
              )}
            </div>
            
            <MonthlyTimeSheet
              year={currentDate.getFullYear()}
              month={currentDate.getMonth() + 1}
              onSave={handleSaveTimeEntries}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;