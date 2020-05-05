'use strict';
let mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
let validator = require('validator');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the List'
    },
    complete: {
        type: Boolean,
        required: true,
        default: 0
    }
})

let ListSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the List'
    },
    state: {
        type: String,
        enum: ['NEW', 'IN_PROGRESS', 'DEV_COMPLETE', 'QA_READY', 'QA_COMPLETE', 'DONE','ARCHIVED'],
        default: 'NEW'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    archivedDate: {
        type: Date,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    tasks: [TaskSchema],
    taskCount: {
        type: Number,
        default: function(){
            return this.tasks.length;
        }
    }
});

module.exports = mongoose.model('List', ListSchema);
