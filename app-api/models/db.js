const {
    Sequelize,
    Model,
    DataTypes,
} = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Syncs DataBase Tables
const syncDataBase = async () => {
    await sequelize.sync({
        alter: true
        // force:true
    });
};

// Creating a DB instance
const sequelize = new Sequelize(process.env.DBURI, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
});
// Connecting instance to DataBase
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

////////////////////////////////
//                            //
//       Model Classes        //
//                            //
////////////////////////////////

class Institution extends Model {};
class Lecturer extends Model {
    getFullName() {
        return [this.title, this.firstName, this.lastName].join(' ')
    }
};
class Student extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
    }
    setHash(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
    validPassword(password) {
        return this.hash == crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
    generateJWT() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        return jwt.sign({
            id: this.id,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            exp: parseInt(expiry.getTime() / 1000, 10)
        }, process.env.SECRET)
    }
};
class Program extends Model {};
class On_Program extends Model {};
class Program_created_by extends Model {};
class Course extends Model {};
class On_Course extends Model {};
class Course_created_by extends Model {};
class Chapter extends Model {};
class Part extends Model {};
class Material extends Model {};
class MaterialType extends Model {};
class StudentResults extends Model {};
class EnrolledCourse extends Model {};
class CourseSession extends Model {};
class ProgramSession extends Model {};
class Status extends Model {};
class EnrolledProgram extends Model {};
class StudentFavoriteCourse extends Model {};
class StudentFavoriteProgram extends Model {};
class Quiz extends Model {};
class Question extends Model {};
class Comment extends Model {};

////////////////////////////////
//                            //
//      Model Attributes      //
//                            //
////////////////////////////////

// Institution Model Attributes
Institution.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'institution' // We need to choose the model name
});
// Lecturer Model Attributes
Lecturer.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    title: DataTypes.STRING
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'lecturer' // We need to choose the model name
});
// Student Model Attributes
Student.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'student' // We need to choose the model name
});
// Program Model Attributes
Program.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'program'
});
// On Program Model Attributes
On_Program.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
}, {
    sequelize,
    modelName: 'on_program'
});
// Program created by Model Attributes
Program_created_by.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
}, {
    sequelize,
    modelName: 'program_created_by'
});
// Course Model Attributes
Course.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    commitment: DataTypes.STRING,
    description: DataTypes.TEXT,
    min_grade: DataTypes.FLOAT,
    course_price: DataTypes.INTEGER,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'course'
});
// On Course Model Attributes
On_Course.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: 'on_course'
});
// Course created by Model Attributes
Course_created_by.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: 'course_created_by'
});
// Chapter Model Attributes
Chapter.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    chapter_no: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'chapter'
});
// Part Model Attributes
Part.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    part_no: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'part'
});
// Material Type Attributes
MaterialType.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    type_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'material_type'
});
// Material Model Attributes
Material.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    material_no: DataTypes.INTEGER,
    material_content: DataTypes.TEXT,
    mandatory: DataTypes.BOOLEAN,
    max_point: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'material'
});
// Student Results Model Attributes
StudentResults.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    attempt: DataTypes.INTEGER,
    attempt_link: DataTypes.STRING,
    started: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ended: DataTypes.DATE,
    score: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'student_result'
});
// Enrolled Course Model Attributes
EnrolledCourse.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    enrollement_date: DataTypes.DATE,
    status_date: DataTypes.DATE,
    final_grade: DataTypes.INTEGER,
    certificate_id: DataTypes.STRING
}, {
    sequelize,
    modelName: 'enrolled_course'
});
// Course Session Model Attributes
CourseSession.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
}, {
    sequelize,
    modelName: 'course_session'
});
// Program_Session Model Attributes
ProgramSession.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
}, {
    sequelize,
    modelName: 'program_session'
});
// Status Model Attributes
Status.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    status_name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'status'
});
// Enrolled Program Model Attributes
EnrolledProgram.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    enrollement_date: DataTypes.DATE,
    status_date: DataTypes.DATE,
    final_grade: DataTypes.INTEGER,
    certificate_id: DataTypes.STRING
}, {
    sequelize,
    modelName: 'enrolled_program'
});
// 
StudentFavoriteCourse.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'user_favorite_course'
});

StudentFavoriteProgram.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'user_favorite_program'
});
Question.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    statement: DataTypes.TEXT,
    options: {
        type: DataTypes.TEXT,
        async get() {
            let result = await this.getDataValue('options').split(',');
            return result;
        },
        set(input) {
            let newOptions = input.join(',');
            this.setDataValue('options', newOptions);
        }
    },
    answer: {
        type: DataTypes.TEXT,
        async get() {
            let result = await this.getDataValue('answer').split(',');
            return result;
        },
        set(input) {
            let newOptions = input.join(',');
            this.setDataValue('answer', newOptions);
        }
    }
}, {
    sequelize,
    modelName: 'question'
});
Comment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    subject: DataTypes.STRING,
    text: DataTypes.STRING,
    reply_to: DataTypes.UUID,
    student_id: DataTypes.STRING,
    comment_on: DataTypes.UUID
}, {
    sequelize,
    modelName: 'comment'
});

////////////////////////////////
//                            //
//      Model Relations       //
//       (Foreign Key)        //
//                            //
////////////////////////////////

// Lecturer Relations 
Institution.hasMany(Lecturer, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Lecturer.belongsTo(Institution, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
})

// On_Program Relations 
Program.hasMany(On_Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
On_Program.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Lecturer.hasMany(On_Program, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
On_Program.belongsTo(Lecturer, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Program_created_by Relations 
Program.hasMany(Program_created_by, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Program_created_by.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Institution.hasMany(Program_created_by, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Program_created_by.belongsTo(Institution, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Course Relations 
Program.hasMany(Course, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// On_Course Relations 
Course.hasMany(On_Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
On_Course.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Lecturer.hasMany(On_Course, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
On_Course.belongsTo(Lecturer, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Course_created_by Relations 
Course.hasMany(Course_created_by, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course_created_by.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Institution.hasMany(Course_created_by, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course_created_by.belongsTo(Institution, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Chapter Relations 
Course.hasMany(Chapter, {
    foreignKey: {
        type: DataTypes.UUID,
        name: 'course_id',
        allowNull: false
    }
});
Chapter.belongsTo(Course, {
    foreignKey: {
        type: DataTypes.UUID,
        name: 'course_id',
        allowNull: false
    }
});

// Part Relations
Chapter.hasMany(Part, {
    foreignKey: {
        name: 'chapter_id',
        allowNull: false,
        type: DataTypes.UUID
    }
});
Part.belongsTo(Chapter, {
    foreignKey: {
        name: 'chapter_id',
        allowNull: false,
        type: DataTypes.UUID
    }
})

// Material_type Relations
MaterialType.hasMany(Material, {
    foreignKey: {
        name: 'material_type_id',
        allowNull: false,
        type: DataTypes.UUID
    }
});
Material.belongsTo(MaterialType, {
    foreignKey: {
        name: 'material_type_id',
        allowNull: false,
        type: DataTypes.UUID
    }
});

// Material Relations
Part.hasMany(Material, {
    foreignKey: {
        name: 'part_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Material.belongsTo(Part, {
    foreignKey: {
        name: 'part_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Student Results Relations
StudentResults.belongsTo(Material, {
    foreignKey: {
        name: 'material_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Material.hasMany(StudentResults, {
    foreignKey: {
        name: 'material_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
StudentResults.belongsTo(EnrolledCourse, {
    foreignKey: {
        name: 'enrolled_course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
EnrolledCourse.hasMany(StudentResults, {
    foreignKey: {
        name: 'enrolled_course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Enrolled Course Relations
EnrolledCourse.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course.hasMany(EnrolledCourse, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
EnrolledCourse.belongsTo(CourseSession, {
    foreignKey: {
        name: 'course_session_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});
CourseSession.hasMany(EnrolledCourse, {
    foreignKey: {
        name: 'course_session_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});
EnrolledCourse.belongsTo(Status, {
    foreignKey: {
        name: 'status_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});
Status.hasMany(EnrolledCourse, {
    foreignKey: {
        name: 'status_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});
EnrolledCourse.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Student.hasMany(EnrolledCourse, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Course Session Relations
CourseSession.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course.hasMany(CourseSession, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
CourseSession.belongsTo(ProgramSession, {
    foreignKey: {
        name: 'program_session_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});
ProgramSession.hasMany(CourseSession, {
    foreignKey: {
        name: 'program_session_id',
        type: DataTypes.UUID,
        allowNull: true
    }
});

// Program Session Relations
ProgramSession.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Program.hasMany(ProgramSession, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Enrolled Program Relations
EnrolledProgram.belongsTo(ProgramSession, {
    foreignKey: {
        name: 'program_session_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
ProgramSession.hasMany(EnrolledProgram, {
    foreignKey: {
        name: 'program_session_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
EnrolledProgram.belongsTo(Status, {
    foreignKey: {
        name: 'status_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Status.hasMany(EnrolledProgram, {
    foreignKey: {
        name: 'status_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
EnrolledProgram.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Student.hasMany(EnrolledProgram, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Favorite Course Relations
StudentFavoriteCourse.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Course.hasMany(StudentFavoriteCourse, {
    foreignKey: {
        name: 'course_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
StudentFavoriteCourse.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});
Student.hasMany(StudentFavoriteCourse, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false
    }
});

// Favorite Program Relations
StudentFavoriteProgram.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false,
    }
});
Program.hasMany(StudentFavoriteProgram, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID,
        allowNull: false,
    }
});
StudentFavoriteProgram.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false,
    }
})
Student.hasMany(StudentFavoriteProgram, {
    foreignKey: {
        name: 'student_id',
        type: DataTypes.UUID,
        allowNull: false,
    }
});

// Quiz Relations
Question.hasMany(Material, {
    foreignKey: {
        name: 'material_id',
        type: DataTypes.UUID,
    }
});

syncDataBase();

module.exports = {
    Institution,
    Lecturer,
    Student,
    Program,
    On_Program,
    Program_created_by,
    Course,
    On_Course,
    Course_created_by,
    Chapter,
    Part,
    MaterialType,
    Material,
    StudentResults,
    EnrolledCourse,
    CourseSession,
    ProgramSession,
    Status,
    EnrolledProgram,
    StudentFavoriteCourse,
    StudentFavoriteProgram,
    Comment
}