var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// don't know if this is going to work

module.exports = function(passport) {
    // serialize the user for the session 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // using local strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(res, username, password, done) {
        process.nextTick(function() {
            User.findOne({'local-username': username}, function(err, user) {
                if(err)
                    return done(err);

                if(!user)
                    return done(null, false, res.send('No user found'));

                if(!user.validPassword(password))
                    return done(null, flase, res.send('Wrong password'));

                else
                    return done(null, user);
            });
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, res, username, password, done) {
        process.nextTick(function() {
            if(!req.user) {
                User.findOne({'local.username': username}, function(err, user) {
                    if(err)
                        return done(err);

                    if(user)
                        return done(null, false, res.send('Username is already taken'));

                    else {
                        var newUser = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            username: username,
                            password: saltHashPassword(password)
                            //password: generateHash(password)
                        });
                        newUser.save(function(err) {
                            if(err) 
                                console.log(err);

                            return done(null, newUser);
                        });
                    }
                });
            }
            else {
                return done(null, req.user);
            }
        });
    }
    ));

    
    var genRandomString = function(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    };

    var sha512 = function(password, salt){
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    };

    
    function saltHashPassword(userpassword) {
        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var passwordData = sha512(userpassword, salt);
        console.log('UserPassword = '+userpassword);
        console.log('Passwordhash = '+passwordData.passwordHash);
        console.log('nSalt = '+passwordData.salt);
    }
}

     