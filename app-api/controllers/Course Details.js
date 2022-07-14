const {
    On_Course,
    Course_created_by,
    Course,
    Chapter,
    Part,
    Material,
    MaterialType
} = require("../models/db");

////////////////////////////////
//                            //
//          Course            //
//     (API Controllers)      //
//                            //
////////////////////////////////

const coursesList = async (req, res) => {
    let courseList;
    try {
        courseList = await Course.findAll();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseList.length)
        res.status(404).json({
            'message': 'NO COURSE FOUND!'
        });
    else
        res.status(200).json(courseList);
};
const courseReadOne = async (req, res) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findOne({
            where: {
                id: courseId
            },
            include: [{
                model: Chapter,
                include: [{
                    model: Part,
                    include: [Material]
                }]
            }]
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!course)
        res.status(404).json({
            'message': 'COURSE NOT FOUND!'
        });
    else
        res.status(200).json(course);
};
const courseCreateOne = async (req, res) => {
    const courseInstance = {
        name: req.body.name,
        commitment: req.body.commitment,
        description: req.body.description,
        program_id: req.body.program_id,
        min_grade: req.body.min_grade,
        course_price: req.body.course_price,
        active: req.body.active
    }
    let course;
    try {
        course = await Course.create(courseInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(course);
};
const courseUpdateOne = async (req, res) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findOne({
            where: {
                id: courseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!course) {
        res.status(404).json({
            'message': 'COURSE NOT FOUND!'
        });
        return;
    }
    course.name = req.body.name;
    course.commitment = req.body.commitment;
    course.description = req.body.description;
    course.program_id = req.body.program_id;
    course.min_grade = req.body.min_grade;
    course.course_price = req.body.course_price;
    course.active = req.body.active;
    try {
        await course.save();
    } catch (err) {
        if (err)
            res.status(500).json({
                'message': 'INTERNAL SERVER ERROR!'
            });
        return;
    }
    res.status(200).json(response);
};
const courseDeleteOne = async (req, res) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findOne({
            where: {
                id: courseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!course)
        res.status(404).json({
            'message': 'COURSE NOT FOUND!'
        });
    try {
        await course.destroy()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json({});
};

////////////////////////////////
//                            //
//         On Course          //
//     (API Controllers)      //
//                            //
////////////////////////////////

const lecturerOnCourseList = async (req, res) => {
    const lecturerId = req.params.id;
    let onCourse;
    try {
        onCourse = await On_Course.findAll({
            where: {
                lecturer_id: lecturerId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    }
    if (!onCourse.length)
        res.status(404).json({
            'message': 'NO ON_COURSE FOUND!'
        });
    else
        res.status(200).json(onCourse);
};
const courseOnCourseList = async (req, res) => {

    const courseId = req.params.id;
    let onCourse;
    try {
        onCourse = await On_Course.findAll({
            where: {
                course_id: courseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
    }
    if (!onCourse.length)
        res.status(404).json({
            'message': 'NO ON_COURSE FOUND!'
        });
    else
        res.status(200).json(onCourse);
};
const onCourseCreateOne = async (req, res) => {
    const onCourseInstance = {
        lecturer_id: req.body.lecturer_id,
        course_id: req.body.course_id
    }
    let onCourse;
    try {
        onCourse = await On_Course.create(onCourseInstance)
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(onCourse);
};
const onCourseDeleteOne = async (req, res) => {
    const onCourseId = req.params.id;
    let onCourse;
    try {
        onCourse = await On_Course.findOne({
            where: {
                id: onCourseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!onCourse) {
        res.status(404).json({
            'message': 'ON_COURSE NOT FOUND!'
        });
        return;
    }
    try {
        await onCourse.destroy();
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
//     Course Created By      //
//     (API Controllers)      //
//                            //
////////////////////////////////

const institutionCourseCreatedByList = async (req, res) => {
    const institutionId = req.params.id;
    let courseCreatedByList;
    try {
        courseCreatedByList = await Course_created_by.findAll({
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
    if (!courseCreatedByList.length)
        res.status(404).json({
            'message': 'NO COURSE_CREATED_BY FOUND!'
        });
    else
        res.status(200).json(courseCreatedByList);

};
const courseCourseCreatedByList = async (req, res) => {
    const courseId = req.params.id;
    let courseCreatedByList;
    try {
        courseCreatedByList = await Course_created_by.findAll({
            where: {
                course_id: courseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseCreatedByList.length)
        res.status(404).json({
            'message': 'NO COURSE_CREATED_BY FOUND!'
        });
    else
        res.status(200).json(courseCreatedByList);
};
const courseCreatedByCreateOne = async (req, res) => {
    const courseCreatedByInstance = {
        course_id: req.body.course_id,
        institution_id: req.body.institution_id
    }
    let courseCreatedBy;
    try {
        courseCreatedBy = await Course_created_by.create(courseCreatedByInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    };
    res.status(201).json(courseCreatedBy);
};
const courseCreatedByDeleteOne = async (req, res) => {
    const courseCreatedById = req.params.id;
    let courseCreatedBy;
    try {
        courseCreatedBy = await Course_created_by.findOne({
            where: {
                id: courseCreatedById
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseCreatedBy) {
        res.status(404).json({
            'message': 'NO COURSE_CREATED_BY FOUND!'
        });
        return;
    }
    courseCreatedBy.course_id = req.body.course_id;
    courseCreatedBy.institution_id = req.body.institution_id;
    try {
        courseCreatedBy.save();
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
//          Chapter           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const courseChaptersList = async (req, res) => {
    const courseId = req.params.id;
    let courseChapterList;
    try {
        courseChapterList = await Chapter.findAll({
            where: {
                course_id: courseId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!courseChapterList.length)
        res.status(404).json({
            'message': 'NO CHAPTER FOUND!'
        });
    else
        res.status(200).json(courseChapterList);
};
const chapterReadOne = async (req, res) => {
    const chapterId = req.params.id;
    let chapter;
    try {
        chapter = await Chapter.findOne({
            where: {
                id: chapterId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!chapter)
        res.status(404).json({
            'message': 'CHAPTER NOT FOUND!'
        });
    else
        res.status(200).json(chapter);
};
const chapterCreateOne = async (req, res) => {
    const chapterInstance = {
        chapter_no: req.body.chapter_no,
        description: req.body.description,
        course_id: req.body.course_id
    };
    let chapter;
    try {
        chapter = await Chapter.create(chapterInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(chapter);
};
const chapterUpdateOne = async (req, res) => {
    const chapterId = req.params.id;
    let chapter;
    try {
        chapter = await Chapter.findOne({
            where: {
                id: chapterId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!chapter) {
        res.status(404).json({
            'message': 'CHAPTER NOT FOUND!'
        });
        return;
    }
    chapter.chapter_no = req.body.chapter_no;
    chapter.description = req.body.description;
    chapter.course_id = req.body.course_id;
    try {
        await chapter.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(chapter);
};
const chapterDeleteOne = async (req, res) => {
    const chapterId = req.params.id;
    let chapter;
    try {
        chapter = await Chapter.findOne({
            where: {
                id: chapterId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!chapter) {
        res.status(404).json({
            'message': 'CHAPTER NOT FOUND!'
        });
        return;
    }
    try {
        chapter.destroy();
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
//           Part             //
//     (API Controllers)      //
//                            //
////////////////////////////////

const chapterpartsList = async (req, res) => {
    const chapterId = req.params.id;
    let partList;
    try {
        partList = await Part.findAll({
            where: {
                chapter_id: chapterId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!partList.length)
        res.status(404).json({
            'message': 'NO PART FOUND!'
        });
    else
        res.status(200).json(partList);
};
const partReadOne = async (req, res) => {
    const partId = req.params.id;
    let part;
    try {
        part = await Part.findOne({
            where: {
                id: partId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!part)
        res.status(404).json({
            'message': 'PART NOT FOUND!'
        });
    else
        res.status(200).json(part);
};
const partCreateOne = async (req, res) => {
    const partInstance = {
        part_no: req.body.part_no,
        description: req.body.description,
        chapter_id: req.body.chapter_id
    };
    let part;
    try {
        part = await Part.create(partInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(part);
};
const partUpdateOne = async (req, res) => {
    const partId = req.params.id;
    let part;
    try {
        part = await Part.findOne({
            where: {
                id: partId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!part) {
        res.status(404).json({
            'message': 'PART NOT FOUND!'
        });
        return;
    }
    part.part_no = req.body.part_no;
    part.description = req.body.description;
    part.chapter_id = req.body.chapter_id;
    try {
        await part.save()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(part);
    return;
};
const partDeleteOne = async (req, res) => {
    const partId = req.params.id;
    let part;
    try {
        part = await Part.findOne({
            where: {
                id: partId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!part) {
        res.status(404).json({
            'message': 'PART NOT FOUND!'
        });
        return;
    }
    try {
        part.destroy();
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
//       Material Type        //
//     (API Controllers)      //
//                            //
////////////////////////////////

const materialTypesList = async (req, res) => {
    let materialTypeList;
    try {
        materialTypeList = await MaterialType.findAll();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!materialTypeList.length)
        res.status(404).json({
            'message': 'NO MATERIAL_TYPE FOUND!'
        });
    else
        res.status(200).json(materialTypeList);
};
const materialTypeReadOne = async (req, res) => {
    const materialTypeId = req.params.id;
    let materialType;
    try {
        materialType = await MaterialType.findOne({
            where: {
                id: materialTypeId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!materialType)
        res.status(404).json({
            'message': 'MATERIAL_TYPE NOT FOUND!'
        });
    else
        res.status(200).json(materialType);
};
const materialTypeCreateOne = async (req, res) => {
    const materialTypeInstance = {
        type_name: req.body.type_name
    };
    let materialType;
    try {
        materialType = await MaterialType.create(materialTypeInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(materialType);
};
const materialTypeDeleteOne = async (req, res) => {
    const materialTypeId = req.params.id;
    let materialType;
    try {
        materialType = await MaterialType.findOne({
            where: {
                id: materialTypeId
            }
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!materialType) {
        res.status(404).json({
            'message': 'MATERIAL_TYPE NOT FOUND!'
        });
        return;
    }
    try {
        await materialType.destroy()
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
//         Material           //
//     (API Controllers)      //
//                            //
////////////////////////////////

const partmaterialsList = async (req, res) => {
    const partId = req.params.id;
    let materialList;
    try {
        materialList = await Material.findAll({
            where: {
                part_id: partId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!materialList.length)
        res.status(404).json({
            'message': 'NO MATERIAL FOUND!'
        });
    else
        res.status(200).json(materialList);
};
const materialReadOne = async (req, res) => {
    const materialId = req.params.id;
    let material;
    try {
        material = await Material.findOne({
            where: {
                id: materialId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!material)
        res.status(404).json({
            'message': 'MATERIAL NOT FOUND!'
        });
    else
        res.status(200).json({
            'message': 'NO MATERIAL FOUND!'
        });
};
const materialCreateOne = async (req, res) => {
    const materialInstance = {
        material_no: req.body.material_no,
        material_link: req.body.material_link,
        mandatory: req.body.mandatory,
        max_point: req.body.max_point,
        material_type_id: req.body.material_type_id,
        part_id: req.body.part_id
    };
    let material;
    try {
        material = await Material.create(materialInstance);
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(201).json(material);
};
const materialUpdateOne = async (req, res) => {
    const materialId = req.params.id;
    let material;
    try {
        material = await Material.findOne({
            where: {
                id: materialId
            }
        });
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!material) {
        res.status(404).json({
            'message': 'MATERIAL NOT FOUND!'
        });
        return;
    }

    material.material_no = req.body.material_no;
    material.material_link = req.body.material_link;
    material.mandatory = req.body.mandatory;
    material.max_point = req.body.max_point;
    material.material_type_id = req.body.material_type_id;
    material.part_id = req.body.part_id;
    try {
        await material.save();
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(200).json(material);
};
const materialDeleteOne = async (req, res) => {
    const materialId = req.params.id;
    let material;
    try {
        material = await Material.findOne({
            where: {
                id: materialId
            }
        })
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    if (!material) {
        res.status(404).json({
            'message': 'MATERIAL NOT FOUND!'
        });
        return;
    }
    try {
        await material.destroy()
    } catch (err) {
        res.status(500).json({
            'message': 'INTERNAL SERVER ERROR!'
        });
        return;
    }
    res.status(204).json({});
};

module.exports = {
    courseChaptersList,
    chapterReadOne,
    chapterCreateOne,
    chapterUpdateOne,
    chapterDeleteOne,
    chapterpartsList,
    partReadOne,
    partCreateOne,
    partUpdateOne,
    partDeleteOne,
    materialTypesList,
    materialTypeReadOne,
    materialTypeCreateOne,
    materialTypeDeleteOne,
    partmaterialsList,
    materialReadOne,
    materialCreateOne,
    materialUpdateOne,
    materialDeleteOne,
    lecturerOnCourseList,
    courseOnCourseList,
    onCourseCreateOne,
    onCourseDeleteOne,
    institutionCourseCreatedByList,
    courseCourseCreatedByList,
    courseCreatedByCreateOne,
    courseCreatedByDeleteOne,
    coursesList,
    courseReadOne,
    courseCreateOne,
    courseUpdateOne,
    courseDeleteOne
}