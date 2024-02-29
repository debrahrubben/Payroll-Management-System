import { h, Component } from 'preact';
import axios from 'axios';

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
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={this.state.formData.name} onChange={this.handleChange} />
        <input type="text" name="identificationCode" placeholder="Identification Code" value={this.state.formData.identificationCode} onChange={this.handleChange} />
        <input type="number" name="salary" placeholder="Salary GHc" value={this.state.formData.salary} onChange={this.handleChange} />
        <input type="text" name="department" placeholder="Department" value={this.state.formData.department} onChange={this.handleChange} />
        <input type="email" name="email" placeholder="Email" value={this.state.formData.email} onChange={this.handleChange} />
        <input type="number" name="bankAccount" placeholder="Bank Account" value={this.state.formData.bankAccount} onChange={this.handleChange} />
        <button type="submit">Add Employee</button>
      </form>
    );
  }
}

export default AddEmployeeForm;
