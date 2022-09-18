const express = require('express');
const router = express.Router();

////////////////////////////////
//                            //
//     Model Controllers      //
//                            //
////////////////////////////////

// Adding Controllers
const institutionCTRL = require('../controllers/Institutions');
const studentCTRL = require('../controllers/Students');
const LecturerCTRL = require('../controllers/Lecturers');
const ProgramCTRL = require('../controllers/Program Details');
const CourseCTRL = require('../controllers/Course Details');
const ParticipationCTRL = require('../controllers/Participation Details');
const commentCTRL = require('../controllers/Comments');
const AuthCTRL = require('../controllers/Auth');
////////////////////////////////
//                            //
//        API Routers         //
//                            //
////////////////////////////////

// Institution CRUD API
router.get('/institutions', institutionCTRL.institutionsList);
router.get('/institution/:id', institutionCTRL.institutionReadOne);
router.post('/institution', institutionCTRL.institutionCreateOne);
router.put('/institution/:id', institutionCTRL.institutionUpdateOne);
router.delete('/institution/:id', institutionCTRL.instituteDeleteOne);

// Student CRUD API
router.get('/students', studentCTRL.studentsList);
router.get('/student/:id', studentCTRL.studentReadOne);
router.post('/student', studentCTRL.studentCreateOne);
router.put('/student/:id', studentCTRL.studentUpdateOne);
router.delete('/student/:id', studentCTRL.studentDeleteOne);

// Lecturer CRUD API
router.get('/lecturers', LecturerCTRL.lecturersList);
router.get('/lecturer/:id', LecturerCTRL.lecturerReadOne);
router.post('/lecturer', LecturerCTRL.lecturerCreateOne);
router.put('/lecturer/:id', LecturerCTRL.lecturerUpdateOne);
router.delete('/lecturer/:id', LecturerCTRL.lecturerDeleteOne);

// Program CRUD API
router.get('/programs', ProgramCTRL.programsList);
router.get('/program/:id', ProgramCTRL.programReadOne);
router.post('/program', ProgramCTRL.programCreateOne);
router.put('/program/:id', ProgramCTRL.programUpdateOne);
router.delete('/program/:id', ProgramCTRL.programDeleteOne);

// On Program CRUD API
router.get('/onprogram/lecturer/:id', ProgramCTRL.lecturerOnProgramList);
router.get('/onprogram/program/:id', ProgramCTRL.programOnProgramList);
router.post('/onprogram', ProgramCTRL.onprogramCreateOne);
router.delete('/onprogram/:id', ProgramCTRL.onProgramDeleteOne);

// Program created by CRUD API
router.get('/programcreatedby/institute/:id', ProgramCTRL.institutionProgramCreatedByList);
router.get('/programcreatedby/program/:id', ProgramCTRL.programProgramCreatedByList);
router.post('/programcreatedby', ProgramCTRL.ProgramCreatedByCreateOne);
router.delete('/programcreatedby/:id', ProgramCTRL.ProgramCreatedByDeleteOne);

// Course CRUD API
router.get('/courses', CourseCTRL.coursesList);
router.get('/course/:id', CourseCTRL.courseReadOne);
router.post('/course', CourseCTRL.courseCreateOne);
router.put('/course/:id', CourseCTRL.courseUpdateOne);
router.delete('/course/:id', CourseCTRL.courseDeleteOne);

// On Course CRUD API
router.get('/oncourse/lecturer/:id', CourseCTRL.lecturerOnCourseList);
router.get('/oncourse/course/:id', CourseCTRL.courseOnCourseList);
router.post('/oncourse', CourseCTRL.onCourseCreateOne);
router.delete('/oncourse/:id', CourseCTRL.onCourseDeleteOne);

// Course created by CRUD API
router.get('/coursecreatedby/institute/:id', CourseCTRL.institutionCourseCreatedByList);
router.get('/coursecreatedby/course/:id', CourseCTRL.courseCourseCreatedByList);
router.post('/coursecreatedby', CourseCTRL.courseCreatedByCreateOne);
router.delete('/coursecreatedby/:id', CourseCTRL.courseCreatedByDeleteOne);

// Chapter CRUD API
router.get('/chapters/course/:id', CourseCTRL.courseChaptersList);
router.get('/chapter/:id', CourseCTRL.chapterReadOne);
router.post('/chapter', CourseCTRL.chapterCreateOne);
router.put('/chapter/:id', CourseCTRL.chapterUpdateOne);
router.delete('/chapter/:id', CourseCTRL.chapterDeleteOne);

// Part CRUD API
router.get('/parts/chapter/:id', CourseCTRL.chapterpartsList);
router.get('/part/:id', CourseCTRL.partReadOne);
router.post('/part', CourseCTRL.partCreateOne);
router.put('/part/:id', CourseCTRL.partUpdateOne);
router.delete('/part/:id', CourseCTRL.partDeleteOne);

// Material type CRUD API
router.get('/material_types/', CourseCTRL.materialTypesList);
router.get('/material_type/:id', CourseCTRL.materialTypeReadOne);
router.post('/material_type', CourseCTRL.materialTypeCreateOne);
router.delete('/material_type/:id', CourseCTRL.materialTypeDeleteOne);

// Material CRUD API
router.get('/materials/part/:id', CourseCTRL.partmaterialsList);
router.get('/material/:id', CourseCTRL.materialReadOne);
router.post('/material', CourseCTRL.materialCreateOne);
router.put('/material/:id', CourseCTRL.materialUpdateOne);
router.delete('/material/:id', CourseCTRL.materialDeleteOne);

// Student Result CRUD API
router.get('/studentresults/enrolledcourse/:id', ParticipationCTRL.enrolledCourseStudentResultsList);
router.get('/studentresult/:id', ParticipationCTRL.studentResultReadOne);
router.post('/studentresult', ParticipationCTRL.studentResultCreateOne);
router.put('/studentresult/:id', ParticipationCTRL.studentResultUpdateOne);
router.delete('/studentresult/:id', ParticipationCTRL.studentResultDeleteOne);

// Enrolled Course CRUD API
router.get('/enrolledcourse/course/:course_id/count', ParticipationCTRL.enrolledCourseCount)
router.get('/enrolledcourses/student/:id', ParticipationCTRL.studentEnrolledCoursesList);
router.get('/enrolledcourse/:id', ParticipationCTRL.enrolledCourseReadOne);
router.post('/enrolledcourse', ParticipationCTRL.enrolledCourseCreateOne);
router.put('/enrolledcourse/:id', ParticipationCTRL.enrolledCourseUpdateOne);
router.delete('/enrolledcourse/:id', ParticipationCTRL.enrolledCourseDeleteOne);

// Course Session CRUD API
router.get('/coursesessions/course/:id', ParticipationCTRL.courseCourseSessionsList);
router.get('/coursesession/:id', ParticipationCTRL.courseSessionReadOne);
router.post('/coursesession', ParticipationCTRL.courseSessionCreateOne);
router.put('/coursesession/:id', ParticipationCTRL.courseSessionUpdateOne);
router.delete('/coursesession/:id', ParticipationCTRL.courseSessionDeleteOne);

// Status CRUD API
router.get('/statuss/part/:id', ParticipationCTRL.statusesList);
router.get('/status/:id', ParticipationCTRL.statusReadOne);
router.post('/status', ParticipationCTRL.statusCreateOne);
router.put('/status/:id', ParticipationCTRL.statusUpdateOne);
router.delete('/status/:id', ParticipationCTRL.statusDeleteOne);

// Program Session CRUD API
router.get('/programsessions/program/:id', ParticipationCTRL.programProgramSessionsList);
router.get('/programsession/:id', ParticipationCTRL.programSessionReadOne);
router.post('/programsession', ParticipationCTRL.programSessionCreateOne);
router.put('/programsession/:id', ParticipationCTRL.programSessionUpdateOne);
router.delete('/programsession/:id', ParticipationCTRL.programSessionDeleteOne);

// Enrolled Program CRUD API
router.get('/enrolledprograms/part/:id', ParticipationCTRL.programEnrolledProgramsList);
router.get('/enrolledprogram/:id', ParticipationCTRL.enrolledProgramReadOne);
router.post('/enrolledprogram', ParticipationCTRL.enrolledProgramCreateOne);
router.put('/enrolledprogram/:id', ParticipationCTRL.enrolledProgramUpdateOne);
router.delete('/enrolledprogram/:id', ParticipationCTRL.enrolledProgramDeleteOne);

// Favorite Course
router.get('/favoritecourses/student/:id', studentCTRL.favoriteCourseList);
router.get('/favoritecourse/student/:student_id/course/:course_id', studentCTRL.favoriteCourseReadOne);
router.post('/favoritecourse', studentCTRL.favoriteCourseCreateOne);
router.delete('/favoritecourse/student/:student_id/course/:course_id', studentCTRL.favoriteCourseDeleteOne);

// Favorite Program
router.get('/favoriteprograms/student/:id', studentCTRL.favoriteProgramList);
router.get('/favoriteprogram/student/:student_id/program/:program_id', studentCTRL.favoriteProgramReadOne);
router.post('/favoriteprogram', studentCTRL.favoriteProgramCreateOne);
router.delete('/favoriteprogram/student/:student_id/program/:program_id', studentCTRL.favoriteProgramDeleteOne);

// Comment
router.get('/comments/:id', commentCTRL.commentList);
router.get('/comments/reply/:id', commentCTRL.commentReplyList);
router.get('/comment/:id', commentCTRL.commentReadOne);
router.post('/comment', commentCTRL.commentCreateOne);
router.delete('/comment/:id', commentCTRL.commentDeleteOne);

// Auth
router.post('/login', AuthCTRL.login)

module.exports = router;