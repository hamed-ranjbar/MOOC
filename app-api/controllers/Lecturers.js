const {
    Lecturer
} = require('../models/db');

const lecturersList = async (req, res) => {
    const lecturerList = await Lecturer.findAll();
    if (lecturerList == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    else if (!lecturerList.length)
        res.status(404).json({
            'message': 'NO LECTURER FOUND!'
        });
    else
        res.status(200).json(lecturerList);
};
const lecturerReadOne = async (req, res) => {
    const lecturerId = req.params.id;
    let lecturer;
    try {
        lecturer = await Lecturer.findOne({
            where: {
                id: lecturerId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!lecturer) {
        res.status(404).json({
            'message': 'LECTURER NOT FOUND!'
        });
        return;
    }
    res.status(200).json(lecturer);
};
const lecturerCreateOne = async (req, res) => {
    const lecturerInstance = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        institution_id: req.body.institution_id
    }
    let lecturer;
    try {
        lecturer = await Lecturer.create(lecturerInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(lecturer);
};
const lecturerUpdateOne = async (req, res) => {
    const lecturerId = req.params.id;
    let lecturer;
    try {
        lecturer = await Lecturer.findOne({
            where: {
                id: lecturerId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!lecturer) {
        res.status(404).json({
            'message': 'LECTURER NOT FOUND!'
        });
        return;
    }
    lecturer.firstName = req.body.firstName;
    lecturer.lastName = req.body.lastName;
    lecturer.title = req.body.title;
    lecturer.institution_id = req.body.institution_id;

    lecturer.save().then((lecturer, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(200).json(lecturer);
    });
};
const lecturerDeleteOne = async (req, res) => {
    const lecturerId = req.params.id;
    let lecturer;
    try {
        lecturer = await Lecturer.findOne({
            where: {
                id: lecturerId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!lecturer) {
        res.status(404).json({
            'message': 'LECTURER NOT FOUND!'
        });
        return;
    }
    lecturer.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(204).json({});
    })
};

module.exports = {
    lecturersList,
    lecturerReadOne,
    lecturerCreateOne,
    lecturerUpdateOne,
    lecturerDeleteOne
};