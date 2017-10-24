'use strict'

let sqlst = require('./save');

module.exports = (mysql) => {

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

		/* Step1: Create database in mysql*/
		//continueStep1();

		/* Step2: Create table in database in mysql */
		continueStep2();

	});


	let continueStep1 = () => {

		conexion.query('CREATE DATABASE sistema', (err, result) => {
			if(err) return err;

			console.log('Create Database Success!');

		})

	}

	let continueStep2 = () => {

		var sql = "CREATE TABLE estudiantes (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), email VARCHAR(120), nacionalidad VARCHAR(30), universidad VARCHAR(120))";

		conexion.query(sql, (err, result) => {
			if(err) return err;

			console.log('Table Create');

		});

	}

	

}

