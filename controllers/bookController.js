var bookController = function (Book, bookDataInit) {

	var initializeBooksCollection = function (req, res) {
		var booksArr = bookDataInit.storeInitialBooks;

		for (var i = 0; i < booksArr.length; i++) {
			booksArr[i].save();
		}

		res.redirect('/books/');
	};

	var getAll = function (req, res) {
		var query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		if (req.query.author) {
			query.author = req.query.author;
		}

		Book.find(query, function (err, books) {
			var returnBooks = [];
			books.forEach(function (element, index, array) {
				var book = element.toJSON();
				book.links = {};
				book.links.self = `http://${req.headers.host}/books/${book._id}`;
				returnBooks.push(book);
			});

			showResponse(returnBooks, err, res);
		});
	};

	var getById = function (req, res) {
		var book = req.book.toJSON();

		var linkGenre = `http://${req.headers.host}/books?genre=${book.genre}`;
		linkGenre = urlSpaces(linkGenre);

		var linkAuthor = `http://${req.headers.host}/books?author=${book.author}`;
		linkAuthor = urlSpaces(linkAuthor);

		book.links = {};
		book.links.filterByThisGenre = linkGenre;
		book.links.filterByThisAuthor = linkAuthor;

		var err = null;
		showResponse(book, err, res);
	};

	var postNewBook = function (req, res) {
		var newBook = new Book({
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre
		});

		newBook.save(function (err, book) {
			showError(err, res);
			res.status(201).json(book);
		});
	};

	var putBook = function (req, res) {
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.genre = req.body.genre;
		req.book.read = req.body.read;

		req.book.save(function (err, book) {
			showResponse(book, err, res);
		});
	};

	var patchBook = function (req, res) {
		if (req.book._id) {
			delete req.book._id;
		}

		for (var i in req.body) {
			req.book[i] = req.body[i];
		}

		req.book.save(function (err, book) {
			showResponse(book, err, res);
		});
	};

	var deleteBook = function (req, res) {
		req.book.remove(function (err) {
			showError(err, res);
			res.status(204).json('');
		});
	};

	var searchById = function (req, res, next) {
		Book.findById(req.params.id, function (err, book) {
			showError(err, res);
			if (book) {
				req.book = book;
			} else {
				res.status(404).json('Book not found.');
			}
			next();
		});
	};

	var showResponse = function (data, err, res) {
		showError(err, res);
		res.status(200).json(data);
	};

	var showError = function (err, res) {
		if (err) {
			res.status(500).json(err);
		}
	};

	var urlSpaces = function (str) {
		while (str.indexOf(' ') != -1) {
			str = str.replace(' ', '%20');
		}
		return str;
	};

	var showError = function (err, res) {
		if (err) {
			res.status(500).json(err);
		}
	};

	return {
		initializeBooksCollection: initializeBooksCollection,
		getAll: getAll,
		getById: getById,
		putBook: putBook,
		postNewBook: postNewBook,
		patchBook: patchBook,
		deleteBook: deleteBook,
		searchById: searchById
	};
}

module.exports = bookController;
