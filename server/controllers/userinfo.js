import User from '../models/user'
import config from '../config'

export const userinfo = function(req, res, next) {
  const email = req.user.email

  if(!email || email.length < 0){
    return res.status(400).send({error: 'invalid email'})
  }

  User.findOne({email: email})
      .exec(function(err, user){
        if(err){
          console.log(err)
        } else {
          if(user){
            return res.json(user)
          }
        }
      })
}

export const updateUsername = function(req, res, next) {
  const newUsername = req.body.newUsername
  const email = req.user.email

  if(!email || email.length < 0) {
    return res.status(400).send({error: 'invalid email.'})
  }

  if(!newUsername) {
    return res.status(400).send({
      confirmation: 'fail',
      message: 'Empty New Username'
    })
  }

  User.findOne({email: email})
    .exec(function(err, user) {
      if(err) {
        console.log(err)
      } else {
        if(user) {
          user.username = newUsername
          user.save(function(err) {
            if(err) {
              return next(err)
            } else {
              return res.json({
                confirmation: 'success',
                load: newUsername
              })
            }
          })
        }
      }
    })
}
