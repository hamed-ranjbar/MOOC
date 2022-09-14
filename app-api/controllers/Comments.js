const {
    Comment
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
        include: [Comment]
    }).then((comments) => {
        if (comments.length)
            res.status(200).json(comments);
        else
            res.status(404).json({
                'message': 'NO COMMENTS FOUND!'
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
        }
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
        subject,
        text,
        reply_to,
        student_id
    } = req.body;
    Object.values(commentInstance).every(value => {
        if (value === null)
            return res.status(503).json({
                'message': 'INVALID REQUEST!'
            });
    });
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
    commentReadOne,
    commentCreateOne,
    commentDeleteOne
}