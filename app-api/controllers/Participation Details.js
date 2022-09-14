const {
    EnrolledCourse,
    StudentResults,
    Status,
    CourseSession,
    ProgramSession,
    EnrolledProgram,
    Course
} = require('../models/db');

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const enrolledCourseStudentResultsList = async (req, res) => {
    const enrolledCourseId = req.params.id;
    let studentResultsList;
    try {
        studentResultsList = await StudentResults.findAll({
            where: {
                enrolled_course_id: enrolledCourseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!studentResultsList.length)
        res.status(404).json({
            'message': 'NO STUDENT_RESULT FOUND!'
        });
    else
        res.status(200).json(studentResultsList);
};
const studentResultReadOne = async (req, res) => {
    const studentResultId = req.params.id;
    let studentResult;
    try {
        studentResult = await StudentResults.findOne({
            where: {
                id: studentResultId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!studentResult)
        res.status(404).json({
            'message': 'STUDENT RESULT NOT FOUND!'
        });
    else
        res.status(200).json(studentResult);
};
const studentResultCreateOne = async (req, res) => {
    const studentResultInstance = {
        attempt: req.body.attempt,
        attempt_link: req.body.attempt_link,
        started: req.body.started,
        ended: req.body.ended,
        score: req.body.score,
        material_id: req.body.material_id,
        enrolled_course_id: req.body.enrolled_course_id
    };
    let studentResult;
    try {
        studentResult = await StudentResults.create(studentResultInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(studentResult);
};
const studentResultUpdateOne = async (req, res) => {
    const studentResultId = req.params.id;
    let studentResult;
    try {
        studentResult = await StudentResults.findOne({
            where: {
                id: studentResultId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!studentResult) {
        res.status(404).json({
            'message': 'STUDENT RESULT NOT FOUND!'
        });
        return;
    }
    studentResult.attempt = req.body.attempt;
    studentResult.attempt_link = req.body.attempt_link;
    studentResult.started = req.body.started;
    studentResult.ended = req.body.ended;
    studentResult.score = req.body.score;
    studentResult.material_id = req.body.material_id;
    studentResult.enrolled_course_id = req.body.enrolled_course_id;
    try {
        await studentResult.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(studentResult);
};
const studentResultDeleteOne = async (req, res) => {
    const studentResultId = req.params.id;
    let studentResult;
    try {
        studentResult = await StudentResults.findOne({
            where: {
                id: studentResultId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!studentResult) {
        res.status(404).json({
            'message': 'STUDENT RESULT NOT FOUND!'
        });
    }
    try {
        await studentResult.destroy();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const studentEnrolledCoursesList = async (req, res) => {
    const studentId = req.params.id;
    let enrolledCourseList;
    try {
        enrolledCourseList = await EnrolledCourse.findAll({
            where: {
                student_id: studentId
            },
            include: [Course]
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledCourseList.length)
        res.status(404).json({
            'message': 'NO ENROLLED_COURSE FOUND!'
        });
    else
        res.status(200).json(enrolledCourseList);
};

const enrolledCourseCount = async (req, res) => {
    const {
        course_id
    } = req.params;
    try {
        const enrolledCoursesCountNumber = await EnrolledCourse.count({
            where: {
                course_id
            }
        });
        res.status(200).json({
            count: enrolledCoursesCountNumber
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    }
}
const enrolledCourseReadOne = async (req, res) => {
    const enrolledCourseId = req.params.id;
    let enrolledCourse;
    try {
        enrolledCourse = await EnrolledCourse.findOne({
            where: {
                id: enrolledCourseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledCourse)
        res.status(404).json({
            'message': 'ENROLLED_COURSE NOT FOUND!'
        });
    else
        res.status(200).json(enrolledCourse);
};
const enrolledCourseCreateOne = async (req, res) => {
    const enrolledCourseInstance = {
        student_id,
        course_session_id,
        enrollement_date,
        status_id,
        status_date,
        final_grade,
        certificate_id,
        course_id
    } = req.body;
    let enrolledCourse;
    try {
        enrolledCourse = await EnrolledCourse.create(enrolledCourseInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        console.log(err);
        return;
    }
    res.status(201).json(enrolledCourse);
};
const enrolledCourseUpdateOne = async (req, res) => {
    const enrolledCourseId = req.params.id;
    let enrolledCourse;
    try {
        enrolledCourse = await EnrolledCourse.findOne({
            where: {
                id: enrolledCourseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledCourse) {
        res.status(404).json({
            'message': 'ENROLLED_COURSE NOT FOUND!'
        });
        return;
    }
    enrolledCourse.student_id = req.body.student_id;
    enrolledCourse.course_session_id = req.body.course_session_id;
    enrolledCourse.enrollement_date = req.body.enrollement_date;
    enrolledCourse.status_id = req.body.status_id;
    enrolledCourse.status_date = req.body.status_date;
    enrolledCourse.final_grade = req.body.final_grade;
    enrolledCourse.certificate_id = req.body.certificate_id;
    try {
        await enrolledCourse.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(enrolledCourse);
};
const enrolledCourseDeleteOne = async (req, res) => {
    const enrolledCourseId = req.params.id;
    let enrolledcourse;
    try {
        enrolledcourse = await EnrolledCourse.findOne({
            where: {
                id: enrolledCourseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledcourse) {
        res.status(404).json({
            'message': 'ENROLLED_COURSE NOT FOUND!'
        });
        return;
    }
    try {
        await enrolledCourse.destroy();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const courseCourseSessionsList = async (req, res) => {
    const courseId = req.params.id;
    let CourseSessionList;
    try {
        CourseSessionList = await CourseSession.findAll({
            where: {
                course_id: courseId
            }
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!CourseSessionList.length)
        res.status(404).json({
            'message': 'NO COURSE_SESSION FOUND!'
        });
    else
        res.status(200).json(CourseSessionList);
};
const courseSessionReadOne = async (req, res) => {
    const courseSessionId = req.params.id;
    let courseSession;
    try {
        courseSession = await CourseSession.findOne({
            where: {
                id: courseSessionId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseSession)
        res.status(404).json({
            'message': 'COURSE_SESSION NOT FOUND!'
        });
    else
        res.status(200).json(courseSession);
};
const courseSessionCreateOne = async (req, res) => {
    const courseSessionInstance = {
        course_id: req.body.course_id,
        program_session_id: req.body.program_session_id,
        end_date: req.body.end_date,
        start_date: req.body.start_date
    };
    let courseSession;
    try {
        courseSession = await CourseSession.create(courseSessionInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        console.log(err);
        return;
    }
    res.status(201).json(courseSession);
};
const courseSessionUpdateOne = async (req, res) => {
    const courseSessionId = req.params.id;
    let courseSession;
    try {
        courseSession = await CourseSession.findOne({
            where: {
                id: courseSessionId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseSession) {
        res.status(404).json({
            'message': 'COURSE_SESSION NOT FOUND!'
        });
        return;
    }
    courseSession.course_id = req.body.course_id;
    courseSession.program_session_id = req.body.program_session_id;
    courseSession.end_date = req.body.end_date;
    courseSession.start_date = req.body.start_date;
    try {
        await courseSession.save()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(courseSession);
};
const courseSessionDeleteOne = async (req, res) => {
    const courseSessionId = req.params.id;
    let courseSession;
    try {
        courseSession = await CourseSession.findOne({
            where: {
                id: courseSessionId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseSession) {
        res.status(404).json({
            'message': 'COURSE_SESSION NOT FOUND!'
        });
        return;
    }
    try {
        await courseSession.destroy()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const statusesList = async (req, res) => {
    let status;
    try {
        status = await Status.findAll();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!status.length)
        res.status(404).json({
            'message': 'NO STATUS FOUND!'
        });
    else
        res.status(200).json(status);
};
const statusReadOne = async (req, res) => {
    const statusId = req.params.id;
    let status;
    try {
        status = await Status.findOne({
            where: {
                id: statusId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!status)
        res.status(404).json({
            'message': 'STATUS NOT FOUND!'
        });
    else
        res.status(200).json(status);
};
const statusCreateOne = async (req, res) => {
    const statusInstance = {
        status_name: req.body.status_name
    };
    let status;
    try {
        status = await Status.create(statusInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(status);
};
const statusUpdateOne = async (req, res) => {
    const statusId = req.params.id;
    let status;
    try {
        status = await Status.findOne({
            where: {
                id: statusId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!status) {
        res.status(404).json({
            'message': 'STATUS NOT FOUND!'
        });
        return;
    }
    status.status_name = req.body.status_name;
    try {
        await status.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(status);
};
const statusDeleteOne = async (req, res) => {
    const statusId = req.params.id;
    let status;
    try {
        status = await Status.findOne({
            where: {
                id: statusId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!status) {
        res.status(404).json({
            'message': 'STATUS NOT FOUND!'
        });
        return;
    }
    try {
        await status.destroy();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const programProgramSessionsList = async (req, res) => {
    const programId = req.params.id;
    let programSessionList;
    try {
        programSessionList = await ProgramSession.findAll({
            where: {
                program_id: programId
            }
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programSessionList.length)
        res.status(404).json({
            'message': 'NO PROGRAM_SESSION FOUND!'
        });
    else
        res.status(200).json(programSessionList);
};
const programSessionReadOne = async (req, res) => {
    const programSessionId = req.params.id;
    let programSession;
    try {
        programSession = await Status.findOne({
            where: {
                id: programSessionId
            }
        });
    } catch (err) {
        res.programSession(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programSession)
        res.programSession(404).json({
            'message': 'PROGRAM_SESSION NOT FOUND!'
        });
    else
        res.status(200).json(programSession);
};
const programSessionCreateOne = async (req, res) => {
    const programSessionInstance = {
        program_id: req.body.program_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };
    let programSession;
    try {
        programSession = await ProgramSession.create(programSessionInstance);
    } catch (err) {}
};
const programSessionUpdateOne = async (req, res) => {
    const programSessionId = req.params.id;
    let programSession;
    try {
        programSession = await Status.findOne({
            where: {
                id: programSessionId
            }
        });
    } catch (err) {
        res.programSession(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programSession) {
        res.programSession(404).json({
            'message': 'PROGRAM_SESSION NOT FOUND!'
        });
        return;
    }
    programSession.program_id = req.body.program_id;
    programSession.start_date = req.body.start_date;
    programSession.end_date = req.body.end_date;
    try {
        await programSession.save();
    } catch (err) {
        res.programSession(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.programSession(200).json(programSession);
};
const programSessionDeleteOne = async (req, res) => {
    const programSessionId = req.params.id;
    let programSession;
    try {
        programSession = await Status.findOne({
            where: {
                id: programSessionId
            }
        });
    } catch (err) {
        res.programSession(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programSession) {
        res.programSession(404).json({
            'message': 'PROGRAM_SESSION NOT FOUND!'
        });
        return;
    } else
        res.status(200).json(programSession);

    try {
        await programSession.destroy();
    } catch (err) {
        res.programSession(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.programSession(204).json({});
};

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const programEnrolledProgramsList = async (req, res) => {
    const programSessionId = req.params.id;
    let enrolledProgramList;
    try {
        enrolledProgramList = await EnrolledProgram.findAll({
            where: {
                program_session_id: programSessionId
            }
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledProgramList.length)
        res.status(404).json({
            'message': 'NO ENROLLED_PROGRAM FOUND!'
        });
    else
        res.status(200).json(enrolledProgramList);
};
const enrolledProgramReadOne = async (req, res) => {
    const enrolledProgramId = req.params.id;
    let enrolledProgram;
    try {
        enrolledProgram = await EnrolledProgram.findOne({
            where: {
                id: enrolledProgramId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledProgram)
        res.status(404).json({
            'message': 'ENROLLED_PROGRAM NOT FOUND!'
        });
    else
        res.status(200).json(enrolledProgram);
};
const enrolledProgramCreateOne = async (req, res) => {
    const enrolledProgramInstance = {
        student_id: req.body.student_id,
        program_session_id: req.body.program_session_id,
        enrollement_date: req.body.enrollement_date,
        status_id: req.body.status_id,
        status_date: req.body.status_date,
        final_grade: req.body.final_grade,
        certificate_id: req.body.certificate_id
    };
    let enrolledProgram;
    try {
        enrolledProgram = await EnrolledProgram.create(enrolledProgramInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(enrolledProgram);
};
const enrolledProgramUpdateOne = async (req, res) => {
    const enrolledProgramId = req.params.id;
    let enrolledProgram;
    try {
        enrolledProgram = await EnrolledProgram.findOne({
            where: {
                id: enrolledProgramId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledProgram) {
        res.status(404).json({
            'message': 'ENROLLED_PROGRAM NOT FOUND!'
        });
        return;
    }
    enrolledProgram.student_id = req.body.student_id;
    enrolledProgram.program_session_id = req.body.program_session_id;
    enrolledProgram.enrollement_date = req.body.enrollement_date;
    enrolledProgram.status_id = req.body.status_id;
    enrolledProgram.status_date = req.body.status_date;
    enrolledProgram.final_grade = req.body.final_grade;
    enrolledProgram.certificate_id = req.body.certificate_id;
    try {
        await enrolledProgram.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(enrolledProgram);
};
const enrolledProgramDeleteOne = async (req, res) => {
    const enrolledProgramId = req.params.id;
    let enrolledProgram;
    try {
        enrolledProgram = await EnrolledProgram.findOne({
            where: {
                id: enrolledProgramId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!enrolledProgram)
        res.status(404).json({
            'message': 'ENROLLED_PROGRAM NOT FOUND!'
        });
    try {
        await enrolledProgram.destroy();
    } catch (err) {
        res.status(204).json({});
        return;
    }
    res.status(500).json({
        'message': 'INTERNAL SERVER ERROR!'
    });
};

module.exports = {
    enrolledCourseStudentResultsList,
    studentResultReadOne,
    studentResultCreateOne,
    studentResultUpdateOne,
    studentResultDeleteOne,
    studentEnrolledCoursesList,
    enrolledCourseCount,
    enrolledCourseReadOne,
    enrolledCourseCreateOne,
    enrolledCourseUpdateOne,
    enrolledCourseDeleteOne,
    courseCourseSessionsList,
    courseSessionReadOne,
    courseSessionCreateOne,
    courseSessionUpdateOne,
    courseSessionDeleteOne,
    statusesList,
    statusReadOne,
    statusCreateOne,
    statusUpdateOne,
    statusDeleteOne,
    programProgramSessionsList,
    programSessionReadOne,
    programSessionCreateOne,
    programSessionUpdateOne,
    programSessionDeleteOne,
    programEnrolledProgramsList,
    enrolledProgramReadOne,
    enrolledProgramCreateOne,
    enrolledProgramUpdateOne,
    enrolledProgramDeleteOne
}