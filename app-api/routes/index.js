const express = require('express');
const router = express.Router();

const institutionCTRL = require('../controllers/Institutions');
const studentCTRL = require('../controllers/Students');
const LecturerCTRL = require('../controllers/Lecturer');
// Institution CRUD API
router.get('/institutions', institutionCTRL.institutionsList);
router.get('/institution/:id',institutionCTRL.institutionReadOne);
router.post('/institution',institutionCTRL.institutionCreateOne);
router.put('/institution/:id',institutionCTRL.institutionUpdateOne);
router.delete('/institution/:id',institutionCTRL.instituteDeleteOne);

// Student CRUD API
router.get('/students',studentCTRL.studentsList);
router.get('/student/:id',studentCTRL.studentReadOne);
router.post('/student',studentCTRL.studentCreateOne);
router.put('/student/:id',studentCTRL.studentUpdateOne);
router.delete('/student/:id',studentCTRL.studentDeleteOne);

// Lecturer CRUD API
router.get('/lecturers',LecturerCTRL.lecturersList);
router.get('/lecturer/:id',LecturerCTRL.lecturerReadOne);
router.post('/lecturer',LecturerCTRL.lecturerCreateOne);
router.put('/lecturer/:id',LecturerCTRL.lecturerUpdateOne);
router.delete('/lecturer/:id',LecturerCTRL.lecturerDeleteOne);

module.exports = router;