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

			var returnBooks = [];
			books.forEach(function(element, index, array){
				var book = element.toJSON();
				book.links = {};
				book.links.self = `http://${req.headers.host}/books/${book._id}`;
				returnBooks.push(book);
			});

			var successStatusCode = 200; // OK
			showResponse(successStatusCode, returnBooks, res, err);
		});
	};
	
	var getById = function(req, res) {
		Book.findById(req.params.id, function(err, result){

			var book = result.toJSON();

			var linkGenre = `http://${req.headers.host}/books?genre=${book.genre}`;
			linkGenre = urlSpaces(linkGenre);

			var linkAuthor = `http://${req.headers.host}/books?author=${book.author}`;
			linkAuthor = urlSpaces(linkAuthor);

			book.links = {};
			book.links.filterByThisGenre = linkGenre;
			book.links.filterByThisAuthor = linkAuthor;

			var successStatusCode = 200; // OK
			showResponse(successStatusCode, book, res, err);
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
			
			book.save(function(err, bookUpdated){
				showResponse(200, bookUpdated, res, err);
			});
		});
	};

	var patchBook = function(req, res){
		Book.findById(req.params.id, function(err, book){
			if(!err){
				if(req.body._id){
					delete req.body._id;
				}

				for(var i in req.body){
					book[i] = req.body[i];
				}

				book.save(function(err, bookUpdated){
					showResponse(200, bookUpdated, res, err);
				});

			}else{
				showResponse(500, book, res, err);
			}
		});
	};
	
	var deleteBook = function(req, res){
		Book.findById({_id:req.params.id}, function(err, book){
			if(!err){
				book.remove(function(errRemove){
					if(!errRemove){
						res.status(204).json('Removed');
					}else{
						res.status(500).json(errRemove);
					}
				});
			}
			showResponse(204, book, res, err);
		});
	};

	var showResponse = function(successStatusCode, dataToSend, res, err) {
		if(!err){
			res.status(successStatusCode).json(dataToSend);
		}else{
			res.status(500).json(err);
		}
	};
	
	var urlSpaces = function(str){
		while(str.indexOf(' ') != -1){
			str = str.replace(' ', '%20');
		}
		return str;
	}

	return{
		initializeBooksCollection:initializeBooksCollection,
		getAll:getAll,
		getById: getById,
		putBook:putBook,
		postNewBook:postNewBook,
		patchBook: patchBook,
		deleteBook:deleteBook
	};
}

module.exports = bookController;
