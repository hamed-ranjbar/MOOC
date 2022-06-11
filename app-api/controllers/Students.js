const {
    Student
} = require('../models/db');

////////////////////////////////
//                            //
//          Student           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const studentsList = async (req, res) => {
    const studentList = await Student.findAll();
    if (studentList == null)
        res.status(500).json({
            'message': 'INTERAL SERVER ERROR!'
        });
    else if (!studentList.length)
        res.status(404).json({
            'message': 'NO STUDENT FOUND!'
        });
    else
        res.status(200).json(studentList);
};
const studentReadOne = async (req, res) => {
    const studentId = req.params.student_id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!program) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    res.status(200).json(student);
};
const studentCreateOne = async (req, res) => {
    const studentInstance = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    let student;
    try {
        student = await Student.create(studentInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(student);
};
const studentUpdateOne = async (req, res) => {
    const studentId = req.params.id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!program) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.email = req.body.email;
    student.password = req.body.password;
    try {
        await student.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(student);
};
const studentDeleteOne = async (req, res) => {
    const studentId = req.params.id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!program) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    try {
        await student.destroy();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR'
        });
        return;
    }
    res.status(204).json({});
};

module.exports = {
    studentsList,
    studentReadOne,
    studentCreateOne,
    studentUpdateOne,
    studentDeleteOne
};