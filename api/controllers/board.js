var mongoose = require('mongoose'),
    Board = mongoose.model('Boards');

exports.list = function(req, res) {
    Board.find({}, function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};

exports.create = function(req, res) {

    var board = new Board(req.body);

    board.save(function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });

};


exports.read = function(req, res) {
    Board.findById(req.params.boardId, function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};


exports.update = function(req, res) {
    Board.findOneAndUpdate({_id: req.params.boardId}, req.body, {new: true}, function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};


exports.delete = function(req, res) {

    console.log('Trying to delete this thing');
    Board.remove({
        _id: req.params.boardId
    }, function(err, board) {
        if (err)
            res.send(err);
        res.json({ message: 'Board successfully deleted' });
    });
};
