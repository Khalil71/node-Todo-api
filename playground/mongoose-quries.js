const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/user');

// var id  = '5913b8b9edd01aa3ccba8dda111';
//
// if (!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
var id = '59134e90237c4d5a4d8b0f38'

User.findById(id).then((user) => {
  if(!user){
    return console.log('User not found!');
  }
  console.log('User found:-', user);
}).catch((e) => console.log(e));

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found!');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));
