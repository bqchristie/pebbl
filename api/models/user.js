'use strict';
let mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
let validator = require('validator');
let Schema = mongoose.Schema;


let UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    lastName: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    mobileNumber: {
        type: String
    },
    workNumber: {
        type: String
    },
    homeNumber: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);

