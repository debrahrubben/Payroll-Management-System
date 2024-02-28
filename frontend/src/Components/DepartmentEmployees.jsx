// DepartmentEmployees.js
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

const DepartmentEmployees = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee-departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployeesByDepartment = async (department) => {
    try {
      const response = await axios.get(`http://localhost:3000/employees/${department}`);
      setDepartmentEmployees(response.data);
    } catch (error) {
      console.error(`Error fetching employees for department ${department}:`, error);
    }
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    fetchEmployeesByDepartment(department);
  };

  return (
    <div>
      <h2>Select Department</h2>
      <ul>
        {departments.map(department => (
          <li key={department} onClick={() => handleDepartmentSelect(department)}>
            {department}
          </li>
        ))}
      </ul>
      {departmentEmployees.length > 0 && (
        <div>
          <h3>Employees in {selectedDepartment}</h3>
          <ul>
            {departmentEmployees.map(employee => (
              <li key={employee.id}>
                {employee.name} - Salary: {employee.salary}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DepartmentEmployees;
