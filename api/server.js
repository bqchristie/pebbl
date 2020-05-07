const config = require('./config/config'),
    express = require('express'),
    app = express(),
    cors = require('cors'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    routes = require('./routes/api');

require('dotenv').config();
require('./models/user'); //created model loading here
require('./models/list'); //created model loading here

console.log(process.env.ENVIRONMENT);

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


const httpPort = process.env.HTTP_PORT || 3000;        // set our port
const httpsPort = process.env.HTTPS_PORT;        // set our port


// app.listen(port);

if (httpsPort) {
    // Certificate
    const key = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/cert.pem', 'utf8');
    const cert = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/fullchain.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/api.fuudlist.com/chain.pem', 'utf8');

    const credentials = {
        cert: cert,
        key: key
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(httpsPort, () => {
        console.log('HTTPS Server running on port ' + httpsPort);
    });
} else {
    const httpServer = http.createServer();
    httpServer.listen(httpPort, () => {
        console.log('todo list RESTful API server started on: ' + httpPort);
    })

}


// NOTE:
// check out this to configure SSL
// https://github.com/bqchristie/dbtools/blob/master/server.js
