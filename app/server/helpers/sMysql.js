

const mysql = require('mysql');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'D1a2g3g4e5r6!',
	database: 'gta5',
});

// NOTE! all mysql queries here is unsecure! You should wrap all the data with connection.escape(data);
// More https://www.tizag.com/mysqlTutorial/mysql-php-sql-injection.php

connection.getConnection(function (e) {
	if (e) {
		console.log('DATABASE IS NOT WORKING');
		throw e;
	}
	else {
		console.log('DATABASE IS WORKING');
	}
});

module.exports = connection;
