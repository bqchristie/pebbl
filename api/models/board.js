'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
})

var ListSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    cards :[CardSchema]
})

var BoardSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the board'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    lists: [ListSchema]
});


// var CardSchema = new Schema({
//     name: {
//         type: String,
//         required: 'Kindly enter the name of the task'
//     },
//     createdDate: {
//         type: Date,
//         default: Date.now
//     },
//
// })

module.exports = mongoose.model('Boards', BoardSchema);
module.exports = mongoose.model('Cards', CardSchema);
module.exports = mongoose.model('Lists', ListSchema);
