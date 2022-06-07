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
class Institution extends Model {};
class Lecturer extends Model {
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
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
    active: DataTypes.BOOLEAN
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

// Creating Relations (Foreign Key)
Institution.hasMany(Lecturer, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID
    }
});
Lecturer.belongsTo(Institution, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID
    }
})

Program.hasMany(On_Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID
    }
});
On_Program.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID
    }
});
Lecturer.hasMany(On_Program, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID
    }
});
On_Program.belongsTo(Lecturer, {
    foreignKey: {
        name: 'lecturer_id',
        type: DataTypes.UUID
    }
});

Program.hasMany(Program_created_by, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID
    }
});
Program_created_by.belongsTo(Program, {
    foreignKey: {
        name: 'program_id',
        type: DataTypes.UUID
    }
});
Institution.hasMany(Program_created_by, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID
    }
});
Program_created_by.belongsTo(Institution, {
    foreignKey: {
        name: 'institution_id',
        type: DataTypes.UUID
    }
});

syncDataBase();

module.exports = {
    sequelize,
    Institution,
    Lecturer,
    Student,
    Program,
    On_Program,
    Program_created_by
}