var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8000
  , admin = {
    "role": "admin",
    "email": "bqchristie@gmail.com",
    "password": "fyah1234",
    "name": "Bruce Christie"
  }

var session = require('express-session');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://pebbl:fyah1234@ds043012.mlab.com:43012/sandbox',
    admin: admin,
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://localhost/db-production',
    admin: admin,
  }
};

module.exports = config[env];
