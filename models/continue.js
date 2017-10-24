'use strict'

module.exports = (req, res, next) => {

  let db = req.db;
  let users = db.get('users');

  users.findOneAndUpdate({_id: req.user.id}, {
  	$set: {
  		info: {
  			'pais': req.body.pais,
  			'sexo': req.body.sexo,
  			'edad': req.body.edad
  		}
  	}

  }, function(err, success) {
  	if(err) return err;
  	res.json({access: true});
  });



}