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

app.post('/employees', async (req, res) => {
  const { name, salary, department } = req.body;
  try {
    const result = await pool.query('INSERT INTO employees (name, salary, department) VALUES ($1, $2, $3) RETURNING *', [name, salary, department]);
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
