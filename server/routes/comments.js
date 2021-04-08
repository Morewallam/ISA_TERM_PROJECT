const db = require('./../config/db');

const {incApi} = require("./admin");

const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    incApi("post/comments")
    let {postID, content, userID} = req.body;

    if(!postID||!content||!userID){
        res.status(405).send("Invalid Input")
    }else{
        if(!Number.isInteger(userID)||!Number.isInteger(postID)){
            res.status(405).send("Invalid Input")
        }else{
            db.promise(`Select post_id FROM posts WHERE post_id = ${postID}`)
            .then((result) => {

                if(result[0]){
                    db.promise(`Select user_id FROM users WHERE user_id = ${userID}`)
                    .then((result) => {

                        if(result[0]){
                            db.promise(`INSERT INTO comments (content,post_id,user_id) VALUES ('${content}',${postID},${userID})`)
                            .then((result) => {
                                res.status(201).send("New comment created");
                            }).catch((err) => {
                                console.error(err);
                                res.status(500).send("Internal database error");
                            });
                        }else{
                            res.status(405).send("Invalid input")
                        }
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
    incApi("put/comments")
    let {id, content} = req.body;

    if(!id||!content||!Number.isInteger(id)){
        res.status(405).send("Invalid input")
    }else{
        db.promise(`Select comment_id FROM comments WHERE comment_id = ${id}`)
        .then((result) => {
            if(result[0]){
                db.promise(`UPDATE comments SET content = '${content}' WHERE comment_id = ${id}`)
                .then((result) => {
                    res.status(200).send("Comment successfully updated");
                }).catch((err) => {
                    console.error(err);
                    res.status(500).send("Internal database error");
                });
            }else{
                res.status(404).send("Comment not found")
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Internal database error");
        });
    }
    
})
router.get('/commentsForPost/:postID',(req,res)=>{
    
    incApi("get/comments/commentsForPost/{postID}")
    let postID = Number.parseInt(req.params['postID'])
    if(!postID||!Number.isInteger(postID)){
        res.status(400).send("Invalid ID supplied");
    }else{
        db.promise(`SELECT post_ID AS postID, comment_id AS id, content, users.user_id AS userID, users.username FROM comments JOIN users ON users.user_id = comments.user_id WHERE post_ID = ${postID}`)
        .then((result) => {
            let formatResult = [];
            for(let i =0; i < result.length; i++){
                formatResult.push(
                    {postID:result[i].postID
                    ,id:result[i].id
                    ,title:result[i].title
                    ,content:result[i].content
                    ,user:{
                        userID:result[i].userID,
                        username:result[i].username
                    }} )
            }
        res.status(200).send(formatResult);
        }).catch((err) => {
            res.status(500).send("Internal Database error")
        });
    }
})
router.delete('/:commentID',(req,res)=>{
    let commentID = req.params['commentID'];
    commentID = Number.parseInt(commentID);
    if(!commentID||!Number.isInteger(commentID)){
        res.status(400).send("invalid ID supplied");
    }else{
        db.promise(`Select comment_id from comments where comment_id = ${commentID}`)
        .then((result) => {
            
            if(result[0]){
                db.promise(`DELETE FROM comments WHERE comment_id = ${commentID}`)
                .then((result) => {
                    res.status(200).send("Succesfully Deleted comment")
                }).catch((err) => {
                    console.error(err)
                    res.status(500).send("Internal Database error")
                });
            }
            else{
                res.status(404).send("comment not found.")
            }
        }).catch((err) => {
            console.log("bottom");
            console.error(err)
            res.status(500).send("Internal Database error")
            
        });
    }

})

module.exports = router;