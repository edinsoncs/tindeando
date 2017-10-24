'use strict'

module.exports = (req, res, next) => {

	let db = req.db;
	let users = db.get('users');

	users.find({}, (err, data) => {
		if(err) return err;

		res.json(data);

	});

}