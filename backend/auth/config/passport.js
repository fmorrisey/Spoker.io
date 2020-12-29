const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJWT;
const User = require('../models/user.model');

passport.use(
  'register',
  new localStrategy(
      {
          usernameField: 'username',
          passwordField: 'password',
          session: false,
      },
      (username, password, done) => {
          try {
              User.findOne({
                  $or: { 
                      username: username,
                  },
              }).then(user => {
                  if (user != null) {
                      console.log('username already taken');
                      return done(null, false, {message: 'username already taken'});
                  } else {
                      bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                          User.create({ username, password: hashedPassword }).then(user => {
                              console.log('user created');
                              // note the return needed with passport local - remove this return for passport JWT to work
                              return done(null, user);
                          });
                      });
                  }
              });
          } catch (err) {
              done(err);
            }
          },
        ),
      );

new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  (username, password, done) => {
    try {
      User.findOne({
        $or: {
          username: username,
        },
      }).then(user => {
        if (user === null) {
          return done(null, false, { message: 'bad username' });
        } else {
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            // note the return needed with passport local - remove this return for passport JWT
            return done(null, user);
          });
        }
      });
    } catch (err) {
      done(err);
    }
  },
);

const opts = {
  secretOrKey: jwtSecret.secret,
  algorithms: ['RS256'],
  passReqToCallback: true,
};

opts.jwtFromRequest = ExtractJWT.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  req => cookieExtractor(req),
]);


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};



passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        $or: {
          username: jwt_payload._id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);

