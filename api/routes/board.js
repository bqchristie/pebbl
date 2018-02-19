/**
 * Created by brucechristie on 2018-02-18.
 */
'use strict';

module.exports = function(app, config) {
    var board = require('../controllers/board');
    var path = config.api.path + config.api.version;

    // board Routes
    app.route( path  + '/board')
        .get(board.list)
        .post(board.create);


    app.route('/board/:boardId')
        .get(board.read)
        .put(board.update)
        .delete(board.delete);
};