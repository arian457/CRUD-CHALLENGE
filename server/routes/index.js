const express = require('express')
const router = express.Router()
const {db, Operations} = require('../models')

router.post('/create/post',  (req, res) => {
   let {concept, amount, type, category} = req.body 
   if(type === 'egreso') amount = amount * (-1);
       Operations.create({
           concept,
           amount,
           type,
           category

}) })

router.put('/update/post', async(req, res) => {
    
      const {id, amount, concept, category} = req.body
      console.log(amount + concept)
      await Operations.update({amount:amount, concept:concept,category:category }, {
          where:{
              id: id
          }
      })
  
})
router.delete('/delete/post', (req, res) => {
        const {id} = req.body
        Operations.destroy({where:{
            id : id
        }})
        res.send('lito!')

})
router.get('/', (req, res) => {
   Operations.sum('amount')
   .then(value => {
        if(!value) return res.json(0)
        else return res.json(value)
        })
   .catch(error => console.log(error))
   
})
router.get('/all', (req, res) => {
   Operations.findAll({})
    .then(values => res.json(values))
})

module.exports = router