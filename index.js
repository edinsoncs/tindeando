'use strict'

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const expressSession = require('express-session');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const monk = require('monk');
let db = monk('localhost:27017/tindeando');

const passport = require('passport');
const facebook = require('passport-facebook').Strategy;
require('./models/usuario');
require('./config')(passport);



//const mysql = require('mysql');
//const initmysql = require('./models/db');
//initmysql(mysql);

let port = require('./config/init');


mongoose.connect('mongodb://localhost:27017/tindeando', {
	useMongoClient: true
});

app.use(function(req, res, next) {
    req.db = db;
    next();
});

/*Cookies Login passport local*/
app.use(expressSession({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 // one hour in millis
    }
}));
/*End Cookies*/


//Set Public Assets and HTML,JS,CSS,IMG
app.set(express.static(path.join(__dirname, 'public')));

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());

app.use(passport.initialize());
app.use(passport.session());

let home = require('./routes/home');

app.use('/', home);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
 successRedirect: '/#!/dashboard', 
 failureRedirect: '/' 
}));



app.listen(port.start, function(){
	console.log('Run Server - Edinsoncs');
});

