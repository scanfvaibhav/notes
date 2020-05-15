import axios from 'axios';

export default {
	// Gets all Users
	getUsers: function() {
		return axios.get('/api/Users');
	},
	// Gets the User with the given id
	getUser: function(id) {
		return axios.get('/api/Users/' + id);
	},
	// Deletes the User with the given id
	deleteUser: function(id) {
		return axios.delete('/api/Users/' + id);
	},
	// Saves a User to the database
	saveUser: function(UserData) {
		return axios.post('/api/Users', UserData);
	}
};
