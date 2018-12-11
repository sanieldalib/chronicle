const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	images: [
		{
			type: String
		}
	],
	date: {
		type: Date,
		default: Date.now
	},
	location: {
		type: Object,
		default: {}
	},
	ownerName: {
		type: String,
		required: true
	},
	shared: [
		{
			type: String
		}
	]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
