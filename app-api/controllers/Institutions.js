const {
    Institution
} = require('../models/db');

const institutionsList = async (req, res) => {
    const institutionList = await Institution.findAll();
    console.log("All institutes:", JSON.stringify(institutionList, null, 2));
    if (institutionList == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR'
        });
    else if (institutionList.length)
        res.status(200).json(institutionList);
    else
        res.status(404).json({
            'message': 'NO INSTITUTIONS FOUND!'
        });
};
const institutionReadOne = async (req, res) => {
    const institution_id = req.params.id;
    let institute;
    try {
        institute = await Institution.findOne({
            where: {
                id: institution_id
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!institute) {
        res.status(404).json({
            'message': 'INSTITUTE NOT FOUND!'
        });
        return;
    }
    res.status(200).json(institute);
};
const institutionCreateOne = async (req, res) => {
    const instituteInstance = {
        name: req.body.name
    };
    let institute;
    try {
        institute = await Institution.create(instituteInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(institute);
};
const institutionUpdateOne = async (req, res) => {
    const institution_id = req.params.id;
    let institute;
    try {
        institute = await Institution.findOne({
            where: {
                id: institution_id
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!institute) {
        res.status(404).json({
            'message': 'INSTITUTE NOT FOUND!'
        });
        return;
    }
    institute.name = req.body.name;
    institute.save().then((instance, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(200).json(instance);
    })
};
const instituteDeleteOne = async (req, res) => {
    const institution_id = req.params.id;
    let institute;
    try {
        institute = await Institution.findOne({
            where: {
                id: institution_id
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!institute) {
        res.status(404).json({
            'message': 'INSTITUTE NOT FOUND!'
        });
        return;
    }
    institute.destroy().then((response, err) => {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        else
            res.status(204).json({});
    });
};

module.exports = {
    institutionsList,
    institutionReadOne,
    institutionCreateOne,
    institutionUpdateOne,
    instituteDeleteOne
};