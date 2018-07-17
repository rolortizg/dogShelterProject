const express = require('express');
const Shelter = require('../models/Shelter')
const Dog = require('../models/Dog')
const router = express.Router();
const User = require('../models/User')

const uploadCloud = require('../helpers/cloudinary');

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  return res.redirect('/login?next=/profile')
}

//Registrar el shelter

router.get('/registerShelter',isLoggedIn,(req,res)=>{
  res.render('Shelter/RegisterShelter')

})

//Registrar tu Shelter de usuario.

router.post('/registerShelter', isLoggedIn , uploadCloud.single('photo'), (req,res)=>{
  req.body.photo = req.file.url
  req.body.user = req.user._id

  Shelter.create(req.body)
  .then(refugio=>{
    console.log(refugio)
    res.redirect('/profile')
  })
  .catch(e=>console.log(e))
})

//Mostrar los refugios disponibles

router.get('/shelterList', (req,res)=>{
  Shelter.find()
  .then(shelt=>{
    console.log(shelt)
    res.render('Shelter/shelterList', shelt)
  })
  .catch(e=>console.log(e));
})

/* Mandar un mensaje al refugio del user al refugio */

router.get('/shelterList/:id', (req,res,next)=>{
  Shelter.findById(req.params.id)
  .then(shelter=>{
    res.render('Shelter/sheltairDetail', shelter)
  })
  .catch(e=>console.log(e))
})


/* 
router.get('/shelterList/:id', (req,res,next)=>{
  Dog.find({raza: {$regex: req.body.raza, $options:"i"}, color: {$regex: req.body.color, $option: "i"}, talla: {$regex: req.body.talla, $option: "i"}})
  .then(dog=>{

  })
})
 */


module.exports = router;