let mongoose = require('mongoose');
let User = mongoose.model('User');

exports.list = function (req, res) {
    console.log(req.query);
    let queryObj = {}
    if (req.query.query){
        queryObj.firstName = new RegExp(req.query.query, 'gi')
    }
    console.log(queryObj);

    User.paginate(queryObj, {offset: 0, limit: 20, sort: {lastName: 'asc'}}).then(result => {
        res.json(result.docs);
    });
};

exports.create = function (req, res) {
    const user = new User(req.body);
    user.save().then(user => res.json(user));
};


exports.read = function (req, res) {
    User.findById(req.params.id).then(function (user) {
        res.json(user);
    });
};


exports.update = function (req, res) {
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}).then(user => res.json(user));
}


exports.delete = function (req, res) {

    console.log('Trying to delete this thing');
    User.remove({
        _id: req.params.id
    }, function (err, board) {
        if (err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
};

