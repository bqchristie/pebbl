var config = require('./config/config')
express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 80,
    mongoose = require('mongoose'),
    require('./models/user'), //created model loading here
    require('./models/list'), //created model loading here
    bodyParser = require('body-parser'),
    routes = require('./routes/api');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!');
    next(err);
})


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

routes(app, config);


// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.getURL()).then(function () {
    console.log('done connecting');
}).catch(function (err) {
    console.log(err);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("We're connected");
});


app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
