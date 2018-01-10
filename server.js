const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

const port = process.env.PORT || 3000;

const server = express();

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

server.get('/users', function(req, res){
  Person.find()
    .then(function(users){
      res.status(200).json(users);
    })
    .catch(function(error){
      res.status(500).json({message: 'server error', error});
    });
});

server.get('/users/:direction', function(req, res){
  const { direction } = req.params;
  let order = 1;
  if(direction === "asc")
    order = 1;
  else if(direction === "desc")
    order = -1;
  else
    res.status(STATUS_USER_ERROR).json({message: 'bad input'});
  Person.find().sort( { firstName: direction } )
    .then(function(users){
      res.status(200).json(users);
    })
    .catch(function(error){
      res.status(500).json({message: 'server error', error});
    });
});

server.get('/user-get-friends/:id', function(req, res){
  const { id } = req.params;
    Person.findById(id)
    .then(function(user){
      if(user === null)
        res.status(STATUS_SERVER_ERROR).json({message: "invalid id!"});
      else
        res.status(200).json(user.friends);
    })
    .catch(function(error){
      res.status(500).json({message: 'server error', error});
    });
});
// Your API will be built out here.

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/people', {
  useMongoClient: true
});
/* eslint no-console: 0 */
connect.then(
  () => {
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  }
);
