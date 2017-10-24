'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario = new Schema({

	name: String,
	provider_id : {type: String, unique: true},
	email: { type: String, lowercase: true},
	photo: String,
	token: String,
	createdAt : {type: Date, default: Date.now},
	provider: String,
	votaciones: Array,
	mensajes: Array,
	birthday: String,
	info: Object,
	likes: Array

});

var User = mongoose.model('User', usuario);