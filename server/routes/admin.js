const { Router } = require("express");
const router = Router();
const db = require('./../config/db');

function incApi(api){
    
    db.promise(`UPDATE admin SET \`${api}\` = \`${api}\`+1`)
    .then((result) => {
        console.log("Updated");
    }).catch((err) => {
        console.error(err);
    });
}

router.get("/",(req,res)=>{
    db.promise(`SELECT * FROM admin`)
    .then((result) => {
        res.status(200).json(result[0])
    }).catch((err) => {
        res.status(500).end("Database failure")
    });
})


exports.router = router
exports.incApi = incApi;