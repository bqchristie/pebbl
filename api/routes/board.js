/**
 * Created by brucechristie on 2018-02-18.
 */
'use strict';
module.exports = function(app) {
    var board = require('../controllers/board');

    // board Routes
    app.route(app.apiPath + '/board')
        .get(board.list)
        .post(board.create);


    app.route('/board/:boardId')
        .get(board.read)
        .put(board.update)
        .delete(board.delete);
};