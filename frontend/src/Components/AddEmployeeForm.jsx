// src/components/AddEmployeeForm.js

import { h, Component } from 'preact';

class AddEmployeeForm extends Component {
  state = {
    name: '',
    salary: '',
    department: ''
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Call a function to send the form data to the server
    // This function will make an API call to add the employee to the database
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} />
        </div>
        <div>
          <label for="salary">Salary:</label>
          <input type="text" id="salary" name="salary" value={this.state.salary} onChange={this.handleInputChange} />
        </div>
        <div>
          <label for="department">Department:</label>
          <input type="text" id="department" name="department" value={this.state.department} onChange={this.handleInputChange} />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    );
  }
}

export default AddEmployeeForm;