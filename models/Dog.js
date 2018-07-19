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

    shelter:{
        type: Schema.Types.ObjectId,
        ref: "Shelter"
    },
    
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
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