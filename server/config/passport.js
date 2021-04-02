const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');


module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username, password, done){
           
        //Find if there is a user already with that username
            db.promise(`SELECT * FROM users WHERE username = '${username}'`)
            .then((result) => {
                if(result.length < 1 ){
                    return done(null, false, {message: 'Incorrect Username.'});
                }else{
                    
                    let user = result[0];
                    bcrypt.compare(password, user.password ,(err,isMatch)=>{
                        if(err) throw err;
                    
                        if(isMatch) {
                            return done(null,user);
                        } else {
                            return done(null,false,{message : 'Incorrect Password'});
                        }
                    })
                }
            }).catch((err) => {
                done(err);
            });
        }
    ))
    passport.serializeUser(function(user, done) {
        done(null, {id:user.user_id, permissions: user.permissions});
    });
    
    passport.deserializeUser(function({id,permissions}, done) {
        
        db.promise(`SELECT * FROM users WHERE user_id = '${id}'`)
            .then((result) => {
                let user = result[0];
                done(null, user);
            }).catch((err) => {
                done(err);
            });
    
    });
} 