const mongoose = require('mongoose');

const cs5Path = 'mongodb://localhost/cs5';
const dbPath = 'mongodb://localhost/people';

mongoose.Promise = global.Promise;
const peopleDb = mongoose.createConnection(dbPath);
const cs5Db = mongoose.createConnection(cs5Path);