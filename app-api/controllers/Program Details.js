const {
    Program,
    On_Program,
    Program_created_by,
    Course
} = require('../models/db');

////////////////////////////////
//                            //
//          Program           //
//     (API Controllers)      //
//                            //
////////////////////////////////

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
            },
            include:[Course]
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
    res.status(200).json(program);
};
const programCreateOne = async (req, res) => {
    const programInstance = {
        name: req.body.name,
        description: req.body.description,
        active: req.body.active
    };
    let program;
    try {
        program = await Program.create(programInstance);
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
    program.name = req.body.name;
    program.description = req.body.description;
    program.active = req.body.active;
    try {
        await program.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(program);
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
        await program.destroy();
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
//        On Program          //
//     (API Controllers)      //
//                            //
////////////////////////////////

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
    try {
        await onProgram.destroy();
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
//     Program Created By     //
//     (API Controllers)      //
//                            //
////////////////////////////////

const institutionProgramCreatedByList = async (req, res) => {
    const institutionId = req.params.id;
    let programCreatedByList;
    try {
        programCreatedByList = await Program_created_by.findAll({
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
        programCreatedByList = await Program_created_by.findAll({
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
    try {
        await programCreatedBy.destroy();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

module.exports = {
    lecturerOnProgramList,
    programOnProgramList,
    onprogramCreateOne,
    onProgramDeleteOne,
    institutionProgramCreatedByList,
    programProgramCreatedByList,
    ProgramCreatedByCreateOne,
    ProgramCreatedByDeleteOne,
    programsList,
    programReadOne,
    programCreateOne,
    programUpdateOne,
    programDeleteOne
}