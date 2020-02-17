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

// Using assets dir and cache
app.use(express.static('assets', { maxAge: 8640000}))

// Cookie
app.use(cookieParser())

// Middleware Database and Verify Login
app.use(function(req, res, next) {
  if(!req.originalUrl.includes("/apotek") && !req.originalUrl.includes("/gudang")){
    req.con = con
    next()
  }else{
    if(typeof req.cookies['cookielogin'] == 'undefined'){
      res.redirect('/login')
      return false
    }else{
      req.con = con
      next()
    }
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
