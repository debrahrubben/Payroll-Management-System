// EmployeeList.js
import { h } from 'preact';

const EmployeeList = ({ employees }) => {
  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <div>Name: {employee.name}</div>
            <div>Salary: {employee.salary}</div>
            <div>Department: {employee.department}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
