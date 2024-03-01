import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { Tabs, Card, Input } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './style.css';

const { TabPane } = Tabs;
const { Search } = Input;

const DepartmentEmployees = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentEmployees, setDepartmentEmployees] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee-departments');
      setDepartments(response.data);
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
      fetchEmployeesByDepartment(department);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div style={{ color: 'white' }}>
      <div>
        <h4 style={{ textAlign: 'center' }}>Select Department</h4>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
  <Search
    placeholder="Search employees"
    allowClear
    onSearch={handleSearch}
    style={{ width: 200 }}
  />
</div>


        <Tabs defaultActiveKey={departments[0]} onChange={handleTabSelect}>
          {departments.map(department => (
            <TabPane tab={<span style={{ color: 'white' }}>{department}</span>} key={department}>
              {departmentEmployees[department] && (
                <div>
                  <h3 style={{ color: 'white' }}>Employees in {department}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '30px' }}>
                    {departmentEmployees[department]
                      .filter(employee => employee.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((employee, index) => (
                        <Card
                          key={index}
                          title={employee.name}
                          style={{ width: 270, margin: '10px 10px 0px 0px', backgroundColor: '#D8E3E7' }}
                        >
                          <p>Identification Code: {employee.identification_code}</p>
                          <p style={{ fontSize: 'large' }}><b>Salary: GH₵ {employee.salary}</b></p>
                          <p>Email: {employee.email}</p>
                          <p>Bank Account: {employee.bank_account}</p>
                          <Button onClick={() => handleDeleteEmployee(employee.id, department)} type="primary" style={{ backgroundColor: 'tomato' }}>Delete<DeleteOutlined /></Button>
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
