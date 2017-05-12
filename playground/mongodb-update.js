//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
  return console.log('Unable to connect to MongoDB server');
}
  console.log('Conneted to MongoDB server')

  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID('59128a2f6d6299d5abf81c23')
  // }, {
  //   $set:{
  //     completed:true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) =>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate(
    {_id : new ObjectID("59121d86d30d7b94ef4c086f")},
    {$set:{name:"Kimo"}, $inc:{age:10}},
    {returnOriginal:false}
  ).then((res) => {
    console.log(res);
  });

  //db.close
});
