const dbuser = 'vaibhav';
const dbpassword = 'vai123';

const MONGODB_URI = `mongodb://${dbuser}:${dbpassword}@ds139428.mlab.com:39428/heroku_68nqk9nd`;
const LOCAL  = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
module.exports = MONGODB_URI;
