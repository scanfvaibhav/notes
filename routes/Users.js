const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

router
	.route('/')
	.get(UsersController.findAll)
	.post(UsersController.create);

router
	.route('/:id')
	.get(UsersController.findById)
	.put(UsersController.update)
	.delete(UsersController.remove);

module.exports = router;
