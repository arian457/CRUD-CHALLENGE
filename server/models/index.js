const {Sequelize, DataTypes} = require('sequelize');


const db = new Sequelize('postgres://postgres:santiari601@localhost:3002/abm-db', {
  logging: false,
});
db.authenticate().then((res) => console.log("todo joya")).catch((error) => console.log(error))


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