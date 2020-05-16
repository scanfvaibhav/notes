const dbuser = 'abcd';
const dbpassword = 'abcd12';

const MONGODB_URI = `mongodb://${dbuser}:${dbpassword}@ds125453.mlab.com:25453/mern-example`;
const LOCAL  = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
module.exports = LOCAL;
