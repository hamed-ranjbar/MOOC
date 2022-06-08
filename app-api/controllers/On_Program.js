const {
    On_Program
} = require("../models/db");

const lecturerOnProgramList = async (req, res) => {
    const lecturerId = req.params.id;
    let onProgramList;
    try {
        onProgramList = await On_Program.findAll({
            where: {
                lecturer_id: lecturerId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!onProgramList.length)
        res.status(404).json({
            'message': 'NO ON_PROGRAM FOUND!'
        });
    else
        res.status(200).json(onProgramList);
};
const programOnProgramList = async (req, res) => {
    const programId = req.params.id;
    let onProgramList;
    try {
        onProgramList = await On_Program.findAll({
            where: {
                program_id: programId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!onProgramList.length)
        res.status(404).json({
            'message': 'NO ON_PROGRAM FOUND!'
        });
    else
        res.status(200).json(onProgramList);
};
const onprogramCreateOne = async (req, res) => {
    const onProgramInstance = {
        lecturer_id: req.body.lecturer_id,
        program_id: req.body.program_id
    };
    let onProgram;
    try {
        onProgram = await On_Program.create(onProgramInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(onProgram);
};
const onProgramDeleteOne = async (req, res) => {
    const onProgramId = req.params.id;
    let onProgram;
    try {
        onProgram = await On_Program.findOne({
            where: {
                id: onProgramId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!onProgram) {
        res.status(404).json({
            'message': 'ON_PROGRAM NOT FOUND!'
        });
        return;
    }
    onProgram.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(204).json({});
    });
};

module.exports = {
    lecturerOnProgramList,
    programOnProgramList,
    onprogramCreateOne,
    onProgramDeleteOne
}