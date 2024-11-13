import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { format, getDaysInMonth, startOfMonth, addDays, isSunday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { TimeSheet, Employee } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 10,
    borderBottom: 1,
    paddingBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  employeeInfo: {
    marginBottom: 10,
    fontSize: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontSize: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    padding: 3,
    fontSize: 8,
    minHeight: 15,
  },
  sundayRow: {
    backgroundColor: '#ffefef',
  },
  col1: { width: '15%' },
  col2: { width: '20%' },
  col3: { width: '13%' },
  col4: { width: '13%' },
  col5: { width: '13%' },
  col6: { width: '13%' },
  col7: { width: '13%' },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureContainer: {
    alignItems: 'center',
    width: '40%',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    width: '100%',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    textAlign: 'center',
  },
  observations: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  observationsTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  observationsLines: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginBottom: 15,
    height: 12,
  }
});

interface TimeSheetPDFProps {
  timesheet: TimeSheet;
  employee: Employee;
}

export function TimeSheetPDF({ timesheet, employee }: TimeSheetPDFProps) {
  const startDate = startOfMonth(new Date(timesheet.year, timesheet.month - 1));
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
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>FOLHA DE PONTO INDIVIDUAL</Text>
          <Text style={{ fontSize: 10, textAlign: 'center' }}>
            {format(startDate, "MMMM 'de' yyyy", { locale: ptBR })}
          </Text>
        </View>

        <View style={styles.employeeInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Funcionário:</Text>
            <Text>{employee.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Cargo:</Text>
            <Text>{employee.position}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Departamento:</Text>
            <Text>{employee.department}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Data</Text>
            <Text style={styles.col2}>Dia</Text>
            <Text style={styles.col3}>Entrada</Text>
            <Text style={styles.col4}>Saída Almoço</Text>
            <Text style={styles.col5}>Retorno</Text>
            <Text style={styles.col6}>Saída</Text>
            <Text style={styles.col7}>Rubrica</Text>
          </View>

          {days.map(({ date, dayOfWeek, isSunday }) => (
            <View key={format(date, 'yyyy-MM-dd')} style={[styles.tableRow, isSunday && styles.sundayRow]}>
              <Text style={styles.col1}>{format(date, 'dd/MM/yyyy')}</Text>
              <Text style={styles.col2}>{dayOfWeek}</Text>
              <Text style={styles.col3}>___:___</Text>
              <Text style={styles.col4}>___:___</Text>
              <Text style={styles.col5}>___:___</Text>
              <Text style={styles.col6}>___:___</Text>
              <Text style={styles.col7}>_______</Text>
            </View>
          ))}
        </View>

        <View style={styles.observations}>
          <Text style={styles.observationsTitle}>Observações:</Text>
          <View style={styles.observationsLines} />
          <View style={styles.observationsLines} />
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureContainer}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Assinatura do Funcionário</Text>
            <Text style={[styles.signatureText, { marginTop: 2 }]}>Data: ___/___/_____</Text>
          </View>
          
          <View style={styles.signatureContainer}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>Assinatura do Responsável</Text>
            <Text style={[styles.signatureText, { marginTop: 2 }]}>Data: ___/___/_____</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}