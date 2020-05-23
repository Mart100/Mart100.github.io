// init project
const express = require('express')
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = express()
var privateKey  = fs.readFileSync('../SSLcert/toorney.xyz.key', 'utf8')
var certificate = fs.readFileSync('../SSLcert/toorney.xyz.crt', 'utf8')
var credentials = {key: privateKey, cert: certificate}

app.listen(3021, () => {
  console.log('Server startedon port 3021')
})

app.use('/', express.static('client'))
