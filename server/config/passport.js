const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('./db');




module.exports = function(passport){

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token,done) =>{
          try {
            return done(null, token.user)
          } catch (error) {
              done(error)
          }
      }
    )
  );
    passport.use(new LocalStrategy(
        function(username, password, done){
           
        //Find if there is a user already with that username
            db.promise(`SELECT * FROM users WHERE username = ${db.escape(username)}`)
            .then((result) => {
                if(result.length < 1 ){
                    return done(null, false, {message: 'Incorrect Login'});
                }else{
                    
                    let user = result[0];
                    bcrypt.compare(password, user.password ,(err,isMatch)=>{
                        if(err) throw err;
                    
                        if(isMatch) {
                            return done(null,user, {message: "logged in Successfully"});
                        } else {
                            return done(null,false,{message : 'Incorrect Login'});
                        }
                    })
                }
            }).catch((err) => {
                done(err);
            });
        }
    ))
    passport.serializeUser(function(user, done) {
        done(null, {id:user.user_id, username:user.username ,auth: user.permissions});
    });
    
    passport.deserializeUser(function({id,username, auth}, done) {
        
        db.promise(`SELECT * FROM users WHERE user_id = '${id}'`)
            .then((result) => {
                let user = result[0];
                done(null, user);
            }).catch((err) => {
                done(err);
            });
    
    });
} 