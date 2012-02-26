(function() {
  var app, connect, ejs, express, fs;

  express = require('express');

  fs = require('fs');

  ejs = require('ejs');

  connect = require('connect');

  app = express.createServer();

  app.use(express.bodyParser());

  app.use(connect.logger({
    format: ':method :status :url'
  }));

  app.post('*', function(req, res) {
    var path;
    if (!app.template_path) throw 'no template path(-t) was given';
    path = req.path.replace(/\/$/, '');
    return fs.readFile(app.template_path + path + '.ejs', 'utf-8', function(err, data) {
      if (err) {
        return res.send({
          message: err.message
        }, 404);
      }
      try {
        return res.send(ejs.render(data, req.body));
      } catch (error) {
        return res.send({
          message: error.message
        }, 500);
      }
    });
  });

  exports.app = app;

}).call(this);
