const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    username: String,
    email: String,
    photoURL: {
        type: String,
        default: "https://image.flaticon.com/icons/png/512/10/10581.png"
    },
    active:{
        type: Boolean,
        enum:['Inactivo','Active'],
        default: 'Inactivo'
    }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', userSchema);



