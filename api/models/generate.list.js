let config = require('../config/config');
let List = require('./list'); //created model loading here
let mongoose = require('mongoose');
let faker = require('faker');


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

function createList(_list) {
    let list = new List(_list);

    list.save().then(doc => {
        console.log(doc)
    })
        .catch(err => {
            console.error(err)
        });
}

List.collection.drop();

let i = 0;
while (i < 12) {
    i++;
    let list = {}
    list.name = `Lizt ${i}`;
    list.upvotes = Math.floor(Math.random() * Math.floor(12));

    list.tasks = [];
    list.tasks.push({name: 'Task 1'});
    list.tasks.push({name: 'Task 2'});
    createList(list);
}

