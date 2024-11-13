export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  startDate: string;
  active: boolean;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakStart: string;
  breakEnd: string;
}

export interface TimeSheet {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  entries: TimeEntry[];
  totalHours: number;
  status: 'rascunho' | 'enviado' | 'aprovado';
}