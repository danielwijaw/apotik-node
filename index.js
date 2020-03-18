const compression = require('compression')
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const path = require("path")
const cookieParser = require('cookie-parser');

const os = require("os")
const cluster = require("cluster")
const clusterWorkerSize = os.cpus().length 

const con = require("./config/db.js")

process.env.UV_THREADPOOL_SIZE = 64;

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
  res.set("Cache-Control: no-cache, no-store, must-revalidate")
  res.set("Pragma: no-cache")
  res.set("Expires: 0 ")
  if(!req.originalUrl.includes("/login") && !req.originalUrl.includes("allow=true")){
    if(typeof req.cookies['cookielogin'] == 'undefined'){
      res.redirect('/login')
      return false
    }else{
      req.con = con
      next()
    }
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

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }
 
    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted.")
    })
  } else {
 
    const server = app.listen(3001, function() {
      console.log(`Server listening on port ${server.address().port} and worker ${process.pid}`)
    })
  }
} else {

  const server = app.listen(3001, function() {
    console.log(`Server listening on port ${server.address().port} and single worker ${process.pid}`)
  })
} 