const router = require('express').Router();
const UserRoutes = require('./Users');
const path = require('path');


// API routes
router.use('/api/Users', UserRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;
