'use strict'
const express = require('express');
const fs = require('fs');
const path = require('path');
let router = express.Router();


let savedata = require('../models/save');
let continueprofile = require('../models/continue');
let findOne = require('../models/findone');
let tolike = require('../models/tolike');

let findMujeres = require('../models/mujeres');
let findHombres = require('../models/hombres');

router.get('/', (req, res, next) => {

	res.render('index.html');

});
/*
router.post('/', (req, res, next)=> {

	res.write('<iframe src="https://tindeando.com/#!/" width="100%" height="800px"></iframe>');
	res.end();

}); */

router.get('/profile', (req, res, next) => {

	console.log(req.user);


	if(req.user) {
		res.json(req.user);
	} else {
		res.write('<h1>Chismoso!!!</h1>');
		res.end();
	}

});

router.post('/save', (req, res, next) => {

	savedata(req.body);

});

router.post('/save/profile', (req, res, next) => {


	continueprofile(req, res, next);

});

router.post('/save/like', (req, res, next) => {

	tolike(req, res, next);
});


router.get('/find', (req, res, next) => {

	findOne(req, res, next);

});

router.get('/find/mujeres', (req, res, next) => {

	findMujeres(req, res, next);

});

router.get('/find/hombres', (req, res, next) => {

	findHombres(req, res, next);

});


module.exports = router;