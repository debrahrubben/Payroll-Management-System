import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Tabs, Card } from 'antd';

const { TabPane } = Tabs;

const DepartmentEmployees = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentEmployees, setDepartmentEmployees] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee-departments');
      setDepartments(response.data);
      // Set the first department as the default selected department
      if (response.data.length > 0) {
        fetchEmployeesByDepartment(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployeesByDepartment = async (department) => {
    try {
      const response = await axios.get(`http://localhost:3000/employees/${department}`);
      setDepartmentEmployees({ ...departmentEmployees, [department]: response.data });
    } catch (error) {
      console.error(`Error fetching employees for department ${department}:`, error);
    }
  };

 const handleTabSelect = (department) => {
  if (!departmentEmployees[department]) {
    fetchEmployeesByDepartment(department);
  }
};

const handleDeleteEmployee = async (employeeId, department) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${employeeId}`);
      // After successful deletion, fetch updated list of employees
      fetchEmployeesByDepartment(department);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  

  return (
    <div style={{ color: 'white',}}>
      <div>
        <h4 style={{textAlign:'center'}}>Select Department</h4>
        <Tabs defaultActiveKey={departments[0]} onChange={handleTabSelect}>
          {departments.map(department => (
            <TabPane tab={<span style={{ color: 'white' }}>{department}</span>} key={department}>
              {departmentEmployees[department] && (
                <div>
                  <h3 style={{ color: 'white' }}>Employees in {department}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {departmentEmployees[department].map((employee, index) => (
                      <Card
                        key={index}
                        title={employee.name}
                        style={{ width: 250, margin: '1px 10px 0 0', backgroundColor: '#D8E3E7' }} // Change background color
                      >
                        <p>Identification Code: {employee.identification_code}</p>
                        <p>Salary: GHC {employee.salary}</p>
                        <p>Email: {employee.email}</p>
                        <p>Bank Account: {employee.bank_account}</p>
                        <button onClick={() => handleDeleteEmployee(employee.id, department)} style={{color:'tomato', borderRadius:'3px'}}>Delete</button>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DepartmentEmployees;
