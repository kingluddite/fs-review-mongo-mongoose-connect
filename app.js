const createError = require('http-errors')
const express = require('express')
const path = require('path')
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// const mongoose = require('mongoose')
//Loads the handlebars module
const { engine } = require('express-handlebars') //  //https://stackoverflow.com/questions/59124092/hbs-is-not-define-in-node-js
// “require('./app_server/models/db');”

//MOVED- now in the main root the handlebars default
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const travelRouter = require('./routes/travel') // make new contstant for the app to use for the travel page
const aboutRouter = require('./routes/about')
const roomsRouter = require('./routes/rooms')
const mealsRouter = require('./routes/meals')
const newsRouter = require('./routes/news')
const contactRouter = require('./routes/contact')

var app = express()

//---------- view engine setup------
//OLD HANDLEBARS *NOTE the hbs template is renamed to handlebars in the file extentions also
// engiregisterPartials(path.join(__dirname, "app_server", "views/partials"))
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
// see reference
//https://www.npmjs.com/package/express-handlebars

//---------- view engine setup------
app.engine('handlebars', engine()) // calls the deconstructed express object line 7
//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars')

// The app object is instantiated on creation of the Express server. It has a middleware stack that can be customized in
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static(path.join(__dirname, 'public/static-files'))); // still uses FIXME

app.use('/', indexRouter) // The index.js or HOME page
app.use('/users', usersRouter)
app.use('/travel', travelRouter) // use new travel app page, this adds the new travelRouter
app.use('/about', aboutRouter)
app.use('/rooms', roomsRouter)
app.use('/meals', mealsRouter)
app.use('/news', newsRouter)
app.use('/contact', contactRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// mongoose
//   .connect('mongodb://localhost:27017/testdb')
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch((err) => console.error('Could not connect to MongoDB...', err))
const port = process.env.PORT || 3000
const start = async () => {
  // anytime you have an asynchronous operation it is very useful to
  // use a try/catch so that if there is an error we can handle it as well
  // since connectDB returns a Promise we use the await keyword
  try {
    const connectionString =
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testDb'
    await connectDB(connectionString)
    // only if we are successful do we spin up the Express server
    app.listen(port, console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

// run our start() to determin if we have a Database connection before we spin up our Express server
start()
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })
//
// module.exports = app

//Nodemon for auto start npm
// in packages.json add script
//npm i -D nodemon
// npm run get
//npm run dev
//
// FILE STRUCTURE NOTES
// the routes and views is now in the main path that is the default of the route of  handlebars
//https://www.npmjs.com/package/express-handlebars

// set up handlebars
//https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

// ------javascript curly brackets deconstruct-----
//used to destructure the JavaScript Object
//https://www.geeksforgeeks.org/what-is-the-use-of-curly-brackets-in-the-var-statements/

// let example_object = {
//   name: "Object",
//   platform: "GeeksForGeeks",
//   number: 100
// };

// let {name, platform, number} = example_object;

// console.log("Name: ", name);

//https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use

//https://www.tabnine.com/code/javascript/modules/express-handlebars
//hbs module
//https://www.geeksforgeeks.org/handlebars-templating-in-expressjs/
//https://stackabuse.com/guide-to-handlebars-templating-engine-for-node/

// seedgoose
//https://github.com/victorteokw/seedgoose#readme
//npm cache clean -force: Cleaning your cache will resolve potential conflicts with previously installed packages.
//JSONLint
