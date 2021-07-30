const {Sequelize, DataTypes} = require('sequelize');
const { set } = require('..');

const db = new Sequelize('postgres://postgres:santiari601@localhost:3002/abm-db', {
  logging: false,
});
db.authenticate().then((res) => console.log("todo joya")).catch((error) => console.log(error))


const Entries = db.define('ingresos',{
     concept:{
         type: DataTypes.STRING,
         allowNull:false
     },
     amount: {
         type: DataTypes.INTEGER,
         allowNull: false,
      
     },
     type: {
         type: DataTypes.ENUM('ingreso', 'egreso')
     },
     category: {
         type: DataTypes.STRING,
         allowNull:false
     }

})
const Expenses = db.define('egresos',{
    concept:{
        type: DataTypes.STRING,
        allowNull:false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
     
    },
    type: {
        type: DataTypes.ENUM('ingreso', 'egreso')
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false
    },
  
})


module.exports = {
    db,
    Entries,
    Expenses

}