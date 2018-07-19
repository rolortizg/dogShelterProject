const express = require('express');
const Shelter = require('../models/Shelter')
const Dog = require('../models/Dog')
const router = express.Router();
const User = require('../models/User')
const hbs = require('hbs');

const uploadCloud = require('../helpers/cloudinary');

/* hbs.registerHelper('ifLogin', function(userl, usere, option){
  if(userl == usere){
    return this
  }
}); */

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  return res.redirect('/login?next=/profile')
}

function isTheOwner(req,res,next){
  if(req.user) return next()
  return res.redirect('/shelterList/:id')
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
    .then(user=>{
        return Shelter.findByIdAndUpdate(req.user._id, {$push:{user: user._id}}, {new:true})
        // .then(r=>{
        //   console.log(r)
        // })
    })
    .then(shelter=>{
        res.redirect('/myShelters')
    })
    .catch(e=>next(e))
})

//Mostrar los refugios disponibles

router.get('/shelterList', (req,res)=>{
  Shelter.find()
  .then(shelt=>{
    //console.log(shelt)
    res.render('Shelter/shelterList', shelt)
  })
  .catch(e=>console.log(e));
})

/* Mandar un mensaje al refugio del user al refugio */

router.get('/shelterList/:id',(req,res,next)=>{

  let ob = {}
  console.log(req.user)
  if(req.user) {
    ob.usuarioLogeado = req.user._id
  } else {
    ob = {}
  }
  Shelter.findById(req.params.id)
  .then(shelter=>{
    let shelterid = shelter.user.id
    console.log(shelterid)
    ob.shelter = shelter
    console.log(ob)
    res.render('Shelter/sheltairDetail', ob)
  })
  .catch(e=>console.log(e))
})

router.get('/shelterList/:id/shelterDogs', (req,res)=>{
  let doggy = {}
    console.log(req.user)
    if(req.user) {
    doggy.usuarioLogeado =  req.user._id
    } else {
    doggy = {}
    }
  Dog.find({shelter: req.params.id}).populate('shelter')
  .then(dogs=>{
   
    doggy.dogs = dogs
    
    res.render('Shelter/shelterDogs', doggy)
  })
})

/* Shelter.findById(req.params.id).populate('Dog')
.then(shelter=>{
    return Dog.findById({shelter: req.shelter.id})
}).then(dog=>{
  res.render('Shelter/shelterDogs', dog)
})
.catch(e=>console.log(e)) */


/* 
router.get('/shelterList/:id', (req,res,next)=>{
  Dog.find({raza: {$regex: req.body.raza, $options:"i"}, color: {$regex: req.body.color, $option: "i"}, talla: {$regex: req.body.talla, $option: "i"}})
  .then(dog=>{

  })
})
 */


module.exports = router;