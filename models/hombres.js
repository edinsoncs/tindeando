'use strict'

module.exports = (req, res, next) => {

	let db = req.db;
	let hombres = db.get('users');

	hombres.find({'info.sexo': 'Hombre'}, (err, data) => {
		if(err) return err;

		res.json(data);
	});

}