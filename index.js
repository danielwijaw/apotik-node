const compression = require('compression')
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const path = require("path")
const cookieParser = require('cookie-parser');
const con = require("./config/db.js")

// Compression
app.use(compression())

// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Using assets dir
app.use(express.static('assets'))

// Cookie
app.use(cookieParser())

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// include router
const mainRouter = require("./routes/mainRouter")
const backendRouter = require("./routes/backendRouter")

// routing
app.use("/", mainRouter)
app.use("/backend", backendRouter)

// starting server
const server = app.listen(3001, function() {
  console.log(`Server listening on port ${server.address().port}`)
})
