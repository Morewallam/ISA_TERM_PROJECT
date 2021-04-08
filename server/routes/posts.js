const db = require('./../config/db');

const {incApi} = require("./admin");

const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    incApi("get/posts")
    db.promise("SELECT post_id AS id, title, content, users.user_id AS userID, username FROM posts JOIN users ON users.user_id = posts.user_id")
    .then((result) => {
        let formatResult = [];
        for(let i =0; i < result.length; i++){
            formatResult.push(
                {id:result[i].id
                ,title:result[i].title
                ,content:result[i].content
                ,user:{
                    userID:result[i].userID,
                    username:result[i].username
                }} )
        }
        res.status(200).send(formatResult);
    }).catch((err) => {
        console.log(err)
        res.status(500).send("Internal Database Error.")
    });
})


router.post('/',(req,res)=>{
    incApi("post/posts")
    let {title, content, user} = req.body;

    if(!title||!content||!user){
        res.status(405).send("Invalid Input")
    }else{
        if(!Number.isInteger(user)){
            res.status(405).send("Invalid Input")
        }else{
            db.promise(`Select user_id FROM users WHERE user_id = ${user}`)
            .then((result) => {

                if(result[0]){
                    db.promise(`INSERT INTO posts (title,content,user_id) VALUES ('${title}','${content}',${user})`)
                    .then((result) => {
                        res.status(201).send("New post created");
                    }).catch((err) => {
                        console.error(err);
                        res.status(500).send("Internal database error");
                    });
                }else{
                    res.status(405).send("Invalid input")
                }

                
            }).catch((err) => {
                console.log("bot")
                console.error(err);
                res.status(500).send("Internal database error");
            });
        }
    }
})


router.put('/',(req,res)=>{
    incApi("put/posts");
    let {id,title,content,user} = req.body

    if(!id||!title||!content||!user){
        res.status(400).end("Invalid user supplied")
    }else if(!Number.isInteger(id) || !Number.isInteger(user)){
        res.status(400).end("Invalid user supplied")
    }
    else{
        db.promise(`SELECT post_id FROM posts WHERE post_id = ${id}`)
        .then((result) => {
            
            if(result[0]){
                db.promise(`UPDATE posts SET title = '${title}', content = '${content}' WHERE post_id = ${id}`)
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

router.delete('/:postID',(req,res)=>{
    let postID = req.params['postID'];
    postID = Number.parseInt(postID);
    if(!postID||!Number.isInteger(postID)){
        res.status(400).send("invalid ID supplied");
    }else{
        db.promise(`Select post_id from posts where post_id = ${postID}`)
        .then((result) => {
            
            if(result[0]){
                db.promise(`DELETE FROM posts WHERE post_id = ${postID}`)
                .then((result) => {
                    res.status(200).send("Succesfully Deleted post")
                }).catch((err) => {
                    console.error(err)
                    res.status(500).send("Internal Database error")
                });
            }
            else{
                res.status(404).send("post not found.")
            }
        }).catch((err) => {
            console.log("bottom");
            console.error(err)
            res.status(500).send("Internal Database error")
            
        });
    }

})

module.exports = router;