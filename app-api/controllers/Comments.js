const {
    Comment,
    Student
} = require('../models/db')

const handleError = (err) => {
    console.log(err);
};
const commentList = (req, res) => {
    const {
        id
    } = req.params;
    Comment.findAll({
        where: {
            comment_on: id
        },
        include: [{
            model: Comment
        }, {
            model: Student,
            attributes: ['id', 'first_name', 'last_name', 'email']
        }]
    }).then((comments) => {
        if (comments.length) {
            res.status(200).json(comments);
            console.log('ljbaoijoasfd');
        } else
            res.status(404).json({
                'message': 'NO COMMENTS FOUND!'
            });
    }).catch(handleError);
};
const commentReplyList = (req, res) => {
    const {
        id
    } = req.params;
    Comment.findAll({
        where: {
            reply_to: id
        },
        include: [{
            model: Student,
            attributes: ['id', 'first_name', 'last_name', 'email']
        }, {
            model: Comment
        }]
    }).then((comments) => {
        if (comments.length)
            res.status(200).json(comments);
        else
            res.status(404).json({
                'message': 'NO COMMENT FOUND!'
            });
    }).catch(handleError);
};
const commentReadOne = (req, res) => {
    const {
        id
    } = req.params;
    Comment.findAll({
        where: {
            id
        },
        include: [{
            model: Student,
            attributes: ['id', 'first_name', 'last_name', 'email']
        }, {
            model: Comment
        }]
    }).then((comment) => {
        if (comment)
            res.status(200).json(comment);
        else
            res.status(404).json({
                'message': 'COMMENT NOT FOUND!'
            });
    }).catch(handleError);

};
const commentCreateOne = (req, res) => {
    const commentInstance = {
        text,
        reply_to,
        student_id
    } = req.body;
    Comment.create(commentInstance, {
            include: [Comment, Student]
        }).then(newComment => res.status(201).json(newComment))
        .catch(handleError);
};
const commentDeleteOne = (req, res) => {
    const {
        id
    } = req.params;
    Comment.findOne({
        where: {
            id
        }
    }).then((comment) => {
        if (comment) {
            comment.destroy().then(() => {
                res.status(204).json({});
            }).catch(handleError);
        } else
            res.status(404).json({
                'message': 'COMMENT NOT FOUND!'
            });
    }).catch(handleError);
};

module.exports = {
    commentList,
    commentReplyList,
    commentReadOne,
    commentCreateOne,
    commentDeleteOne
}