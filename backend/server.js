  const express = require('express');
  const bodyParser = require('body-parser');
  const { Pool } = require('pg');
  const cors = require('cors');

  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); // Enable CORS for all routes

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'payroll_management_system',
    password: '1234',
    port: 5432,
  });


// Add a callback function to log successful database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database successfully');
});


  app.post('/employees', async (req, res) => {
    const { name, identificationCode, salary, department, email, bankAccount } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO employees (name, identification_code, salary, department, email, bank_account) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, identificationCode, salary, department, email, bankAccount]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the employee' });
    }
  });



  app.get('/employees', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM employees');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching employees' });
    }
  });


  // Add route to fetch distinct department names from employees table
  app.get('/employee-departments', async (req, res) => {
    try {
      const result = await pool.query('SELECT DISTINCT department FROM employees');
      const departments = result.rows.map(row => row.department);
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching departments from employees table' });
    }
  });

  // Add route to fetch employees by department name
  app.get('/employees/:department', async (req, res) => {
    const department = req.params.department;
    try {
      const result = await pool.query('SELECT * FROM employees WHERE department = $1', [department]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: `An error occurred while fetching employees for department ${department}` });
    }
  });

  app.delete('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM employees WHERE id = $1', [employeeId]);
      if (result.rowCount === 0) {
        // If no rows were affected, it means the employee with the given ID doesn't exist
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'An error occurred while deleting the employee' });
    }
  });

  // Update route for employees
  app.put('/employees/:identificationCode', async (req, res) => {
    const identificationCode = req.params.identificationCode;
    const { name, salary, department, email, bankAccount } = req.body;
    
    try {
      // Perform update operation in the database based on identificationCode
      const result = await pool.query(
        'UPDATE employees SET name = $1, salary = $2, department = $3, email = $4, bank_account = $5 WHERE identification_code = $6 RETURNING *',
        [name, salary, department, email, bankAccount, identificationCode]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.status(200).json(result.rows[0]); // Return the updated employee data
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'An error occurred while updating the employee' });
    }
  });


  // Add route to fetch total salary sum of all employees
  app.get('/employees/total-salary', async (req, res) => {
  try {
    const result = await pool.query('SELECT COALESCE(SUM(salary), 0) AS totalSalary FROM employees LIMIT 1');
    const totalSalary = parseFloat(result.rows[0].totalSalary);
    res.status(200).json({ totalSalary });
  } catch (error) {
    console.error('Error fetching total salary sum:', error);
    res.status(500).json({ error: 'An error occurred while fetching total salary sum' });
  }
});

  
  


  // Add route to fetch number of employees in each department
  app.get('/employees/department-count', async (req, res) => {
    try {
      const result = await pool.query('SELECT department, COUNT(*) AS count FROM employees GROUP BY department');
      const departmentCounts = result.rows.reduce((acc, row) => {
        acc[row.department] = row.count;
        return acc;
      }, {});
      res.status(200).json(departmentCounts);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching department employee counts' });
    }
  });

  app.get('/employees/total', async (req, res) => {
    try {
      const result = await pool.query('SELECT COUNT(*) AS totalEmployees FROM employees');
      const totalEmployees = result.rows[0].totalEmployees;
      res.status(200).json({ totalEmployees });
    } catch (error) {
      console.error('An error occurred while fetching total number of employees:', error);
      res.status(500).json({ error: 'An error occurred while fetching total number of employees' });
    }
  });
  



  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
