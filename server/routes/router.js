import fs from 'fs'
import path from 'path'
import passport from 'passport'
import passportInitialize from '../services/passportInitialize'
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

import * as AuthController from '../controllers/auth'
import * as TaskController from '../controllers/task'
import * as UserinfoController from '../controllers/userinfo'
import * as PlanController from '../controllers/plan'
// import generateToken from '../services/token-jwt'
const authService = require('../services/AuthService');
import User from '../models/user'

// run passportInitialize function
passportInitialize()
// initialize middleware by passport package
const requireAuth = passport.authenticate('jwt', { session: false })

cloudinary.config({
  cloud_name: 'dutal5oer',
  api_key: '333752729912466',
  api_secret: 'gVYZ3aNx0MmMKITHdyD9e9-71YI'
})


export default function(app){
  // test req.user
  app.get('/email', authService.validateUser, function(req, res){
    res.send({ 'message': 'protected' })
  })
  // test Routerss
  app.get('/test', function(req, res){
    res.send({ message: 'Test Route'})
  })

  // User
  app.get('/userinfo', authService.validateUser, UserinfoController.userinfo)
  app.post('/username', authService.validateUser, UserinfoController.updateUsername)
  // auth Google
  app.post('/auth/google', passport.authenticate('google-token', {session: false}), (req, res, next) => {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.id
    };
    console.log('req.auth in post reqeust is:', req.auth)
    next();
  }, authService.generateToken, authService.sendToken);

  // this will call passport-setup.js authentication in the config directory
  // app.get('/auth/google', passport.authenticate('google', {
  //     session: true,
  //     scope: ['profile', 'email']
  // }));

  // callback url upon successful google authentication
  // app.get('/auth-success', passport.authenticate('google', {session: true}), (req, res) => {
  //     authService.signToken(req, res);
  // });

  // route to check token with postman.
  // using middleware to check for authorization header
  // app.get('/verify', authService.checkTokenMW, (req, res) => {
  //     authService.verifyToken(req, res);
  //     if (null === req.authData) {
  //         res.sendStatus(403);
  //     } else {
  //         res.json(req.authData);
  //     }
  // });

  // Cloudinary Upload Image API
  app.post('/image-upload', (req, res) => {
    if(!req.files) {
      console.log('Failed on req.files')
    }
    console.log(req.files)
    console.log(req.body)
    const values = Object.values(req.files)
    console.log(values)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise
      .all(promises)
      .then(results => res.json(results))
      .catch((err) => res.status(400).json(err))
  })

  // tasks APIs
  app.post('/tasks', authService.validateUser, TaskController.addTask)
  app.post('/delete', authService.validateUser, TaskController.deleteTask)
  app.get('/tasks', authService.validateUser, TaskController.searchTask)

  // plan APIs
  app.post('/plans', authService.validateUser, PlanController.createPlan)
  app.get('/plans', authService.validateUser, PlanController.getPlan)
  app.get('/plans/:id', authService.validateUser, PlanController.getPlanDetail)
}
