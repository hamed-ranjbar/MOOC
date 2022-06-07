const {
    Program
} = require('../models/db');

const programsList = async (req, res) => {
    const programList = await Program.findAll();
    if (programList == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    else if (!programList.length)
        res.status(404).json({
            'message': 'NO PROGRAM FOUND!'
        });
    else
        res.status(200).json(programList);
};
const programReadOne = async (req, res) => {
    const programId = req.params.id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    res.status(200).json(program);
};
const programCreateOne = async (req, res) => {
    let program = {
        name: req.body.name,
        description: req.body.description,
        active: req.body.active
    };
    try {
        await Program.create(program);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(program);
};
const programUpdateOne = async (req, res) => {
    const programId = req.params.id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    program.name = req.body.name;
    program.description = req.body.description;
    program.active = req.body.active;
    program.save().then((program, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(200).json(program);
    });
};
const programDeleteOne = async (req, res) => {
    const programId = req.params.id;
    let program;
    try {
        program = await Program.findOne({
            where: {
                id: programId
            }
        });
    } catch (err) {
        res.status(404).json({
            'message': 'PROGRAM NOT FOUND!'
        });
        return;
    }
    program.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(204).json({});
    });
};

module.exports = {
    programsList,
    programReadOne,
    programCreateOne,
    programUpdateOne,
    programDeleteOne
}