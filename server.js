const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); 

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'resume-mysql', 
  user: 'root',
  password: 'root',
  database: 'resume_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Endpoints
app.post('/api/uploadResumeDetails', (req, res) => {
  const { firstName, lastName, currentJobTitle, currentJobDescription, currentJobCompany } = req.body;

 
  if (!firstName || !lastName || !currentJobTitle || !currentJobDescription || !currentJobCompany) {
    return res.status(400).json({ error: 'Bad Request. Please provide all required fields.' });
  }

  // Storing resume details in the DB
  const sql =
    'INSERT INTO resumes (firstName, lastName, currentJobTitle, currentJobDescription, currentJobCompany) VALUES (?, ?, ?, ?, ?)';
  const values = [firstName, lastName, currentJobTitle, currentJobDescription, currentJobCompany];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error storing resume details:', err.message);
      return res.status(500).json({ error: 'Internal Server Error. Unable to store resume details.' });
    }

    const resumeId = result.insertId;
    res.status(200).json({ resumeId });
  });
});

app.get('/api/getResumeById/:id', (req, res) => {
  const resumeId = req.params.id;

  // Retrieving resume details by ID from the database
  const sql = 'SELECT * FROM resumes WHERE id = ?';
  db.query(sql, [resumeId], (err, result) => {
    if (err) {
      console.error('Error retrieving resume details by ID:', err.message);
      return res.status(500).json({ error: 'Internal Server Error. Unable to retrieve resume details.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    const resumeDetails = result[0];
    res.status(200).json(resumeDetails);
  });
});

app.get('/api/getResumeByName/:name', (req, res) => {
  const encodedName = req.params.name;
  const decodedName = decodeURIComponent(encodedName.replace(/\+/g, ' '));

  // Split the full name into first name and last name
  const [firstName, lastName] = decodedName.split(' ');

  // Retrieving resume details by name from the database
  const sql = 'SELECT * FROM resumes WHERE firstName = ? AND lastName = ?';
  db.query(sql, [firstName, lastName], (err, result) => {
    if (err) {
      console.error('Error retrieving resume details by name:', err.message);
      return res.status(500).json({ error: 'Internal Server Error. Unable to retrieve resume details.' });
    }

    if (result.length === 0) {
      // If no result is found with both first & last name, searching with either first name or last name
      const sqlPartialMatch = 'SELECT * FROM resumes WHERE firstName = ? OR lastName = ?';
      db.query(sqlPartialMatch, [firstName, lastName], (errPartialMatch, resultPartialMatch) => {
        if (errPartialMatch) {
          console.error('Error retrieving resume details by name (partial match):', errPartialMatch.message);
          return res.status(500).json({ error: 'Internal Server Error. Unable to retrieve resume details.' });
        }

        if (resultPartialMatch.length === 0) {
          return res.status(404).json({ error: 'Resume not found.' });
        }

        const resumeDetailsPartialMatch = resultPartialMatch;
        res.status(200).json(resumeDetailsPartialMatch);
      });
    } else {
      const resumeDetails = result;
      res.status(200).json(resumeDetails);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
