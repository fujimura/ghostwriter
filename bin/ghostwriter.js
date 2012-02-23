#!/usr/bin/env node

(function() {
  var app, argv, ejs, express, fs;

  express = require('express');

  fs = require('fs');

  ejs = require('ejs');

  argv = require('optimist').alias('p', 'port').alias('t', 'template_path').argv;

  if (!argv.template_path) throw 'no template path(-t) was given';

  if (!argv.port) throw 'no port number(-p) was given';

  app = express.createServer();

  app.use(express.bodyParser());

  app.post('*', function(req, res) {
    var path;
    path = req.path.replace(/\/$/, '');
    return fs.readFile(argv.template_path + path + '.ejs', 'utf-8', function(err, data) {
      if (err) {
        return res.send({
          message: err.message
        }, 404);
      }
      try {
        res.send(ejs.render(data, req.body));
        return console.log('200');
      } catch (error) {
        res.send({
          message: error.message
        }, 500);
        return console.log(error);
      }
    });
  });

  app.listen(argv.port);

}).call(this);
