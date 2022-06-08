const express = require('express');
const router = express.Router();

const institutionCTRL = require('../controllers/Institutions');
const studentCTRL = require('../controllers/Students');
const LecturerCTRL = require('../controllers/Lecturers');
const ProgramCTRL = require('../controllers/Programs');
const On_ProgramCTRL = require('../controllers/On_Program');
const Program_created_byCTRL = require('../controllers/Program_created_by');

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

// Program CRUD API
router.get('/programs',ProgramCTRL.programsList);
router.get('/program/:id',ProgramCTRL.programReadOne);
router.post('/program',ProgramCTRL.programCreateOne);
router.put('/program/:id',ProgramCTRL.programUpdateOne);
router.delete('/program/:id',ProgramCTRL.programDeleteOne);

// On_Program CRUD API
router.get('/onprogram/lecturer/:id',On_ProgramCTRL.lecturerOnProgramList);
router.get('/onprogram/program/:id',On_ProgramCTRL.programOnProgramList);
router.post('/onprogram',On_ProgramCTRL.onprogramCreateOne);
router.delete('/onprogram/:id',On_ProgramCTRL.onProgramDeleteOne);

// Program_created_by CRUD API
router.get('/programcreatedby/institute/:id',Program_created_byCTRL.institutionProgramCreatedByList);
router.get('/programcreatedby/program/:id',Program_created_byCTRL.programProgramCreatedByList);
router.post('/programcreatedby',Program_created_byCTRL.ProgramCreatedByCreateOne);
router.delete('/programcreatedby/:id',Program_created_byCTRL.ProgramCreatedByDeleteOne);

module.exports = router;