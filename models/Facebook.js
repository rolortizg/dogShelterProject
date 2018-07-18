const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fbSchema = new Schema({
      name:String,
      username:String,
      password:String,
      email:String,
      active:{
        type:Boolean,
        default:false
      }
},{
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    
})

module.exports = mongoose.model('Facebook', fbSchema);