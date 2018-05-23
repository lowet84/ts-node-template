import * as express from 'express'
import * as bodyParser from 'body-parser'
import testHandler from './handlers/testHandler';

var app = express()
app.use( bodyParser.json() );  

// app.get('/api/', function(req, res) {
//   res.send('Hello World2')
// })

const handlers = [
  testHandler
]

app.post('/api/', function(req, res) {
  res.send('Hello World2')
})

const port = 8081
// const handlers = 

app.use(express.static('public'))
var server = app.listen(port, function() {
  console.log(`Example app listening at port ${port}`)
})
