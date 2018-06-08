import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Handler } from './Handler'
import { TestController } from './controllers/TestController'
import { OtherController } from './controllers/OtherController'
import tableGenerator from './tableGenerator'

process.on('SIGTERM', function onSigterm () {
  console.log('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
  // start graceul shutdown here
})

async function start() {
  // Database name
  let databaseName = 'tsNodeTemplate'

  let hostName = process.argv[2] || 'localhost' 
  let connection = await tableGenerator(hostName, databaseName)
  var app = express()
  app.use(bodyParser.json())

  // app.get('/api/', function(req, res) {
  //   res.send('Hello World2')
  // })

  const handler = new Handler(new OtherController(), new TestController())

  app.post('/api/', function(req, res) {
    res.send(handler.handle(req.body.name, req.body.body))
  })

  const port = 8081
  // const handlers =

  app.use(express.static('public'))
  var server = app.listen(port, function() {
    console.log(`Example app listening at port ${port}`)
  })
}

start()
