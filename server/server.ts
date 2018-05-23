import * as express from "express"

var app = express()

app.get("/", function(req, res) {
  res.send("Hello World2")
})

const port = 8088

app.use(express.static('public'))
var server = app.listen(port, function() {
  var host = JSON.stringify(server.address())

  console.log(`Example app listening at http://${host}:${port}`)
})
