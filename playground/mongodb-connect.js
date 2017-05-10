//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var user = {name:'Khalil', age:23};
// var {name} = user;
// console.log(name)

// var Obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
  return console.log('Unable to connect to MongoDB server');
}
  console.log('Conneted to MongoDB server')

  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed: true
  // }, (err, result) => {
  //   if (err) {
  //   return console.log('unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name:'Mohamed',
  //   age:23,
  //   location:'Cairo Egypt'
  // }, (err, results) => {
  //   if (err){
  //     console.log('unable to insert todo', err);
  //   }
  //
  //   console.log(results.ops[0]._id.getTimestamp());
  // });

  db.close();
});
