const jwt = require('jsonwebtoken');
import User from '../models/user'

// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
exports.verifyToken = (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            return req.authData = authData;
        }
    })
};

// Issue Token
exports.signToken = (req, res) => {
    console.log('userId' + req.user._id)
    jwt.sign({userId: req.user._id}, 'secretkey', {expiresIn:'5 min'}, (err, token) => {
        if(err){
            res.sendStatus(500);
        } else {
            // res.json({token});
            // console.log(token)
            // return res.status(200).send(JSON.stringify(req.user));
            const email = req.user.email
            res.redirect(`http://localhost:3000/profile/${token}/${email}`);
            // req.token = token
            // res.setHeader('x-auth-token', token);
            // return res.json({token: token})
        }
    });
}

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

exports.generateToken = (req, res, next) => {
    req.token = createToken(req.auth);
    // 这里都successful
    console.log('created token is:', req.token)
    return next();
}

exports.sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    // console.log(req.auth)
    const token = req.token + '@' + req.auth.id
    return res.json({ token: token,
                      email: req.user.email,
                      _id: req.auth.id })
    // console.log('sent token is:', req.token)
    // return res.status(200).send(JSON.stringify(req.user));
}

exports.validateUser = (req, res, next) => {
    // const headerToken = req.headers.authorization
    // console.log('created token is:', headerToken)
    if(req.headers == null || req.headers.authorization == null) {
        return res.status(401).send('User Not Authenticated');
    } else {
        const _id = req.headers.authorization.split("@")[1]
        if(_id == null || _id.length == 0) {
          return res.status(401).send('User Not Authenticated');
        }
        User.findById(_id, function(err, user){
          if(err) {
            return done(err, false)
            // return res.send(401, 'User Not Authenticated');
          }
          req.user = user
          return next();
        })
    }
}
