express = require 'express'
app = express.createServer()
app.use express.bodyParser()

fs = require 'fs'
ejs = require 'ejs'

app.post '*', (req, res) ->
  path = req.path.replace /\/$/, ''
  fs.readFile './templates' + path + '.ejs', 'utf-8', (err, data) ->
    if (err)
      res.send {message: err.message}, 404
    else
      try
        console.log '200'
        res.send ejs.render data, req.body
      catch error
        console.log error
        res.send {message: error.message}, 500

app.listen(3000)