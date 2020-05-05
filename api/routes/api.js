/**
 * Created by brucechristie on 2018-02-18.
 */
'use strict';

module.exports = function(app, config) {
    const user = require('../controllers/user');
    const list = require('../controllers/list');

    const path = config.api.path + config.api.version;

    app.route( path  + '/user')
        .get(user.list)
        .post(user.create)
        .put(user.update);

    app.route( path  + '/user/:id')
        .get(user.read)
        .delete(user.delete);

    app.route(path + '/list')
        .get(list.list)
        .put(list.save)

        .post(list.create);

    app.route(path + '/list/:id')
        .delete(list.delete)
        .get(list.read);

};
