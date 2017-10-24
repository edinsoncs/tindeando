'use strict'
const mysql = require('mysql');

module.exports = (body) => {
	
	let conexion = mysql.createConnection({

		host: "localhost",
		user: "root",
		password: "1234",
		database: 'sistema',
		socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
	});

	conexion.connect(function(err){
		console.log(err);
		if(err) return err;
		console.log('Conexion en mysql');

		//Inser to database Email, Nacionalidad, Universidad
		continueStep3();
	});

	
	let continueStep3 = () => {
	
		let sql = "INSERT INTO estudiantes (nombre, email, nacionalidad, universidad) VALUES ('"+body.nombre+"', '"+body.email+"', '"+body.pais+"', '"+body.uni+"')";

		conexion.query(sql, (err, result) => {
			if(err) return;
			console.log('Insertado');
		});

	}

	
}