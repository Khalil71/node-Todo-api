const {SHA256} = require('crypto-js');
const {sign, verify} = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var pass = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pass, salt, (err, hash) => {
     console.log(hash);
   });
 });

var hashedPass = '$2a$10$97sdXZMhHC5WwkBDH9hFT.47xn6yWuhkH09g8WFn/5.vLpZwSvjCi';

bcrypt.compare(pass, hashedPass, (err, result)=> {
  console.log(result);
});

// var data = {
//   id: 10
// }
//
// var token = sign(data, '123abc');
// console.log(token);
// var decoded = verify(token, '123abc');
// console.log('decoded', decoded);
//
// var message = 'I am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash : ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//   token.data.id = 5;
//   token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash){
//   console.log('data was not changed');
// } else {
//   console.log('data was changed. Do not trust!');
// }
