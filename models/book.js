var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title:String,
	author:String,
	genre:String,
	read:{type:Boolean, default:false}
});

module.exports = mongoose.model('Book', bookSchema);