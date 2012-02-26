argv    = require('optimist')
  .alias('p', 'port')
  .alias('t', 'template_path')
  .argv

ghostwriter = require '../lib/ghostwriter'
ghostwriter.app.template_path = argv.template_path
unless argv.port then throw 'no port number(-p) was given'

ghostwriter.app.listen argv.port