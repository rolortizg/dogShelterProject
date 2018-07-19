const express = require('express');
const router  = express.Router();
const multer = require('multer');
const Dog = require('../models/Dog')
const Shelter = require('../models/Shelter')
const app = express();


const uploadCloud = require('../helpers/cloudinary');
const uploads = multer({dest: './public/assets'})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
  }

//Editar Perro, Eliminar o editar.

router.get('/edit/:id', (req,res)=>{
    Dog.findById(req.params.id)
    .then(dog=>{
        res.render('Dog/dogEdit', dog)
    })
    .catch(console.log(e));
})

/* Registrar perrito*/
router.get('/shelterList/:id/registerDog', isLoggedIn, (req, res, next) => {
    Shelter.findById(req.params.id)
        .then(shelter=>{
            res.render('Dog/registerDog', shelter);
        })
  
});

router.post('/shelterList/:id/registerDog', isLoggedIn ,uploadCloud.single('foto') ,(req,res,next)=>{
    req.body.photoURL = req.file.url;
    //req.user = req.shelter._id; Esto no se usa, mejor se tiene que traer de la ruta anterior

    req.body.shelter = req.params.id
    
    Dog.create(req.body)
    .then(dog =>{
        console.log(dog)
        res.redirect('/shelterList/' + req.params.id + '/shelterDogs')
    })
    .catch(e=>console.log(e))
})


//ERRORES NO TOCAR, SE APRENDE DE ELLOS.
/* router.get('/shelterList/:id/shelterDogs', isLoggedIn, (req,res)=>{
    
    Dog.find()
    .then(dogs=>{
        console.log(dogs)
        res.render('Shelter/shelterDogs', {dogs})
    })
    .catch(e=>console.log(e))
}) */

/* router.get('/dogList', (req,res)=>{

    Dog.find()
    .then(dog=>{
        doggy.dog = dog
        console.log(doggy)
        res.render('Dog/dogList', {dogy})
    })
    .catch(e=>console.log(e))
}) */






module.exports = router;
