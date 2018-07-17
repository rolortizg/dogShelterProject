const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
	name: String,
	photo: String,
	email: String,
	dogs:[{
		type: Schema.Types.ObjectId,
		ref: "Dog"
	}],
	location:{
			type:{
					type:String,
					default:'Point'
			},
			address:String,
			coordinates:[{
					type:Number
			}]

	}
		
		},{
		timestamps:{
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
})



module.exports = mongoose.model('Shelter', shelterSchema);