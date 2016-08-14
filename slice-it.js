const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');
const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/slice-it';


/********************
      DATABASE
********************/
const options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },

  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
}

mongoose.connect(mongoUri, options);

const db = mongoose.connection;


/********************
       SERVER
********************/
server.connection({
  port: process.env.PORT || 1337,
  routes: {
    cors: true
  }
});

server.register(require('inert'), (err) => {
  db.on('error', console.error.bind(console, 'connection error:'))
    .once('open', () => {
      server.route(routes);

      server.start(err => {
        if (err) throw err;
      });

    });
});
