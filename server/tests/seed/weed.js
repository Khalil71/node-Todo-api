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
}];


console.log(users[0].tokens[0].token);
