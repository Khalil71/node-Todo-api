const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('591519b6795c8c8aeb07f6d9').then((todo) => {
  console.log(todo);
});

Todo.findOneAndRemove({_id: '591519b6795c8c8aeb07f6d9'}).then((res) => {
  console.log(res);
});
