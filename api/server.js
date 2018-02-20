var config = require('./config/config')
    express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./models/board'), //created model loading here
    bodyParser = require('body-parser'),
    routes = require('./routes/board');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

routes(app, config);


// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.getURL()).then(function(){
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