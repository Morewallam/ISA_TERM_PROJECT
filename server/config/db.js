const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "seanwallace.ca",
    user: "seanwall_admin",
    password: "admin57629",
    database: "seanwall_term_project"
});


connection.connect(function(err){
    if(err){
        console.error('error connecting: ' +err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

connection.promise = (sql) => {
    return new Promise((reslove, reject)=>{
        connection.query(sql, (err, result) =>{
            if(err){console.error(err); reject(new Error());}
            else{ reslove(result)}
        });
    });
}; module.exports = connection;