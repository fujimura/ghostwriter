express = require 'express'
fs      = require 'fs'
ejs     = require 'ejs'
argv    = require('optimist')
  .alias('p', 'port')
  .alias('t', 'template_path')
  .argv

unless argv.template_path then throw 'no template path(-t) was given'
unless argv.port          then throw 'no port number(-p) was given'

app = express.createServer()
app.use express.bodyParser()

app.post '*', (req, res) ->
  path = req.path.replace /\/$/, ''
  fs.readFile argv.template_path + path + '.ejs', 'utf-8', (err, data) ->
    if err then return (res.send {message: err.message}, 404)
    try
      res.send ejs.render data, req.body
      console.log '200'
    catch error
      res.send {message: error.message}, 500
      console.log error

app.listen argv.port