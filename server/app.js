const express = require('express');
const session = require('express-session')
const passport = require('passport');
require('./config/passport')(passport);
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

// app.use(session({
//     secret : 'secret',
//     resave : true,
//     saveUninitialized : true}));
app.use(passport.initialize());
// app.use(passport.session());

app.use('/v1/user',require('./routes/auth'));

app.use('/v1/user',passport.authenticate('jwt',{session: false}),require('./routes/users'));
app.use('/v1/posts',passport.authenticate('jwt',{session: false}),require('./routes/posts'));
app.use('/v1/comments',passport.authenticate('jwt',{session: false}),require('./routes/comments'));
app.use('/v1/admin',passport.authenticate('jwt',{session: false}),require('./routes/admin').router);
app.listen(8000);





