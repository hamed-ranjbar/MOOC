const {
    Student,
    StudentFavoriteProgram,
    StudentFavoriteCourse,
    Program,
    Course
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
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
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
    student.setHash(req.body.password);
    try {
        student.save()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    const token = student.generateJWT();
    res.status(201).json({
        token
    });
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
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
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

////////////////////////////////
//                            //
//      Favorite Course       //
//     (API Controllers)      //
//                            //
////////////////////////////////

const favoriteCourseList = async (req, res) => {
    const {
        id
    } = req.params;
    StudentFavoriteCourse.findAll({
        where: {
            student_id: id
        },
        include:Course
    }).then((favoriteList) => {
        if (!favoriteList.length)
            res.status(404).json({
                'message': 'NO FAVORITE COURSE FOUND!'
            });
        else
            res.status(200).json(favoriteList);
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};
const favoriteCourseReadOne = async (req, res) => {
    const {
        student_id,
        course_id
    } = req.params;
    StudentFavoriteCourse.findOne({
        where: {
            student_id,
            course_id
        }
    }).then(favoriteCourse => {
        if (!favoriteCourse)
            res.status(404).json({
                'message': 'FAVORITE COURSE NOT FOUND!'
            });
        else
            res.status(200).json(favoriteCourse);
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};
const favoriteCourseCreateOne = async (req, res) => {
    const favoriteCourseInstance = {
        student_id,
        course_id
    } = req.body;
    StudentFavoriteCourse.create(favoriteCourseInstance)
        .then(newFavoriteCourse => {
            res.status(201).json(newFavoriteCourse);
        }).catch(err => {
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        });
};
const favoriteCourseDeleteOne = async (req, res) => {
    const {
        student_id,
        course_id
    } = req.params;
    StudentFavoriteCourse.findOne({
        where: {
            student_id,
            course_id
        }
    }).then(favoriteCourse => {
        if (!favoriteCourse)
            res.status(404).json({
                'message': 'FAVORITE COURSE NOT FOUND!'
            });
        else {
            favoriteCourse.destroy()
                .then(() => {
                    res.status(204).json({});
                }).catch(err => {
                    res.status(500).json({
                        'message': 'INTERNAL SERVER ERROR!'
                    });
                });
        }
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};

////////////////////////////////
//                            //
//     Favorite Program       //
//     (API Controllers)      //
//                            //
////////////////////////////////
const favoriteProgramList = async (req, res) => {
    const {
        id
    } = req.params;
    StudentFavoriteProgram.findAll({
        where: {
            student_id: id
        },
        include:Program
    }).then((favoriteList) => {
        if (!favoriteList.length)
            res.status(404).json({
                'message': 'NO FAVORITE PROGRAM FOUND!'
            });
        else
            res.status(200).json(favoriteList);
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};
const favoriteProgramReadOne = async (req, res) => {
    const {
        student_id,
        program_id
    } = req.params;
    StudentFavoriteProgram.findOne({
        where: {
            student_id,
            program_id
        }
    }).then(favoriteProgram => {
        if (!favoriteProgram)
            res.status(404).json({
                'message': 'FAVORITE PROGRAM NOT FOUND!'
            });
        else
            res.status(200).json(favoriteProgram);
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};
const favoriteProgramCreateOne = async (req, res) => {
    const favoriteProgramInstance = {
        student_id,
        program_id
    } = req.body;
    StudentFavoriteProgram.create(favoriteProgramInstance)
        .then(newFavoriteProgram => {
            res.status(201).json(newFavoriteProgram);
        }).catch(err => {
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        });
};
const favoriteProgramDeleteOne = async (req, res) => {
    const {
        student_id,
        program_id
    } = req.params;
    StudentFavoriteProgram.findOne({
        where: {
            student_id,
            program_id
        }
    }).then(favoriteProgram => {
        if (!favoriteProgram)
            res.status(404).json({
                'message': 'FAVORITE PROGRAM NOT FOUND!'
            });
        else {
            favoriteProgram.destroy()
                .then(() => {
                    res.status(204).json({});
                }).catch(err => {
                    res.status(500).json({
                        'message': 'INTERNAL SERVER ERROR!'
                    });
                });
        }
    }).catch(err => {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    });
};

module.exports = {
    studentsList,
    studentReadOne,
    studentCreateOne,
    studentUpdateOne,
    studentDeleteOne,
    favoriteCourseList,
    favoriteCourseReadOne,
    favoriteCourseCreateOne,
    favoriteCourseDeleteOne,
    favoriteProgramList,
    favoriteProgramReadOne,
    favoriteProgramCreateOne,
    favoriteProgramDeleteOne
};