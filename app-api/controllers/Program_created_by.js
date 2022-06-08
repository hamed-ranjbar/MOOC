const {
    Program_created_by
} = require("../models/db");

const institutionProgramCreatedByList = async (req, res) => {
    const institutionId = req.params.id;
    let programCreatedByList;
    try {
        programCreatedByList = Program_created_by.findAll({
            where: {
                institution_id: institutionId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programCreatedByList.length)
        res.status(404).json({
            'message': 'NO PROGRAM_CREATED_BY FOUND!'
        });
    else
        res.status(200).json(programCreatedByList);
};
const programProgramCreatedByList = async (req, res) => {
    const programId = req.params.id;
    let programCreatedByList;
    try {
        programCreatedByList = Program_created_by.findAll({
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
    if (!programCreatedByList.length)
        res.status(404).json({
            'message': 'NO PROGRAM_CREATED_BY FOUND!'
        });
    else
        res.status(200).json(programCreatedByList);
};
const ProgramCreatedByCreateOne = async (req, res) => {
    const programCreatedByInstance = {
        institution_id: req.body.institution_id,
        program_id: req.body.program_id
    };
    let programCreatedBy;
    try {
        programCreatedBy = await Program_created_by.create(programCreatedByInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(programCreatedBy);
};
const ProgramCreatedByDeleteOne = async (req, res) => {
    const programCreatedById = req.params.id;
    let programCreatedBy;
    try {
        programCreatedBy = await Program_created_by.findOne({
            where: {
                id: programCreatedById
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!programCreatedBy) {
        res.status(404).json({
            'message': 'PROGRAM_CREATED_BY NOT FOUND!'
        });
        return;
    }
    programCreatedBy.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(204).json({});
    });
};

module.exports = {
    institutionProgramCreatedByList,
    programProgramCreatedByList,
    ProgramCreatedByCreateOne,
    ProgramCreatedByDeleteOne
}