var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/MessageBoard';
mongoose.connect(dbURI, {useNewUrlParser: true});
var db = mongoose.connection;

db.on('connected', function () {  
    console.log('Mongoose default connection open to ' + dbURI);
}); 
  
// If the connection throws an error
db.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
});

// exporting the connection
module.exports = db;