const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();
const {DB_DIALECT, DB_USER, DB_PASSWORD,DB_HOST, DB_NAME} = process.env
const db = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
});
db.authenticate().then((res) => console.log("DB is connected!"))
.catch((error) => console.log(error))


const Operations = db.define('operaciones',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
     concept:{
         type: DataTypes.STRING,
         allowNull:false
     },
     amount: {
         type: DataTypes.INTEGER,
         allowNull: false,
      
     },
     type: {
         type: DataTypes.ENUM('ingreso', 'egreso'),
         allowNull: false,
         primaryKey:true
     },
     category: {
         type: DataTypes.STRING,
         allowNull:false
     },
     date: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },

},{createdAt: false})



module.exports = {
    db,
    Operations
}