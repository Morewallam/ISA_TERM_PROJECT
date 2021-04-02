const express = require('express');
const session = require('express-session')
const passport = require('passport');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    // res.header('Access-Control-Allow-Headers','Content-type, Authorization, Content-Length, x-requested-with');
    next();
})

app.use('/v1/user',require('./routes/users'));
app.listen(8000);





