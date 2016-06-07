'use strict'

var path = require('path')
var express = require('express')
var moment = require('moment')

var app = express()
var port = 8000

app.use('*', function (req, res, next) {
  console.log(moment().format('HH:mm:ss.SSS'), req.method, req.originalUrl)
  res.set('Service-Worker-Allowed', '/')
  next()
})

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))
app.use('/test', express.static(path.join(__dirname)))
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/get/:test', function (req, res) {
  res.send({ test: Number(req.params.test) })
})

app.post('/post/:test', function (req, res) {
  res.send({ test: Number(req.params.test) })
})

app.listen(port, function () {
  console.log('http://localhost:' + port)
})
