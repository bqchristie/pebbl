let config = require('../config/config');
let User = require('./user'); //created model loading here
let mongoose = require('mongoose');
let faker = require('faker');
// let User = mongoose.model('User');


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

function createUser(user) {
    let newUser = new User(user);
    newUser.firstName = faker.name.firstName();
    newUser.lastName = faker.name.firstName();
    newUser.email = faker.internet.email();
    newUser.save().then(doc => {
        console.log(doc)
    })
        .catch(err => {
            console.error(err)
        });
}


let i = 0;
while (i < 10000) {
    i++;
    let newUser = {}
    newUser.firstName = faker.name.firstName();
    newUser.lastName = faker.name.firstName();
    newUser.email = faker.internet.email();
    createUser(newUser);
}

