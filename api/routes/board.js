/**
 * Created by brucechristie on 2018-02-18.
 */
'use strict';

module.exports = function(app, config) {
    var board = require('../controllers/board');
    var list = require('../controllers/list');
    var path = config.api.path + config.api.version;

    // board Routes
    app.route( path  + '/board')
        .get(board.list)
        .post(board.create);


    app.route(path + '/board/:boardId')
        .get(board.read)
        .put(board.update)
        .delete(board.delete);

    app.route(path + '/board/:boardId/list')
        .get(board.read)
        .post(list.create)
};