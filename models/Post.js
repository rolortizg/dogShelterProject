const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        childPath: "posts"
    },
    photoURL:{
        type: String,
        required:true
    }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model('Post', postSchema);