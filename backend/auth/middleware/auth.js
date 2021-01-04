const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const opts = {};

    let token = req.header('x-auth-token');

    if (!token) return res.status(401).send('Access denied.');
    try{

        let secret = process.env.JWT_PRIVATE_SECRET;
        const decoded = jwt.verify(token, secret);
        //decode it

        req.user = decoded;
        console.log(req.user);
        return next();
    }catch (err){
        console.log(err);
        return res.status(400).send('INVALID TOKEN.');
    }
    
    /*
      passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
          User.findById(jwt_payload.id)
            .then(user => {
              if (user) {
                console.log('User', user);
                req.user = user;
                next();
                return done(null, user);
              }
              return done(null, false);
            })
            .catch(err => console.log(err));
        })
      );
      */
}

module.exports.auth = auth;