var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./models/board'), //created model loading here
    bodyParser = require('body-parser'),
    routes = require('./routes/board');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.apiPath ='/api/v1';

routes(app);


// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds239988.mlab.com:39988/pebbl').then(function(){
    console.log('done connecting');
}).catch(function(err){
    console.log(err);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    console.log("We're connected");
});




app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);