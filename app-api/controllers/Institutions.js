const {
    Institution
} = require('../models/db');

// Read institutions List
const institutionsList = async (req, res) => {
    const institutionsList = await Institution.findAll();
    console.log("All institutes:", JSON.stringify(institutionsList, null, 2));
    if (institutionsList == null)
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR'
        });
    else if (institutionsList.length)
        res.status(200).json(institutionsList);
    else
        res.status(404).json({
            'message': 'NO INSTITUTIONS FOUND!'
        });
};
// Read an institution
const institutionReadOne = async (req, res) => {
    const institution_id = req.params.id;
    const institute = await Institution.findOne({
        where: {
            id: institution_id
        }
    });
    if (institute)
        res.status(200).json(institute);
    else
        res.status(404).json({
            'message': 'INSTITUTE NOT FOUND!'
        });
};
// Create an institute
const institutionCreateOne = async (req, res) => {
    let instituteInstance = {
        name: req.body.name
    };
    const institute = await Institution.create(instituteInstance);
    res.status(201).json(institute.toJSON());
};
// Update an institute
const institutionUpdateOne = async (req, res) => {
    const institution_id = req.params.id;
    const institute = await Institution.findOne({
        where: {
            id: institution_id
        }
    });
    if (institute == null) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    } else if (!institute) {
        res.status(404).json({
            'message': 'INSTITUTION NOT FOUND!'
        });
        return;
    }
    institute.name = req.body.name;
    institute.save().then((instance, err) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(instance);
    })
};
// Delete an institute
const instituteDeleteOne = async (req, res) => {
    const institution_id = req.params.id;
    const institute = await Institution.findOne({
        where: {
            id: institution_id
        }
    });
    if (!institute) {
        res.status(404).json({
            'message': 'INSTITUTION NOT FOUND!'
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