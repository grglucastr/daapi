var books = function (Book) {
	
		var vetBooks = [
			new Book({
				author: 'Derik',
				genre: 'Science Fiction',
				title: 'Hunger Games'
			}),
			new Book({
				author: 'Lev Nikolayevich Tolstoy',
				genre: 'Historical Fiction',
				title: 'War and Peace'
			}),
			new Book({
				author: 'Victor Hugo',
				genre: 'Historical Fiction',
				title: 'Les Misérables'
			}),
			new Book({
				author: 'H. G. Wells',
				genre: 'Science Fiction',
				title: 'The Time Machine'
			}),
			new Book({
				author: 'Jules Verne',
				genre: 'Science Fiction',
				title: 'A Journey into the Center of the Earth'
			}),
			new Book({
				author: 'Henry Kuttner',
				genre: 'Fantasy',
				title: 'The Dark World'
			}),
			new Book({
				author: 'Kenneth Crahame',
				genre: 'Fantasy',
				title: 'The Wind in the Willows'
			}),
			new Book({
				author: 'Mark Twain',
				genre: 'History',
				title: 'Life On The Mississippi'
			}),
			new Book({
				author: 'Lev Nikolayewich Tolstoy',
				genre: 'Biography',
				title: 'Childhood'
			})];
		 
	

	return {
		storeInitialBooks: vetBooks
	};
};

module.exports = books;