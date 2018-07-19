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
    email: {
        type:String,
        required:true
    },
    photoURL: {
        type: String,
        default: "http://www.infraco.co.za/corporate/Picture/missing-profile-photo.png"
    },
    active:{
        type: Boolean,
        // enum:['Inactivo','Active'],
        default: false
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Dog'
        }
    ],

   /*  shelters:[{
        type: Schema.Types.ObjectId,
        ref: "Shelter",
    }] */
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



