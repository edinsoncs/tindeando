'use strict'

module.exports = (req, res, next) => {

	let db = req.db;
	let mujeres = db.get('users');

	mujeres.find({'info.sexo': 'Mujer'}, (err, data) => {
		if(err) return err;

		res.json(data);
	});

}