import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import EmployeeForm from './Components/AddEmployeeForm';
import DepartmentEmployees from './Components/DepartmentEmployees';

export function App() {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Payroll Management System</h1>
      <EmployeeForm  />
      <DepartmentEmployees />
    </div>
  );
}

render(<App />, document.getElementById('app'));
