const {
    Sequelize,
    Model,
    DataTypes,
    STRING,
    UUIDV4,
    UUID
} = require('sequelize');

// Syncs DataBase Tables
const syncDataBase = async () => {
    await sequelize.sync({
        alter: true
        // force:true
    });
};

// Creating a DB instance
const sequelize = new Sequelize(process.env.DBURI, {
    logging: false
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
    name: DataTypes.STRING
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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            len: [8, 100]
        }
    }
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
// On_Program Model Attributes
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
// Program_created_by Model Attributes
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
// On_Course Model Attributes
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
// Course_created_by Model Attributes
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
    description: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'chapter'
});
// Part Model Attributes
Part.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    part_no: DataTypes.INTEGER,
    description: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'part'
});
// Material_Type Attributes
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
});
// Material Model Attributes
Material.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    material_no: DataTypes.INTEGER,
    material_link: DataTypes.STRING,
    mandatory: DataTypes.BOOLEAN,
    max_point: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'material'
});
// Student_Results Model Attributes
StudentResults.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: 'student_result'
});
// Enrolled_Course Model Attributes
EnrolledCourse.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: 'enrolled_course'
});
// Course_Session Model Attributes
CourseSession.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
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
    }
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
    }
}, {
    sequelize,
    modelName: 'status'
});
// Enrolled_Program Model Attributes
EnrolledProgram.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: 'enrolled_program'
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
StudentResults.belongsTo(Material,{foreignKey:{name:'material_id',type:DataTypes.UUID,allowNull:false}});
Material.hasMany(StudentResults,{foreignKey:{name:'material_id',type:DataTypes.UUID,allowNull:false}});
StudentResults.belongsTo(EnrolledCourse,{foreignKey:{name:'enrolled_course_id',type:DataTypes.UUID,allowNull:false}});
EnrolledCourse.hasMany(StudentResults,{foreignKey:{name:'enrolled_course_id',type:DataTypes.UUID,allowNull:false}});

// Enrolled Course Relations
EnrolledCourse.belongsTo(CourseSession,{foreignKey:{name:'course-session_id',type:DataTypes.UUID,allowNull:false}});
CourseSession.hasMany(EnrolledCourse,{foreignKey:{name:'course-session_id',type:DataTypes.UUID,allowNull:false}});
EnrolledCourse.belongsTo(Status,{foreignKey:{name:'status_id',type:DataTypes.UUID,allowNull:false}});
Status.hasMany(EnrolledCourse,{foreignKey:{name:'status_id',type:DataTypes.UUID,allowNull:false}});
EnrolledCourse.belongsTo(Student,{foreignKey:{name:'student_id',type:DataTypes.UUID,allowNull:false}});
Student.hasMany(EnrolledCourse,{foreignKey:{name:'student_id',type:DataTypes.UUID,allowNull:false}});

// Course Session Relations
CourseSession.belongsTo(Course,{foreignKey:{name:'course_id',type:DataTypes.UUID,allowNull:false}});
Course.hasMany(CourseSession,{foreignKey:{name:'course_id',type:DataTypes.UUID,allowNull:false}});
CourseSession.belongsTo(ProgramSession,{foreignKey:{name:'program_session_id',type:DataTypes.UUID,allowNull:false}});
ProgramSession.hasMany(CourseSession,{foreignKey:{name:'program_session_id',type:DataTypes.UUID,allowNull:false}});

// Program Session Relations
ProgramSession.belongsTo(Program,{foreignKey:{name:'program_id',type:DataTypes.UUID,allowNull:false}});
Program.hasMany(ProgramSession,{foreignKey:{name:'program_id',type:DataTypes.UUID,allowNull:false}});

// Enrolled Program Relations
EnrolledProgram.belongsTo(ProgramSession,{foreignKey:{name:'program_session_id',type:DataTypes.UUID,allowNull:false}});
ProgramSession.hasMany(EnrolledProgram,{foreignKey:{name:'program_session_id',type:DataTypes.UUID,allowNull:false}});
EnrolledProgram.belongsTo(Status,{foreignKey:{name:'status_id',type:DataTypes.UUID,allowNull:false}});
Status.hasMany(EnrolledProgram,{foreignKey:{name:'status_id',type:DataTypes.UUID,allowNull:false}});
EnrolledProgram.belongsTo(Student,{foreignKey:{name:'student_id',type:DataTypes.UUID,allowNull:false}});
Student.hasMany(EnrolledProgram,{foreignKey:{name:'student_id',type:DataTypes.UUID,allowNull:false}});

syncDataBase();

module.exports = {
    sequelize,
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
    EnrolledProgram
}