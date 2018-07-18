const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
	name: String,
	photo: {
		type: String,
		default: "http://cdn.shopify.com/s/files/1/0601/4169/files/Shelter_top_large.jpg?4600740965590412204"
	},
	email: String,

	dogs:[{
		type: Schema.Types.ObjectId,
		ref: "Dog",
		childPath: "Shelter"
		
	}],
	user:{
		type: Schema.Types.ObjectId,
		ref: "User"
	},
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