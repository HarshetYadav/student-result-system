const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// ✅ Serve static files from frontend and images
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../images')));

// ✅ CORS & JSON parsing
app.use(cors());
app.use(express.json());




// ✅ MySQL Local DB Connection (Hardcoded)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // or 'your_password' if you set one
  database: 'studentdb',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

// ✅ Default route → login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Route to test server
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// ✅ Route to get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ✅ POST route to add a student
app.post('/students', (req, res) => {
  const { name, year, roll_no } = req.body;

  const sql = 'INSERT INTO students (name, year, roll_no) VALUES (?, ?, ?)';
  db.query(sql, [name, year, roll_no], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Student added successfully', serial_no: result.insertId });
  });
});

// ✅ DELETE route
app.delete('/students/:serial_no', (req, res) => {
  const serial_no = req.params.serial_no;
  const sql = 'DELETE FROM students WHERE serial_no = ?';

  db.query(sql, [serial_no], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Student deleted successfully' });
  });
});

// ✅ PUT route to update student
app.put('/students/:serial_no', (req, res) => {
  const serial_no = req.params.serial_no;
  const { name, year, roll_no } = req.body;

  const sql = 'UPDATE students SET name = ?, year = ?, roll_no = ? WHERE serial_no = ?';
  db.query(sql, [name, year, roll_no, serial_no], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Student updated successfully' });
  });
});

// GET all academic subjects for a student
app.get('/academics/:serial_no', (req, res) => {
  const serial_no = req.params.serial_no;
  const sql = 'SELECT * FROM student_subjects WHERE serial_no = ? ORDER BY semester';

  db.query(sql, [serial_no], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ADD subject
app.post('/academics', (req, res) => {
  const { serial_no, semester, course_code, subject_name, grade, credits } = req.body;
  const sql = `
    INSERT INTO student_subjects
    (serial_no, semester, course_code, subject_name, grade, credits)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [serial_no, semester, course_code, subject_name, grade, credits], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Subject added" });
  });
});

// UPDATE subject
app.put('/academics/:id', (req, res) => {
  const id = req.params.id;
  const { course_code, subject_name, grade, credits } = req.body;

  const sql = `
    UPDATE student_subjects
    SET course_code = ?, subject_name = ?, grade = ?, credits = ?
    WHERE id = ?`;

  db.query(sql, [course_code, subject_name, grade, credits, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Subject updated" });
  });
});

// DELETE subject
app.delete('/academics/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM student_subjects WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Subject deleted" });
  });
});

// ===== Notices Routes =====

// Get all notices
app.get('/notices', (req, res) => {
  db.query('SELECT * FROM notices ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// Post a new notice
app.post('/notices', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send({ error: "Message is required" });

  const sql = 'INSERT INTO notices (message) VALUES (?)';
  db.query(sql, [message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Notice posted successfully" });
  });
});


// Delete a notice
app.delete('/notices/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM notices WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Notice deleted successfully' });
  });
});

// Dummy credentials (can later come from DB)
const validUser = { username: 'admin', password: '1234' };

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === validUser.username && password === validUser.password) {
    return res.send({ message: 'Login successful' });
  }
  return res.status(401).send({ error: 'Invalid username or password' });
});


// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
