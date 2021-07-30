const express = require('express')
const router = express.Router()
const {db, Entries, Expenses} = require('../models')

const reducer = (curr, acc) => curr - acc
router.post('/api',  (req, res) => {
   const {concept, mount, type, category} = req.body 
   if(type === 'ingreso'){
       Entries.create({
           concept: concept,
           amount: mount,
           type: type,
           category: category
       })
   }else{
       Expenses.create({
        concept: concept,
        amount: mount,
        type: type,
        category: category
    })
   }
})
router.get('/api', (req, res) => {
   Promise.all([Entries.sum('amount'), Expenses.sum('amount')])
   .then(values => {
       values = values.map(val => {
          if(!val) {
            return  val = 0
            }
            else return val
        }).reduce(reducer)
       res.json(values)
    })
   .catch(error => console.log(error))
   
})
module.exports = router