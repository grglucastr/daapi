var express = require('express');
var bookRouter = express.Router();
var Book = require('../models/book');

var router = function(){
	var bookDataInit = require('../models/bookDataInitializer')(Book);
	var bookController = require('../controllers/bookController')(Book, bookDataInit);
	
	bookRouter.get('/init', bookController.initializeBooksCollection);
	
	bookRouter.get('/', bookController.getAll);
	
	bookRouter.get('/:id', bookController.getById);

	bookRouter.patch('/:id', bookController.patchBook);
		
	bookRouter.post('/', bookController.postNewBook);
	
	bookRouter.put('/:id', bookController.putBook);
	
	return bookRouter; 
}

module.exports = router;
