import * as express from "express"

var app = express()

app.get("/", function(req, res) {
  res.send("Hello World2")
})

const port = 8088

app.use(express.static('public'))
var server = app.listen(port, function() {
  console.log(`Example app listening at port ${port}`)
})
