'use strict'

module.exports = (req, res, next) => {

	let db = req.db;
	let usuario = db.get('users');

	usuario.findOneAndUpdate({_id: req.body.id}, {
		$push: {
			'likes': 1
		}
	}, function(err, succ){
		if(err) return err;
		res.json({access: true});
	});


}