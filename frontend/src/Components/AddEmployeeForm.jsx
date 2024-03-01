import { h, Component } from 'preact';
import axios from 'axios';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';


class AddEmployeeForm extends Component {
  state = {
    formData: {
      name: '',
      identificationCode: '',
      salary: '',
      department: '', // Change to empty string
      email: '',
      bankAccount: ''
    },
    departments: [], // State to hold department data
    employees: [] // State to hold employee data
  };

  async componentDidMount() {
    // Fetch department data when the component mounts
    try {
      const response = await axios.get('http://localhost:3000/employee-departments');
      this.setState({ departments: response.data });
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }

  addEmployee = async (employeeData) => {
    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const newEmployee = await response.json();
      // Update state with the new employee
      this.setState(prevState => ({
        employees: [...prevState.employees, newEmployee]
      }));
      console.log('Employee added successfully:', newEmployee);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/employees', this.state.formData);
      console.log('Employee added successfully:', response.data);
      // Reset form fields after successful submission
      this.setState({
        formData: {
          name: '',
          identificationCode: '',
          salary: '',
          department: '',
          email: '',
          bankAccount: ''
        }
      });
      // Trigger a refresh of department employees after adding a new employee
      this.props.fetchDepartments();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  
  handleUpdate = async (e) => {
    e.preventDefault();
    const { formData } = this.state;
    try {
      const response = await axios.put(`http://localhost:3000/employees/${formData.identificationCode}`, formData);
      console.log('Employee updated successfully:', response.data);
      // Reset form fields after successful update
      this.setState({
        formData: {
          name: '',
          identificationCode: '',
          salary: '',
          department: '',
          email: '',
          bankAccount: ''
        }
      });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <form style={{ textAlign: 'center' }}>
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7', color:'black' }} type="text" name="name" placeholder="Name" value={this.state.formData.name} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7', color:'black' }} type="text" name="identificationCode" placeholder="Identification Code" value={this.state.formData.identificationCode} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7', color:'black' }} type="number" name="salary" placeholder="Salary GHc" value={this.state.formData.salary} onChange={this.handleChange} />
        {/* Replace the input field with a select dropdown */}
        <select style={{ margin: '2px', backgroundColor: '#D8E3E7' , color:'black'}} name="department" value={this.state.formData.department} onChange={this.handleChange}>
          <option value="">Select Department</option>
          {this.state.departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </select>
        {/* End of select dropdown */}
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7', color:'black' }} type="email" name="email" placeholder="Email" value={this.state.formData.email} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7', color:'black' }} type="number" name="bankAccount" placeholder="Bank Account" value={this.state.formData.bankAccount} onChange={this.handleChange} />
        <br />
        <br />
        <Button type='primary' style={{ marginLeft: '10px', backgroundColor: '#9DB2BF' }} onClick={this.handleSubmit}>Add Employee <UserAddOutlined /></Button>
        <Button type='primary' style={{ marginLeft: '10px', backgroundColor: '#9DB2BF' }} onClick={this.handleUpdate}>Update <UpdateSharpIcon style={{ fontSize: 'medium' }}/> </Button>
      </form>
    );
  }
}

export default AddEmployeeForm;
