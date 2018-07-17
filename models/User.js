const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    Shelter:[{
        type: Schema.Types.ObjectId,
        ref: "Shelter"
    }],
    email: {
        type:String,
        required:true
    },
    photoURL: {
        type: String,
        default: "https://image.flaticon.com/icons/png/512/10/10581.png"
    },
    active:{
        type: Boolean,
        // enum:['Inactivo','Active'],
        default: false
    },

    // role:{
    //     type:String,
    //     enum:['User','Houser','Admin'],
    //     default:"Dogger"
    // }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', userSchema);



