var bookController = function(Book, bookDataInit){
	
	var initializeBooksCollection = function(req, res) {
		var booksArr = bookDataInit.storeInitialBooks;
		
		for(var i = 0; i < booksArr.length; i++){
			booksArr[i].save();
		}
		
		res.redirect('/books/');
	};
	
	var getAll = function(req, res){
		var query = {};
		if(req.query.genre){
			query.genre = req.query.genre;
		}
		if(req.query.author){
			query.author = req.query.author;
		}
		
		Book.find(query, function(err, books){
			var successStatusCode = 200; // OK
			showResponse(successStatusCode, books, res, err);
		});
	};
	
	var getById = function(req, res) {
		Book.findById(req.params.id, function(err, result){
			var successStatusCode = 200; // OK
			showResponse(successStatusCode, result, res, err);
		});
	};
	
	var postNewBook = function(req, res){
		var book = new Book({
			title:req.body.title,
			author:req.body.author,
			genre:req.body.genre
		});
		
		book.save(function(err, bookSaved){
			var successStatusCode = 201; //Created;
			showResponse(successStatusCode, bookSaved, res, err);
		});
	};
	
	var putBook = function (req, res){
		Book.findById(req.params.id, function(err, book){
			book.title = req.body.title;
			book.author = req.body.author;
			book.genre = req.body.genre;
			book.read = req.body.read;
			
			book.save();
			res.json(book);
				
		});
	}
	
	var showResponse = function(successStatusCode, dataToSend, res, err) {
		if(!err){
			res.status(successStatusCode).json(dataToSend);
		}else{
			res.status(500).json(err);
		}
	}
	
	return{
		initializeBooksCollection:initializeBooksCollection,
		getAll:getAll,
		getById: getById,
		putBook:putBook,
		postNewBook:postNewBook
	};
}

module.exports = bookController;