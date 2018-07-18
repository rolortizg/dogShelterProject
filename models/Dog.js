const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
    photoURL: {
        type: String,
        required: true
    },

    raza: { 
        type: String,
        default: 'criollo'
    },

    talla: {
        type: String,
        default: 'none'
    },

    color: String,

    Shelter:{
        type: Schema.Types.ObjectId,
        ref: "Shelter"
    },

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

module.exports = mongoose.model('Dog', dogSchema);