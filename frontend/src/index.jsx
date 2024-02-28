import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import EmployeeForm from './Components/AddEmployeeForm';
import EmployeeList from './Components/EmployeeList';

export function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]); // Update state with the new employee
      console.log('Employee added successfully:', newEmployee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h1>Payroll Management System</h1>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeList employees={employees} />
    </div>
  );
}

render(<App />, document.getElementById('app'));
