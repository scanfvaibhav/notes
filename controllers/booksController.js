const Book = require('../models/Books');
const PORT = process.env.PORT || 5000;

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		Book.find(req.query)
			.then(books => res.json({books:books,
			port:PORT-1}))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Book.findById(req.params.id)
			.then(book => res.json(book))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		Book.create(req.body)
			.then(newBook => res.json(newBook))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Book.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(book => res.json(book))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Book.findById({ _id: req.params.id })
			.then(book => book.remove())
			.then(allbooks => res.json(allbooks))
			.catch(err => res.status(422).json(err));
	}
};
