var mongoose = require('mongoose'),
    Board = mongoose.model('Boards'),
    Card = mongoose.model('Cards');


exports.create = function (req, res) {
    Board.findById(req.params.boardId, function(err, board) {
        if (err)
            res.send(err);

        var card = new Card(req.body);

        board.lists.id(req.params.listId).cards.push(card);
        board.save();

        res.json(card);
    });

};