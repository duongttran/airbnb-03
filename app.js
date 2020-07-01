var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require("passport")


var usersRouter = require('./routes/users');
var reviewRouter = require('./routes/reviews');
var experienceRouter = require('./routes/experiences')
var tagRouter= require('./routes/tags')
var errorRouter = require('./routes/errors')


const mongoose = require("mongoose");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(usersRouter)
app.use(reviewRouter)
app.use(experienceRouter)
app.use(tagRouter)
app.use(errorRouter)

const {errorHandler} = require('./controllers/errorController')

app.use(errorHandler)




app.listen(5000, ()=> console.log(`Example app listening`));
mongoose.connect("mongodb://localhost:27017/airbnb", { 
  
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useUnifiedTopology: true 
  })
  .then(()=> console.log("connected to database day6"))



app.use(passport.initialize())

  //check
  app.route("*").get(function (req,res, next){
    next(new Error("notFound"))
    error.statusCode = 404;
    error.status = "fail"
    next(error)
  })
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    err.status = err.status || 500
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;
