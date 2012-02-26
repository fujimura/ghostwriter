express = require 'express'
fs      = require 'fs'
ejs     = require 'ejs'
connect = require 'connect'

app = express.createServer()
app.use express.bodyParser()
app.use connect.logger({ format: ':method :status :url' })

app.post '*', (req, res) ->
  unless app.template_path then throw 'no template path(-t) was given'
  path = req.path.replace /\/$/, ''
  fs.readFile app.template_path + path + '.ejs', 'utf-8', (err, data) ->
    if err then return (res.send {message: err.message}, 404)
    try
      res.send ejs.render data, req.body
    catch error
      res.send {message: error.message}, 500

exports.app = app