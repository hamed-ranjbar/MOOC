const {
    Lecturer
} = require('../models/db');

// List Lecturers
const lecturersList = async (req, res) => {
    const lecturersList = await Lecturer.findAll();
    if (lecturersList == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    else if (!lecturersList.length)
        res.status(404).json({
            'message': 'NO LECTURER FOUND!'
        });
    else
        res.status(200).json(lecturersList);
};
// Read a Lecturer
const lecturerReadOne = async (req, res) => {
    const lecturerId = req.params.id;
    const lecturer = await Lecturer.findOne({
        where: {
            id: lecturerId
        }
    });
    if (lecturer == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        })
    else if (!lecturer)
        res.status(404).json({
            'message': 'LECTURER NOT FOUND!'
        });
    else
        res.status(200).json(lecturer);
};
// Create a Lecturer
const lecturerCreateOne = async (req, res) => {
    const lecturer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        institution_id: req.body.institution_id
    }
    try {
        await Lecturer.create(lecturer);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(lecturer);
};
// Update a Lecturer
const lecturerUpdateOne = async (req, res) => {
    const lecturerId = req.params.id;
    const lecturer = await Lecturer.findOne({
        where: {
            id: lecturerId
        }
    });

    if (lecturer == null) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    } else if (!lecturer) {
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
// Delete a Lecturer
const lecturerDeleteOne = async (req, res) => {
    const lecturerId = req.params.id;
    const lecturer = await Lecturer.findOne({
        where: {
            id: lecturerId
        }
    });

    if (lecturer == null) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    } else if (!lecturer) {
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