const user = require('../models/User');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		user.find(req.query)
			.then(Users => res.json(Users))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		user.findById(req.params.id)
			.then(User => res.json(User))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		user.create(req.body)
			.then(newUser => res.json(newUser))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		user.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(User => res.json(User))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		user.findById({ _id: req.params.id })
			.then(User => User.remove())
			.then(allUsers => res.json(allUsers))
			.catch(err => res.status(422).json(err));
	}
};
