const {ObjectID} = require('mongodb');
const {sign, verify} = require('jsonwebtoken')

const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'wakeen@example.com',
  password: 'userOnePass',
  tokens:[{
    access: 'auth',
    token: sign({userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password:'userTwoPass'
}]

const todos = [{
  _id: new ObjectID(),
  text:'first text todo'
}, {
  _id: new ObjectID(),
  text:'Second test todo',
  completed: true,
  completedAt: 333
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
