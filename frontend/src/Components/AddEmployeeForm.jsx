// AddEmployeeForm.js
import { h, Component } from 'preact';
import axios from 'axios';

class AddEmployeeForm extends Component {
  state = {
    formData: { name: '', salary: '', department: '' }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/employees', this.state.formData);
      console.log('Employee added successfully:', response.data);
      // Reset form fields after successful submission
      this.setState({
        formData: { name: '', salary: '', department: '' }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  handleChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={this.state.formData.name} onChange={this.handleChange} />
        <input type="text" name="salary" placeholder="Salary" value={this.state.formData.salary} onChange={this.handleChange} />
        <input type="text" name="department" placeholder="Department" value={this.state.formData.department} onChange={this.handleChange} />
        <button type="submit">Add Employee</button>
      </form>
    );
  }
}

export default AddEmployeeForm;
