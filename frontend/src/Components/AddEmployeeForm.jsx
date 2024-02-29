import { h, Component } from 'preact';
import axios from 'axios';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

class AddEmployeeForm extends Component {
  state = {
    formData: {
      name: '',
      identificationCode: '', // New field
      salary: '',
      department: '',
      email: '',
      bankAccount: ''
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
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    const { formData } = this.state; // Destructure formData
    try {
      const response = await axios.put(`http://localhost:3000/employees/${formData.identificationCode}`, formData);
      console.log('Employee updated successfully:', response.data);
      // Reset form fields after successful update
      this.setState({
        formData: {
          name: '',
          identificationCode: '', // Keep the identification code empty or reset as needed
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
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="text" name="name" placeholder="Name" value={this.state.formData.name} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="text" name="identificationCode" placeholder="Identification Code" value={this.state.formData.identificationCode} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="number" name="salary" placeholder="Salary GHc" value={this.state.formData.salary} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="text" name="department" placeholder="Department" value={this.state.formData.department} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="email" name="email" placeholder="Email" value={this.state.formData.email} onChange={this.handleChange} />
        <input style={{ margin: '2px', backgroundColor: '#D8E3E7' }} type="number" name="bankAccount" placeholder="Bank Account" value={this.state.formData.bankAccount} onChange={this.handleChange} />
        <br />
        <br />
        <Button type='primary' style={{ marginLeft: '10px', backgroundColor: '#9DB2BF' }} onClick={this.handleSubmit}>Add Employee <UserAddOutlined /></Button>
        <Button type='primary' style={{ marginLeft: '10px', backgroundColor: '#9DB2BF' }} onClick={this.handleUpdate}>Update</Button>
      </form>
    );
  }
}

export default AddEmployeeForm;
