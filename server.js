var express = require('express');
var bodyParser = require('body-parser');
var dbConnection = require('./config/dbConfig');

var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes/user')(app);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});