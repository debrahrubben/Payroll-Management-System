// App.jsx
import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import EmployeeForm from './Components/AddEmployeeForm';
import DepartmentEmployees from './Components/DepartmentEmployees';

export function App() {
  const [employeesUpdated, setEmployeesUpdated] = useState(false);

  const fetchEmployees = async () => {
    setEmployeesUpdated(prevState => !prevState); // Toggle state to trigger re-render
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Payroll Management System</h1>
      <EmployeeForm fetchEmployees={fetchEmployees} />
      <DepartmentEmployees key={employeesUpdated} /> {/* Pass key to trigger re-render */}
    </div>
  );
}

render(<App />, document.getElementById('app'));
