const mongoose = require('mongoose');
const passport = require('passport')
const Schema = require.Schema;

userSchema = new Schema({
    photoURL: [
    {
        type: String,
        require: true
    }
],
    raza: { 
        type: String,
        default: 'criollo'
    },
    talla: {
        type: String,
        default: 'none'
    },
    color: String,
    señasParticulares:{
        type: String,
        default: "perro"
    },
    nombre: {
        type: String,
        default: "ninguno"
    }
},{
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    
})