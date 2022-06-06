const {
    Sequelize,
    Model,
    DataTypes
} = require('sequelize');

// Syncs DataBase Tables
const syncDataBase = async () => {
    await sequelize.sync({
        alter: true
    });
};

// Creating a DB instance
const sequelize = new Sequelize(process.env.DBURI);
// Connecting instance to DataBase
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Model Classes
class Institution extends Model {}
class Lecturer extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
    }
}
class Student extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
    }
}

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
    title: DataTypes.STRING,
    institution_id: DataTypes.UUID
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
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.STRING
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'student' // We need to choose the model name
});

Institution.cre
syncDataBase();

module.exports = {
    sequelize,
    Institution,
    Lecturer,
    Student
}