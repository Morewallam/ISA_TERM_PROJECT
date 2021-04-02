const bcrypt = require('bcrypt');
const passport = require('passport')
const db = require('./../config/db');

let loginCount = 0;
let logoutCount = 0;
let newUserCount = 0;

const express = require('express');
const router = express.Router();
require('./../config/passport')(passport);


router.post("/", (req,res) => {
    newUserCount++;
    let {username,password,repeatPassword,authorization} = req.body;
    
    let error = false
    //Check if all fields are filled in
    if(!username||!password||!repeatPassword||!authorization){
        res.status(400).end("Please fill in all fields")
        error = true;
    }
    //Check to see if the passwords match
    if(password != repeatPassword){
        res.status(400).end("Passwords dont match");
        error = true;
    }
    //Check if the auth is of the "user" or "admin"
    if(authorization != "user" && authorization != "admin"){
        res.status(400).end("incorrect authorization");
        error = true;
    }
    if(!error){
        db.promise(`SELECT * FROM users WHERE username='${username}'`)
        .then((result) => {
            console.log(result);
            if(result.length > 0){
                res.status(400).end("Username already exists");
            }
            else{
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err){throw err;}
                    bcrypt.hash(password,salt,
                        (err,hash)=> {
                            if(err) {console.error(err);}
                            //save pass to hash
                            password = hash;
                            //save user
                            db.promise(`INSERT INTO users(username,password,permissions) VALUES ('${username}','${password}','${authorization}')`)
                            .then((result) =>{
                                res.status(201).end("New user created");
                            }).catch((err)=>{
                                res.status(500).end("Database error")
                                console.error(err);
                            });
                    });
                });
            }
        }).catch((err) => {
            console.log("SQL Error");
            res.status(500).end("database error");
        });
    }
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.post('/logout',function(req,res){
    logoutCount++;
    req.logOut()
    res.redirect('/login');
})


module.exports = router;
