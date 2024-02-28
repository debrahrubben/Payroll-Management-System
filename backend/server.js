// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Endpoint to add a new employee to the database
app.post('/employees', async (req, res) => {
  const { name, salary, department } = req.body;
  try {
    const result = await pool.query('INSERT INTO employees (name, salary, department) VALUES ($1, $2, $3) RETURNING *', [name, salary, department]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the employee' });
  }
});

// Endpoint to get all employees from the database
app.get('/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching employees' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});