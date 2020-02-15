const express = require("express")
const app = express()
var methodOverride = require("method-override")
const path = require("path")
const con = require("./config/db.js")

// Checking Database Connection
con.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
});

// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")


// Using assets dir
app.use(express.static('assets'))

// connecting route to database
app.use(function(req, res, next) {
  if(req.originalUrl=='/'){
    res.redirect('/login');
  }else{
    req.con = con
    next()
  }
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
