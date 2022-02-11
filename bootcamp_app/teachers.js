const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'gitt',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});

// pool.query(`
// SELECT cohorts.name as cohort, teachers.name as teacher 
// FROM students
// JOIN cohorts ON cohorts_id = cohort.id
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${row.cohort}:${row.teacher} `);
//   })
// }).catch(err => console.error('query error', err.stack));

