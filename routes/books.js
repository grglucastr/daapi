var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/book');

var router = function(){
	var bookDataInit = require('../models/bookDataInitializer')(Book);
	var bookController = require('../controllers/bookController')(Book, bookDataInit);
	
	bookRouter.get('/init', bookController.initializeBooksCollection);
	
	bookRouter.route('/')
		.get(bookController.getAll)
		.post(bookController.postNewBook);
	
	bookRouter.route('/:id')
		.all(bookController.searchById)
		.get(bookController.getById)
		.put(bookController.putBook)
		.patch(bookController.patchBook)
		.delete(bookController.deleteBook);
	
	return bookRouter; 
}

module.exports = router;
