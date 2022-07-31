const {
    Student
} = require('../models/db');
const passport = require('passport');

const login = async (req, res) => {
    passport.authenticate('local',(err,user,info) => {
        let token;
        if(err){
            res.status(404).json(err);
        }else if(user){
            token = user.generateJWT();
            res.status(200).json({token});
        }else{
            res.status(401).json(info);
        }
    })(req,res);
}

module.exports = {
    login
}