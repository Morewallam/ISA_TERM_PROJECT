const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ISA_term_project"
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
            if(err){reject(new Error());}
            else{ reslove(result)}
        });
    });
};

module.exports = connection;