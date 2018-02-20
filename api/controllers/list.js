var mongoose = require('mongoose'),
    Board = mongoose.model('Boards'),
    List = mongoose.model('Lists');


exports.create = function (req, res) {

    Board.findById(req.params.boardId, function (err, board) {
        if (err)
            res.send(err);
        var list = new List(req.body);
        board.lists.push(list);
        board.save();
        res.json(list);
    });

};