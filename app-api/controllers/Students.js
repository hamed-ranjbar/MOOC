const {
    Student
} = require('../models/db');

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
    let student;
    try {
        student = await Student.findOne({
            where: {
                id: studentId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'STUDENT NOT FOUND!'
        });
        return;
    }
    res.status(200).json(student);
};
const studentCreateOne = async (req, res) => {
    let student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    try {
        await Student.create(student);
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
    let student;
    try {
        student = await Student.findOne({
            where: {
                id: studentId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'STUDENT NOT FOUND!'
        });
        return;
    }
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.email = req.body.email;
    student.password = req.body.password;
    student.save().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(200).json(student);
    });
};
const studentDeleteOne = async (req, res) => {
    const studentId = req.params.id;
    let student;
    try {
        student = await Student.findOne({
            where: {
                id: studentId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'STUDENT NOT FOUND!'
        });
        return;
    }
    student.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR'
            })
        else
            res.status(204).json({});
    });
};

module.exports = {
    studentsList,
    studentReadOne,
    studentCreateOne,
    studentUpdateOne,
    studentDeleteOne
};