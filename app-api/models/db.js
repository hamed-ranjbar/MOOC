const {
    Sequelize
} = require("sequelize");

const sequelize = new Sequelize(process.env.DBURI);
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
