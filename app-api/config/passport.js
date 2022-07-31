const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Student} = require('../models/db');

passport.use(new LocalStrategy({usernameField:'email'},(username,password,done) => {
    Student.findOne({where:{email:username}}).then((foundStudent) => {
        if(!foundStudent)
            return done(null,false,{message:'USER NOT FOUND!'});
        if(!foundStudent.validPassword(password))
            return done(null,false,{message:'INCORRECT PASSWORD'});
        return done(null,foundStudent);
    }).catch(err => {done(err)});
}))