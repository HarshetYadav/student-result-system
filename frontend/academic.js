const serial_no = localStorage.getItem('student_serial');
const studentName = localStorage.getItem('student_name');
const studentRoll = localStorage.getItem('student_roll');
const studentYear = parseInt(localStorage.getItem('student_year'));
const semSelect = document.getElementById('semSelect');

// Restrict semester options based on year
const yearSemMap = {
  1: [1],
  2: [1, 2, 3],
  3: [1, 2, 3, 4, 5],
  4: [1, 2, 3, 4, 5, 6, 7],
};

const allowedSems = yearSemMap[studentYear] || [1];
semSelect.innerHTML = '';

allowedSems.forEach(sem => {
  const opt = document.createElement('option');
  opt.value = sem;
  opt.textContent = `Semester ${sem}`;
  semSelect.appendChild(opt);
});

let currentSem = allowedSems[0];
if (!allowedSems.includes(currentSem)) {
  currentSem = allowedSems[0];
  semSelect.value = currentSem;
}


document.title = `${studentName}'s Academic Info`;

document.getElementById('studentHeader').textContent = `👨‍🎓 ${studentName} (Roll No: ${studentRoll})`;


document.getElementById('studentHeader').textContent = `👨‍🎓 ${studentName} (Roll No: ${studentRoll})`;


semSelect.addEventListener('change', () => {
  currentSem = parseInt(semSelect.value);
  loadSubjects();
});




async function loadSubjects() {
  const res = await fetch(`http://localhost:3000/academics/${serial_no}`);
  const data = await res.json();

  const tbody = document.getElementById('subjectBody');
  tbody.innerHTML = '';

  let semSubjects = data.filter(sub => sub.semester === currentSem);
  let totalPoints = 0;
  let totalCredits = 0;

  semSubjects.forEach(sub => {
    const gradePoint = getGradePoint(sub.grade);
    totalPoints += gradePoint * sub.credits;
    totalCredits += sub.credits;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input value="${sub.course_code}" /></td>
      <td><input value="${sub.subject_name}" /></td>
      <td><input value="${sub.grade}" /></td>
      <td><input type="number" value="${sub.credits}" /></td>
      <td>
        <button onclick="updateSubject(${sub.id}, this)">💾</button>
        <button onclick="deleteSubject(${sub.id})">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Add blank row for new subject
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><input placeholder="Code" /></td>
    <td><input placeholder="Name" /></td>
    <td><input placeholder="Grade" /></td>
    <td><input type="number" placeholder="Credits" /></td>
    <td><button onclick="addSubject(this)">➕ ADD</button></td>
  `;
  tbody.appendChild(newRow);

  const sgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  document.getElementById('sgpa').textContent = sgpa;

  calculateCGPA(data); // All semesters
}

function getGradePoint(grade) {
  const map = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
    'C': 6, 'D': 5, 'E': 4, 'F': 0
  };
  return map[grade.toUpperCase()] || 0;
}

function calculateCGPA(data) {
  let totalWeighted = 0;
  let totalCredits = 0;

  const grouped = {};
  data.forEach(sub => {
    if (!grouped[sub.semester]) grouped[sub.semester] = [];
    grouped[sub.semester].push(sub);
  });

  Object.values(grouped).forEach(sem => {
    let semCredits = 0;
    let semPoints = 0;

    sem.forEach(sub => {
      const gp = getGradePoint(sub.grade);
      semPoints += gp * sub.credits;
      semCredits += sub.credits;
    });

    if (semCredits) {
      const semSGPA = semPoints / semCredits;
      totalWeighted += semSGPA * semCredits;
      totalCredits += semCredits;
    }
  });

  const cgpa = totalCredits ? (totalWeighted / totalCredits).toFixed(2) : 0;
  document.getElementById('cgpa').textContent = cgpa;
}

async function addSubject(btn) {
  const row = btn.closest('tr');
  const inputs = row.querySelectorAll('input');
  const [course_code, subject_name, grade, credits] = [...inputs].map(i => i.value);

  if (!course_code || !subject_name || !grade || !credits) return alert("Fill all fields!");

  const res = await fetch('http://localhost:3000/academics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serial_no, semester: currentSem, course_code, subject_name, grade, credits: +credits })
  });

  const data = await res.json();
  alert(data.message);
  loadSubjects();
}

async function updateSubject(id, btn) {
  const row = btn.closest('tr');
  const inputs = row.querySelectorAll('input');
  const [course_code, subject_name, grade, credits] = [...inputs].map(i => i.value);

  const res = await fetch(`http://localhost:3000/academics/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ course_code, subject_name, grade, credits: +credits })
  });

  const data = await res.json();
  alert(data.message);
  loadSubjects();
}

async function deleteSubject(id) {
  if (!confirm("Delete this subject?")) return;
  const res = await fetch(`http://localhost:3000/academics/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  alert(data.message);
  loadSubjects();
}

document.getElementById('downloadBtn').addEventListener('click', async () => {
  const res = await fetch(`http://localhost:3000/academics/${serial_no}`);
  const allSubjects = await res.json();

  const currentSubjects = allSubjects.filter(sub => sub.semester === currentSem);

  // Fill the printable section
  document.getElementById('printName').textContent = studentName;
  document.getElementById('printRoll').textContent = studentRoll;
  document.getElementById('printSemester').textContent = currentSem;

  const printBody = document.getElementById('printTableBody');
  printBody.innerHTML = '';
  let totalPoints = 0, totalCredits = 0;

  currentSubjects.forEach(sub => {
    const gradePoint = getGradePoint(sub.grade);
    totalPoints += gradePoint * sub.credits;
    totalCredits += sub.credits;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sub.course_code}</td>
      <td>${sub.subject_name}</td>
      <td>${sub.grade}</td>
      <td>${sub.credits}</td>
    `;
    printBody.appendChild(row);
  });

  const sgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  document.getElementById('printSGPA').textContent = sgpa;

  // Reuse CGPA logic
  let totalWeighted = 0, totalCreds = 0;
  const grouped = {};
  allSubjects.forEach(sub => {
    if (!grouped[sub.semester]) grouped[sub.semester] = [];
    grouped[sub.semester].push(sub);
  });

  Object.values(grouped).forEach(sem => {
    let semCredits = 0, semPoints = 0;
    sem.forEach(sub => {
      const gp = getGradePoint(sub.grade);
      semPoints += gp * sub.credits;
      semCredits += sub.credits;
    });

    if (semCredits) {
      const semSGPA = semPoints / semCredits;
      totalWeighted += semSGPA * semCredits;
      totalCreds += semCredits;
    }
  });

  const cgpa = totalCreds ? (totalWeighted / totalCreds).toFixed(2) : 0;
  document.getElementById('printCGPA').textContent = cgpa;

  // Now download the hidden content
  const element = document.getElementById('printResult');
  element.style.display = 'block';

  const opt = {
    margin: 0.5,
    filename: `${studentName}_Sem${currentSem}_Result.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  await html2pdf().set(opt).from(element).save();
  element.style.display = 'none'; // Hide again after download
});


document.addEventListener('DOMContentLoaded', () => {
//   document.title = `${studentName}'s Academic Info`;

//   const studentHeader = document.createElement('h3');
// //   studentHeader.textContent = `👨‍🎓 ${studentName} (Roll No: ${studentRoll})`;
//   document.body.insertBefore(studentHeader, document.getElementById('semSelect'));

  loadSubjects(); // Now guaranteed to run
});


