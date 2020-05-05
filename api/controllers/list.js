let mongoose = require('mongoose');
let List = mongoose.model('List');

/**
 * Return a list of all active backlog items
 *
 * @param req
 * @param res
 */
exports.list = function (req, res) {

    const queryObj = {
        state: {$ne: 'ARCHIVED'}
    }

    List.find(queryObj)
        .exec()
        .then(result => {
            res.json(result);
        });
};

exports.read = function (req, res) {
    List.findById(req.params.id).then(function (list) {
        res.json(list);
    });
};


exports.delete = function(req, res) {
    List.findByIdAndRemove(req.params.id).then(function(data){
        res.json(data)
    })
}

exports.save = function(req, res) {

    List.findByIdAndUpdate(req.body._id,{$set:req.body}, {new: true}).then(function(list){
        res.json(list);
    });

}

/**
 * Create a new ListItem
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    const list = new List(req.body);
    list.save().then(item => res.json(item));
};
