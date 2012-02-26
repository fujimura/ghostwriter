#! /usr/bin/env node
(function() {
  var argv, ghostwriter;

  argv = require('optimist').alias('p', 'port').alias('t', 'template_path').argv;

  ghostwriter = require('../lib/ghostwriter');

  ghostwriter.app.template_path = argv.template_path;

  if (!argv.port) throw 'no port number(-p) was given';

  ghostwriter.app.listen(argv.port);

}).call(this);
