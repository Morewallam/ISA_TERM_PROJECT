const bcrypt = require('bcrypt');
const passport = require('passport')
const db = require('./../config/db');

const {incApi} = require("./admin");


const express = require('express');
const router = express.Router();
require('./../config/passport')(passport);


router.post("/", (req,res) => {
    incApi("post/user");
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
        db.promise(`SELECT user_id FROM users WHERE username='${username}'`)
        .then((result) => {
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

router.put('/', (req,res)=>{
    incApi("put/user");
    let {id,username,authorization} = req.body

    if(!id||!username||!authorization){
        res.status(400).end("Invalid user supplied")
    }else if(!Number.isInteger(id)){
        res.status(400).end("Invalid user supplied")
    }
    else{
        db.promise(`Select user_id from users where user_id = '${id}'`)
        .then((result) => {
            let user = result[0]
            if(user){
                db.promise(`UPDATE users SET username = '${username}', permissions = '${authorization}' WHERE user_id = ${id}`)
                .then((result) => {
                    res.status(200).send("Succesfully updated user")
                }).catch((err) => {
                    console.error(err)
                    res.status(500).send("Internal Database error")
                });
            }
            else{
                res.status(404).send("User not found.")
            }
        }).catch((err) => {
            console.log("bottom");
            console.error(err)
            res.status(500).send("Internal Database error")
            
        });
    }
})

router.get('/:username', (req,res)=>{
    incApi("get/user/{username}");
    let username = req.params['username'];
    if(!username){
        res.status(400).send("invalid username supplied");
    }else{
        db.promise(`SELECT user_id AS id, username, permissions AS authorization FROM users WHERE username = '${username}'`)
        .then((result) => {
            let user = result[0];
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).send('User not found');
            }
        }).catch((err) => {
            res.status(500).send("Internal Database error")
        });
    }
})

router.delete('/:username', (req,res)=>{
    incApi("delete/user/{username}");
    let username = req.params['username'];
    if(!username){
        res.status(400).send("invalid username supplied");
    }else{
        db.promise(`Select user_id from users where username = '${username}'`)
        .then((result) => {
            let user = result[0]
            if(user){
                db.promise(`DELETE FROM users WHERE username = '${username}'`)
                .then((result) => {
                    res.status(200).send("Succesfully Deleted user")
                }).catch((err) => {
                    console.error(err)
                    res.status(500).send("Internal Database error")
                });
            }
            else{
                res.status(404).send("User not found.")
            }
        }).catch((err) => {
            console.log("bottom");
            console.error(err)
            res.status(500).send("Internal Database error")
            
        });
    }
})


router.post('/login',
    function(req,res,next){
        incApi("post/user/login");
        next();
    },
    passport.authenticate('local'), 
    function(req,res){
        
        res.status(200).end("Successful login" + req.user);
    }
);

router.post('/logout',function(req,res){
    incApi("post/user/logout");
    req.logOut()
    res.redirect('/login');
})


module.exports = router;

