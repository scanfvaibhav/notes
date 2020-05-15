const chat = require('../models/chat');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		chat.find(req.query)
			.then(Users => res.json(Users))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		chat.findById(req.params.id)
			.then(User => res.json(User))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		chat.create(req.body)
			.then(newUser => res.json(newUser))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		chat.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(User => res.json(User))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		chat.findById({ _id: req.params.id })
			.then(chat => chat.remove())
			.then(all => res.json(all))
			.catch(err => res.status(422).json(err));
    },
    findChat: function(req,res){
        chat.findById({ from: req.params.from,to:req.params.to })
        .then(all => res.json(all))
        .catch(err => res.status(422).json(err));
    }
};