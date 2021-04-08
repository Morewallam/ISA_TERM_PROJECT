
const db = require('./../config/db');

const {incApi} = require("./admin");


const express = require('express');
const router = express.Router();



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


module.exports = router;

