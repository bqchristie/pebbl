'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BoardSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
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
    }
});

module.exports = mongoose.model('Boards', BoardSchema);
