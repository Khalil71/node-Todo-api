//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
  return console.log('Unable to connect to MongoDB server');
}
  console.log('Conneted to MongoDB server')

  // delete many
  // db.collection('Todos').deleteMany({text:'eat lunch'}).then((res) => {
  //   console.log(res);
  // });
  //delete one
  // db.collection('Todos').deleteOne({text:'eat lunch'}).then((res) => {
  //   console.log(res);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true}).then((res) => {
  //   console.log(res);
  // });

  //db.close();

  // db.collection('Users').deleteMany({name:'Mohamed'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').deleteOne({_id: new ObjectID('59121d11257a89870fbcd6c0')}).then((res) => {
    console.log(res);
  });
});
