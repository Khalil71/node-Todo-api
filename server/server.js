var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/user');
var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    name: req.body.name
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Please enter a valid id');
  } else {
    Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(400).send('id not found');
      }
      res.send({todo});
    }).catch((e) => res.status(404).send());
  }
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Please provide a valid ID.');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(400).send('Doc not found.');
    }
    res.status(200).send( todo + '\n' + 'Has been deleted.')
  }).catch((e) => res.status(404).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
