const express = require('express');
const session = require('express-session')
const passport = require('passport');
const app = express();

require('dotenv').config();



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Headers','Access-Control-Allow-Origin,Content-type, Authorization, Content-Length, x-requested-with');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
    next();
})

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/v1/user',require('./routes/users'));
app.use('/v1/posts',require('./routes/posts'));
app.use('/v1/admin',require('./routes/admin').router);
app.listen(8000);





