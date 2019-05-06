import seedrandom from 'seedrandom';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
const formData = require('express-form-data')

import config from './config';
import router from './routes/router';
// import { Sequence } from './models/sequence';
// import * as SearchCourse from './controllers/search-course';
// import * as AuthorCourse from './controllers/author-course';
// import * as LectureCourse from './controllers/lecture-course';
// import * as UserCourse from './controllers/user-course';
// import * as CommentCourse from './controllers/comment-course';

seedrandom();
Math.seedrandom();

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = require('bluebird');

mongoose.connect(config.database, {useMongoClient: true,
    keepAlive: 300000, connectTimeoutMS: 30000}).then(
    () => {
        console.log("Connected to the database");
        // Sequence()
        // .then(console.log("user/comment counter created"))

        if (process.env.INITDB === "TRUE") {
            mongoose.connection.dropDatabase()
                .then(function () {
                    // Sequence()
                    // .then(console.log("user/comment counter created"))
                    //   .then(function () {
                    //       AuthorCourse.buildAuthor();
                    //       SearchCourse.buildCourse();
                    //       LectureCourse.buildLecture();
                    //       UserCourse.buildUser();
                    //       CommentCourse.buildComment();
                    //   });
                });
        }
        //
        // AuthorCourse.populate();
        // SearchCourse.populate();
        // LectureCourse.populate();
        // UserCourse.populate();
        // CommentCourse.populate();
    })
    .catch((err) => {
        if (err) {
            console.log(err);
            return handleError(err);
        }
    });

app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/public/img'));

app.use('/video',function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/video', express.static(__dirname + '/public/mp4'));

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));

// app.use(express.session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(formData.parse())

router(app);

const port = process.env.PORT || config.port;
const server = http.createServer(app);
if(server) {
    server.listen(port, function (err) {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log('Server is Running on port: ', port);
    });
}
